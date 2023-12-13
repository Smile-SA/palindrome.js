import {defaultControls, defaultValues} from "./controls/defaultControls";
import {createPalindrome} from "./controls/createPalindrome";
import {pyramidOfMaslows} from "../data-examples/oth_pyramid_of_maslows";
import {getWeatherData} from "../src/webCollectors/api.open-meteo.com";
import {localLiveMonitoring as localMonitoring} from "../src/webCollectors/local_live_monitoring";

export default {
    title: 'Use Cases/Palindrome/Other examples',
    argTypes: defaultControls(),
    args: defaultValues(),
};

export const PyramidOfMaslows = createPalindrome.bind({});
PyramidOfMaslows.args = {
    mainStaticColor : '#FFCC00',
    data: pyramidOfMaslows(),
};

export const api_open_meteo_com = createPalindrome.bind({});
api_open_meteo_com.args = {
    isRemoteDataSource: true,
    remoteDataFetchPace: 1000 * 60 * 60, // every hour
    fetchFunction: getWeatherData
};

export const localLiveMonitoring = createPalindrome.bind({});
localLiveMonitoring.args = {
    isRemoteDataSource: true,
    fetchFunction: localMonitoring
};
