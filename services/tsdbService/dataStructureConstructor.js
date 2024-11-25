const { instantiateClient } = require("./tsbdManager");

const constructDataStructure = async (data) => {
    const dataStructure = {};
    for (const layer of data.layers) {
        let isNewLayer = false;
        if (!dataStructure[layer.name]) {
            dataStructure[layer.name] = {};
            isNewLayer = true;
        }
        dataStructure[layer.name]["layer"] = {};
        dataStructure[layer.name]["layer"][`${layer.name}-layer`] = {};
        dataStructure[layer.name]["layer"][`${layer.name}-layer`] = {
            label: layer.name,
            ...layer.options
        };
        for (const metricKey of layer.metrics) {
            let metric;
            if (typeof metricKey === "string") {
                metric = data.metrics.find(metric => metric.id === metricKey);
            }
            else if (typeof metricKey === "object") {
                metric = metricKey;
            }
            const dataProviderId = metric.dataProviderId;
            const dataProviderConfig = data.dataProviders.find(dataProvider => dataProvider.id === dataProviderId);
            const client = instantiateClient(dataProviderConfig);
            if(!client) {
                if (isNewLayer) {
                    delete dataStructure[layer.name];
                }
                continue;
            }
            const value = await client.executeQuery(metric.query);
            if (!dataStructure[layer.name]['metrics']) {
                dataStructure[layer.name]['metrics'] = {};
            }
            if (!dataStructure[layer.name]['metrics'][metric.id]) {
                dataStructure[layer.name]['metrics'][metric.id] = {};
            }
            
            dataStructure[layer.name]['metrics'][metric.id]['label'] = metric.label;
            dataStructure[layer.name]['metrics'][metric.id]['min'] = metric.ranges[0];
            dataStructure[layer.name]['metrics'][metric.id]['med'] = metric.ranges[1];
            dataStructure[layer.name]['metrics'][metric.id]['max'] = metric.ranges[2];
            dataStructure[layer.name]['metrics'][metric.id]['current'] = parseInt(value[value.length - 1]);
            dataStructure[layer.name]['metrics'][metric.id]['unit'] = metric.unit;
        }
    }
    return dataStructure;
}

module.exports = {
    constructDataStructure
}