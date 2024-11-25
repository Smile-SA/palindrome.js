import axios from "axios";
import jmespath from 'jmespath';
import { httpWorkerFetch } from "./fetchUtils";


export const reconciliateJson = async (schema, dataProviders, webWorkersHttp, workersPool) => {
    const dataStructure = {};
    for (const layer of schema.layers) {
        if (!dataStructure[layer.name]) {
            dataStructure[layer.name] = {};
        }
        
        dataStructure[layer.name]["layer"] = {};
        dataStructure[layer.name]["layer"][`${layer.name}-layer`] = {
            label: layer.name,
            ...layer.options
        };
        dataStructure[layer.name]["layer"][`${layer.name}-layer`]['label'] = layer.name;
        for (const metricKey of layer.metrics) {
            let metric;
            if (typeof metricKey === "string") {
                metric = schema.metrics.find(metric => metric.id === metricKey);
            }
            else if (typeof metricKey === "object") {
                metric = metricKey;
            }
            const dataProvider = dataProviders.find(dataProvider => dataProvider.id === metric.dataProviderId);
            let {url} = dataProvider;
            if (metric.dataProviderParams) {
                for (const param in metric.dataProviderParams) {
                    url = url.replace(`\${${param}}`, metric.dataProviderParams[param]);
                }
            }
            
            let data;
            if (webWorkersHttp) {
                data = await httpWorkerFetch(url, workersPool);   
            }
            else {
                data = (await axios.get(url)).data;
            }
            
            const getValue = (metricItem) => metricItem.jmesPath ? jmespath.search(data, metricItem.jmesPath) : metricItem;
            const getRange = (metricItem) => typeof metricItem === 'string' ? jmespath.search(data, metricItem) : metricItem;

            let current = getValue(metric.value);
            let label = getValue(metric.label);
            let unit = getValue(metric.unit);

            const metricId = metric.id;
            const min = getRange(metric.ranges[0]);
            const max = getRange(metric.ranges[2]);
            const med = getRange(metric.ranges[1]) ?? (min + max) / 2;

            if (!dataStructure[layer.name]['metrics']) {
                dataStructure[layer.name]['metrics'] = {};
            }
            if (!dataStructure[layer.name]['metrics'][metricId]) {
                dataStructure[layer.name]['metrics'][metricId] = {};
            }
            dataStructure[layer.name]['metrics'][metricId]['label'] = label;
            dataStructure[layer.name]['metrics'][metricId]['min'] = min;
            dataStructure[layer.name]['metrics'][metricId]['med'] = med;
            dataStructure[layer.name]['metrics'][metricId]['max'] = max;
            dataStructure[layer.name]['metrics'][metricId]['current'] = current;
            dataStructure[layer.name]['metrics'][metricId]['unit'] = unit;
        }
    }
    return dataStructure;
}

