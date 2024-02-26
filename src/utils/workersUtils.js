import palindromeWebWorker from './palindrome.worker';

/**
 * Makes a pool of workers
 * url attribute is the url of the worker file
 * pool attribute is a list that contains the free workers
 * @param {number} resourcesLevel percentage of the resources needed
 * @param {number} number_of_workers initially zero
 */
export function WorkerPool(resourcesLevel, number_of_workers = 0) {
    this.pool = [];
    this.workers_in_use = [];
    this.resourcesLevel = resourcesLevel;
    this.number_of_workers = number_of_workers;
}

const code = palindromeWebWorker.toString();
const blob = new Blob(['(' + code + ')()']);
/**
 * Gets a worker
 * @returns a free worker
 */
WorkerPool.prototype.getWorker = function () {
    let w;
    if (this.pool.length > 0) {
        w = this.pool.pop();
    } else {
        if (this.number_of_workers < 2 * (this.resourcesLevel / 100) * navigator.hardwareConcurrency) {
            w = new Worker(URL.createObjectURL(blob));
            this.number_of_workers++;
            this.workers_in_use.push(w);
        } else {
            w = null;
        }
    }
    return w;
}

/**
 * Pushes the newly free worker to the list of the free workers
 * @param {*} w 
 */
WorkerPool.prototype.releaseWorker = function (w) {
    if (!this.pool.includes(w)) {
        this.pool.push(w);
    }
}