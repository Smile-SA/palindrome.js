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

    onmessage = function (e) {
        const metrics = e.data.newData[e.data.layer].metrics,
            metricsNumber = Object.values(metrics).length;
        const metricCurrentTotal = Object.values(metrics).map(item => item.current).reduce((a, b) => a + b, 0);
        const metricMaxTotal = Object.values(metrics).map(item => item.max).reduce((a, b) => a + b, 0);
        const layerStatus = ((metricCurrentTotal / metricMaxTotal) * 100);
        let max = Object.values(metrics).map(item => (e.data.psize / item.max) * item.max);
        let med = Object.values(metrics).map(item => (e.data.psize / item.max) * item.med);
        let min = Object.values(metrics).map(item => (e.data.psize / item.max) * item.min);
        let current = Object.values(metrics).map(item => (e.data.psize / item.max) * item.current);

        let metricValue = {};
        metricValue.max = layerPoints(max, e.data.zAxisWorker, e.data.metricMagnifier);
        metricValue.med = layerPoints(med, e.data.zAxisWorker, e.data.metricMagnifier);
        metricValue.min = layerPoints(min, e.data.zAxisWorker, e.data.metricMagnifier);
        metricValue.current = layerPoints(current, e.data.zAxisWorker, e.data.metricMagnifier);

        if (e.data.subject === "computations") {
            postMessage({
                subject: e.data.subject,
                metricCurrentTotal, metricMaxTotal,
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
                previousValueMax = layerPoints(Object.values(e.data.previousMetric).map(item => (e.data.psize / item.max) * item[metricsDivider]), e.data.zAxisWorker + e.data.zPlaneMultilayer, e.data.metricMagnifier);
                previousPlaneLength = Object.values(e.data.previousMetric).length;

                sideDividerOdd = (metricsNumber >= previousPlaneLength) ? previousPlaneLength : metricsNumber;
                sideDividerEven = (metricsNumber >= previousPlaneLength) ? metricsNumber : previousPlaneLength;
                sideSizeOdd = (metricsNumber >= previousPlaneLength) ? metricValue[metricsDivider] : previousValueMax;
                sideSizeEven = (metricsNumber >= previousPlaneLength) ? previousValueMax : metricValue[metricsDivider];
            }
            postMessage({
                subject: e.data.subject,
                metricCurrentTotal,
                metricMaxTotal,
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
                metricCurrentTotal, metricMaxTotal,
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