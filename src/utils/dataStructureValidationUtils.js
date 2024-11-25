export const remoteSchemaValidator = (data) => {
    if (!data.metrics) {
        throw new Error('Missing required field: metrics');
    }
    if (!data.layers) {
        throw new Error('Missing required field: layers');
    }
    if (!data.dataProviders) {
        throw new Error('Missing required field: dataProviders');
    }
    if (data.options.liveData) {
        for(const metric of data.metrics) {
            if (!metric.remoteDataFetchPace) {
                if(!metric.dataProviderId) {
                    throw new Error('Missing dataProviderId for metric');
                }
                const dataProvider = data.dataProviders.find(dataProvider => dataProvider.id === metric.dataProviderId);
                if (!dataProvider.remoteDataFetchPace) {
                    if (!data.options.remoteDataFetchPace) {
                        throw new Error('At least the metric, data provider, or overall schema options should include remoteDataFetchPace in the case of live data.')
                    }
                }
            }
        }
    }
}
