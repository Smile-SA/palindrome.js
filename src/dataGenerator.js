/**
 * Generates random data used in "mockupData" option
 * @param {*} model 
 */
export function* dataGenerator(model) {
    const model_ = { ...model };

    while (1) {
        for (let layer of Object.values(model_)) {
            for (let metric of Object.values(layer.metrics)) {
                const { min, max, current } = metric;
                // a random walk with 1% step
                const update = (Math.random() - .5) * 2 * (max - min) / 100;
                const mockUp = metric.current = Math.max(Math.min(current + update, max), min);
            }
        }
        yield model;
    }
}