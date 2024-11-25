
const express = require('express');
const cors = require('cors');
const { constructDataStructure } = require('./dataStructureConstructor');
const { InfluxDBFluxClient } = require('./clients/InfluxdbFlux');
const { PrometheusClient } = require('./clients/Prometheus');
const app = express();
const port = 9009;

const corsOptions = {
    origin: '*',
  };

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Handshake success!');
});

app.post('/query', async (req, res) => {
    const data = req.body;
    const dataStructure = await constructDataStructure(data);
    res.send(dataStructure);
});


app.post('/influxdb/singleQuery', async (req, res) => {
  const {query, url, token, org} = req.body;
  const influxDBClient = new InfluxDBFluxClient(url, token, org);
  const result = await influxDBClient.executeQuery(query);
  res.send(result);
});

app.post('/prometheus/singleQuery', async (req, res) => {
  const {query, url} = req.body;
  const prometheusClient = new PrometheusClient(url);
  const result = await prometheusClient.executeQuery(query);
  res.send(result);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});