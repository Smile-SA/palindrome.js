import { InfluxDBFluxClient } from "./clients/InfluxdbFlux";
import { PrometheusClient } from "./clients/Prometheus";

const clients = {};

export const instantiateClient = (dataProvider) => {
    if (clients[dataProvider.id]) {
        return clients[dataProvider.id];
    }

    let client;
    if (dataProvider.type === 'influxdb') {
        client = new InfluxDBFluxClient(dataProvider.url, dataProvider.token, dataProvider.org);
    }
    else if (dataProvider.type === 'prometheus') {
        client = new PrometheusClient(dataProvider.url);
    
    }
    clients[dataProvider.id] = client;
    return client;
}
