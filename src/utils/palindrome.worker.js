export default () => {
    function polarTo3DPoint(angle, radius, zPlaneValue) {
        return [radius * Math.cos(angle), radius * Math.sin(angle), zPlaneValue];
    }

    function layerPoints(metricValue, zPlaneValue, metricMagnifier) {
        const planepoints = [];
        for (let i = 0; i < metricValue.length; i++) {
            const points = polarTo3DPoint(i * Math.PI * 2 / metricValue.length, metricValue[i] * metricMagnifier, zPlaneValue);
            planepoints.push(points);
        }
        return planepoints;
    }

    const cleanMetric = (metric, isMetricChanged) => {
        metric = JSON.parse(JSON.stringify(metric));
        for (const key in metric) {
            if (metric.isPositiveShifted) {
                if (key.startsWith('original')) {
                    delete metric[key];
                }
                if (key === 'maxWithoutScale') {
                    delete metric.max;
                }
            }
            if (isMetricChanged) {
                if (!key.startsWith('_')) {
                    delete metric[key];
                }
            } else {
                if (key.startsWith('_')) {
                    delete metric[key];
                }
            }
        }
        return metric;
    }

    const getMetricMax = (metric, isMetricChanged = false) => {
        let max = Number.NEGATIVE_INFINITY;
        const filteredObjects = Object.values(cleanMetric(metric, isMetricChanged)).filter(it => typeof it === 'number');
        for (var i = 0; i < filteredObjects.length; i++) {
            max = Math.max(filteredObjects[i], max);
        }
        return max;
    };
    const getMetricMin = (metric, isMetricChanged = false) => {
        let min = Number.POSITIVE_INFINITY;
        const filteredObjects = Object.values(cleanMetric(metric, isMetricChanged)).filter(it => typeof it === 'number');
        for (var i = 0; i < filteredObjects.length; i++) {
            min = Math.min(filteredObjects[i], min);
        }
        return min;
    };
    const getMetricMed = (metric, isMetricChanged = false) => {
        if (metric.med) {
            return metric.med;
        }
        const sum = Object.values(cleanMetric(metric, isMetricChanged)).filter(it => typeof it === 'number').reduce((acc, cur) => acc + cur);
        const average = sum / Object.values(cleanMetric(metric, isMetricChanged)).length;
        return average;
    }

    const getLayerStatus = (metrics) => {
        let status = [];
        for (const metric of Object.values(metrics)) {
            let current, min, max;

            if (metric.isPositiveShifted) {
                max = metric.maxWithoutScale ?? metric.originalMax;
                current = metric.originalCurrent;
                min = metric.originalMin;
            }
            else if (metric?.isLayerBehaviored && !metric?.isLayerResized) {
                max = getMetricMax(metric);
                current = metric.current
                min = getMetricMin(metric);
            }
            else {
                max = metric?.isLayerBehaviored && metric?.isLayerResized ? getMetricMax(metric, true) : getMetricMax(metric);
                current = metric?.isLayerBehaviored && metric?.isLayerResized ? metric._current : metric.current;
                min = metric?.isLayerBehaviored && metric?.isLayerResized ? getMetricMin(metric, true) : getMetricMin(metric);
            }

            if (!max) {
                max = getMetricMax(metric);
            }

            let value = (current - min) / (max - min);
            value = metric.metricDirection === 'ascending' ? 1 - value : value;
            status.push(value);
        }

        const sum = status.reduce((acc, cur) => acc + cur);
        return 100 * sum / status.length;
    }

    onmessage = async function (e) {
        if (e.data.subject === 'httpRequests') {
            const fun = eval("const f = function(){ return " + e.data.fn + ";}; f();");
            const newData = await fun();
            postMessage({ subject: 'httpRequests', newData });
        }
        else {
            const metrics = e.data.newData[e.data.layer].metrics,
                metricsNumber = Object.values(metrics).length;

            let layerStatus = getLayerStatus(metrics);
            let max = Object.values(metrics).map(item => (e.data.psize / getMetricMax(item)) * getMetricMax(item));
            let med = Object.values(metrics).map(item => (e.data.psize / getMetricMax(item)) * getMetricMed(item));
            let min = Object.values(metrics).map(item => (e.data.psize / getMetricMax(item)) * getMetricMin(item));
            let current = Object.values(metrics).map(item => (e.data.psize / getMetricMax(item)) * item.current);

            let metricValue = {};
            metricValue.max = layerPoints(max, e.data.zAxisWorker, e.data.metricMagnifier);
            metricValue.med = layerPoints(med, e.data.zAxisWorker, e.data.metricMagnifier);
            metricValue.min = layerPoints(min, e.data.zAxisWorker, e.data.metricMagnifier);
            metricValue.current = layerPoints(current, e.data.zAxisWorker, e.data.metricMagnifier);

            if (e.data.subject === "computations") {
                postMessage({
                    subject: e.data.subject,
                    layerStatus,
                    metricValue,
                    metricsNumber,
                    layer: e.data.layer,
                    metrics,
                    id: e.data.id,
                    zAxisWorker: e.data.zAxisWorker,
                    layerIndex: e.data.layerIndex,
                    metricIndex: e.data.metricIndex,
                });

            } else if (e.data.subject === 'sides') {
                let metricsDivider;
                if (e.data.displayMode === "dynamic") {
                    metricsDivider = "current";
                } else if (e.data.displayMode === "static") {
                    metricsDivider = "max";
                }
                const metricsPositions = [metricValue.max, metricValue.med, metricValue.min];
                let previousValueMax = null;
                let previousPlaneLength = null;
                let sideDividerOdd = null;
                let sideDividerEven = null;
                let sideSizeOdd = null;
                let sideSizeEven = null;
                if (e.data.previousMetric != null) {
                    previousValueMax = layerPoints(Object.values(e.data.previousMetric).map(item => (e.data.psize / getMetricMax(item)) * item[metricsDivider]), e.data.zAxisWorker + e.data.zPlaneMultilayer, e.data.metricMagnifier);
                    previousPlaneLength = Object.values(e.data.previousMetric).length;

                    sideDividerOdd = (metricsNumber >= previousPlaneLength) ? previousPlaneLength : metricsNumber;
                    sideDividerEven = (metricsNumber >= previousPlaneLength) ? metricsNumber : previousPlaneLength;
                    sideSizeOdd = (metricsNumber >= previousPlaneLength) ? metricValue[metricsDivider] : previousValueMax;
                    sideSizeEven = (metricsNumber >= previousPlaneLength) ? previousValueMax : metricValue[metricsDivider];
                }
                postMessage({
                    subject: e.data.subject,
                    layerStatus,
                    metricValue,
                    metricsNumber,
                    layer: e.data.layer,
                    metrics,
                    zAxis: e.data.zAxis,
                    metricsDivider,
                    metricsPositions,
                    sideDividerOdd,
                    sideDividerEven,
                    sideSizeOdd,
                    sideSizeEven
                });

            } else if (e.data.subject === 'metrics') {
                let metricsDivider;
                if (e.data.displayMode === "dynamic") {
                    metricsDivider = "current";
                } else if (e.data.displayMode === "static") {
                    metricsDivider = "max";
                }

                postMessage({
                    subject: e.data.subject,
                    layerStatus,
                    metricValue,
                    metricsNumber,
                    layer: e.data.layer,
                    metrics,
                    zAxisWorker: e.data.zAxisWorker,
                    metricsDivider,
                });
            }
        }
    }
}