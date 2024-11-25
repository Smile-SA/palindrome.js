import { defaultControls, defaultValues } from "./controls/defaultControls";
import { createPalindrome } from "./controls/createPalindrome";
import { pyramidOfMaslows } from "../data-examples/oth_pyramid_of_maslows";
import { openMeteo } from "../data-examples/oth_api_open_meteo_com";
import { localLiveMonitoring as localLiveMonitoringData } from "../data-examples/oth_localLiveMonitoring";

export default {
    title: 'Use Cases/Palindrome/Other example',
    argTypes: defaultControls(),
    args: defaultValues(),
};

export const PyramidOfMaslows = createPalindrome.bind({});
PyramidOfMaslows.args = {
    mainStaticColor: '#FFCC00',
    data: pyramidOfMaslows(),
};

export const api_open_meteo_com = createPalindrome.bind({});
api_open_meteo_com.args = {
    isRemoteData: true,
    data: openMeteo()
};
api_open_meteo_com.storyName = 'api.open-meteo.com';

export const localLiveMonitoring = createPalindrome.bind({});
localLiveMonitoring.args = {
    isRemoteData: true,
    data: localLiveMonitoringData()
};
