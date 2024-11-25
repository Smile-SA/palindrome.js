import { heavyRemoteSchema } from "../data-examples/heavy_remote_data";
import { remoteSchema } from "../data-examples/remote_data";
import { remoteSchemaValidator } from "../src/utils/dataStructureValidationUtils";
import { createPalindrome } from "./controls/createPalindrome";
import { defaultControls, defaultValues } from "./controls/defaultControls";

export default {
    title: 'Use Cases/Palindrome/Remote data example',
    argTypes: defaultControls(),
    args: defaultValues()
};

export const remoteData = createPalindrome.bind({});
remoteData.args = {
    isRemoteData: true,
    data: remoteSchema(),
    validator: remoteSchemaValidator
};

export const heavyRemoteData = createPalindrome.bind({});
heavyRemoteData.args = {
    isRemoteData: true,
    data: heavyRemoteSchema(),
};
