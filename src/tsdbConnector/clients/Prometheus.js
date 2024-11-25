import axios from "axios";

export class PrometheusClient {
	constructor(url){
        this.url = url + '/api/v1/query';
    }
    async executeQuery(query) {
        const queryData = (await axios.get(this.url, {
            params: { query: query }
        })).data;
        return queryData.data.result[0].value;
    }
}

