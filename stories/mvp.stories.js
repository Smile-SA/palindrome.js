import { hybridMultiplePalindromes } from "../data-examples/mvp_hybridMultiplePalindromes";
import { benchmarkRemoteData } from "../data-examples/mvp_benchmarkGridRemoteData";
import { staticMultiplePlaindromes } from "../data-examples/mvp_staticMultiplePalindromes";
import { createMultipleViewPorts } from "./controls/createMultipleViewPorts";
import { defaultControls, defaultValues } from "./controls/defaultControls";

export default {
    title: 'Use Cases/Palindrome/Multiviewport example',
    argTypes: defaultControls(),
    args: defaultValues()
};

export const hybridMultiviewport = createMultipleViewPorts.bind({});
hybridMultiviewport.args = {
    data: hybridMultiplePalindromes(),
};

export const staticMultiviewport = createMultipleViewPorts.bind({});
staticMultiviewport.args = {
    data: staticMultiplePlaindromes(),
};

export const benchmarkMultiviewport = createMultipleViewPorts.bind({});
benchmarkMultiviewport.args = {
    data: benchmarkRemoteData(),
};