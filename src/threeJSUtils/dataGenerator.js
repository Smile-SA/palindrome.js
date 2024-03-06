import { getMetricMax, getMetricMin } from "../utils/metricsUtils2D";
/**
 * Generates random data for mockupDataConfig
 * @param {*} model 
 */
export function* dataGenerator(model) {
    const model_ = { ...model };

    while (1) {
        for (let layer of Object.values(model_)) {
            for (let metric of Object.values(layer.metrics)) {
                const { min, max, current, _min, _max, _current } = metric;
                // a random walk with 1% step
                let update = ((Math.random() - .5) * 2 * (max - min) / 100);
                let currentKey = "current";
                if (Object.values(layer.layer)[0]?.layerSize) {
                    update = ((Math.random() - .5) * 2 * (getMetricMax(metric) - getMetricMin(metric))/100);
                    currentKey = "_current";
                    metric[currentKey] = Math.max(Math.min(_current + update, getMetricMax(metric)), getMetricMin(metric));
                } else {
                    metric[currentKey] = Math.max(Math.min(current + update, max), min);
                }
            }
        }
        yield model;
    }
}
