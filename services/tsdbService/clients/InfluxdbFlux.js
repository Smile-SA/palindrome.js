const { InfluxDB } = require('@influxdata/influxdb-client');

class InfluxDBFluxClient {
    constructor(url, token, org) {
        this.queryApi = new InfluxDB({ url, token }).getQueryApi(org)
    }
    async executeQuery(fluxQuery) {
        const result = [];
        for await (const { values, tableMeta } of this.queryApi.iterateRows(fluxQuery)) {
            const o = tableMeta.toObject(values)
            result.push(o._value);
        }
        return result;
    }
}

module.exports = {
    InfluxDBFluxClient
}
