/**
 * Makes a pool of workers
 * url attribute is the url of the worker file
 * pool attribute is a list that contains the free workers
 * @param {string} url url of worker file
 * @param {number} resourcesLevel percentage of the resources needed
 * @param {number} number_of_workers initially zero
 */
export function WorkerPool(url, resourcesLevel, number_of_workers = 0) {
    this.url = url;
    this.pool = [];
    this.workers_in_use = [];
    this.resourcesLevel = resourcesLevel;
    this.number_of_workers = number_of_workers;
}

WorkerPool.prototype.getWorker = function () {
    let w;
    if (this.pool.length > 0) {
        w = this.pool.pop();
    } else {
        if (this.number_of_workers < 2 * (this.resourcesLevel / 100) * navigator.hardwareConcurrency) {
            w = new Worker(this.url);
            this.number_of_workers++;
            this.workers_in_use.push(w);
        } else {
            w = null;
        }
    }
    return w;
}
WorkerPool.prototype.releaseWorker = function (w) {
    this.pool.push(w);
}