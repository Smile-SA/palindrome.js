import { dcCustomConfiguration } from "../../data-examples/dc_CustomConfiguration";
import { debugTwoLayersThreePoints } from "../../data-examples/debug_TwoLayersThreePoints";
import { dcBasicConfiguration } from "../../data-examples/dc_BasicConfiguration";
import { dcBasicConfigurationThreeLayers } from "../../data-examples/dc_BasicConfigurationThreeLayers";
import { dcEnergeticEfficiency } from "../../data-examples/dc_EnergeticEfficiency";
import { dcFullMap } from "../../data-examples/dc_FullMap";
import { benchLoadTestData } from "../../data-examples/oth_LoadTest";
import { debugTwoLayersFourPoints } from "../../data-examples/debug_TwoLayersFourPoints";
import { logicBoolean } from "../../data-examples/logic_Boolean";
import { logicFiveThreeTwo } from "../../data-examples/logic_FiveThreeTwo";
import { logicFourValued } from "../../data-examples/logic_FourValued";
import { logicTernary } from "../../data-examples/logic_Ternary";
import { pyramidOfMaslows } from "../../data-examples/oth_pyramid_of_maslows";
import { remoteSchema } from "../../data-examples/remote_data";
import { heavyRemoteSchema } from "../../data-examples/heavy_remote_data";
import { remoteSchemaValidator } from "../../src/utils/dataStructureValidationUtils";
import { hybridMultiplePalindromes } from "../../data-examples/mvp_hybridMultiplePalindromes";
import { openMeteo } from "../../data-examples/oth_api_open_meteo_com";
import { localLiveMonitoring as localLiveMonitoringData } from "../../data-examples/oth_localLiveMonitoring";
import { staticMultiplePlaindromes } from "../../data-examples/mvp_staticMultiplePalindromes";
import { benchGenerator } from "../../data-examples/mvpBenchGenerator";

// defining categories
export let categories = [
    "Global configuration",
    "Display Options"
];

/*
Defining dynamic options (functions inside options)
{
    optgourp1: [option1,...,optionN],
    .
    .
    .
    optgourpN: [option1,...,optionN],
}
 */
export let palindromes = {
    dataCenterExamples: [
        { name: "dcBasicConfiguration", data: dcBasicConfiguration },
        {
            name: "dcCustomConfiguration", data: dcCustomConfiguration, customConfig: {
                layerMidColor: '#FF2C00',
                staticColor: '#b700ff',
                subAppColor: '#FFFFFF',
                statusColorLow: '#e8e49f',
                statusColorMed: '#8400ff',
                statusColorHigh: '#FF0000',
                statusColorVeryHigh: '#FF0000',
                sphereColorLow: '#9b317d',
                sphereColorMed: '#f3c60a',
                sphereColorHigh: '#ffFF0000',

            }
        },
        { name: "Basic Configuration Three Layers", data: dcBasicConfigurationThreeLayers },
        { name: "dcEnergeticEfficiency", data: dcEnergeticEfficiency },
        { name: "dcFullMap", data: dcFullMap },
        { name: "debugTwoLayersThreePoints", data: debugTwoLayersThreePoints },
        { name: "debugTwoLayersFourPoints", data: debugTwoLayersFourPoints },
    ],
    multiValuesLogicExamples: [
        { name: "logicBoolean", data: logicBoolean },
        { name: "logicFiveThreeTwo", data: logicFiveThreeTwo },
        { name: "logicFourValued", data: logicFourValued },
        { name: "logicTernary", data: logicTernary },
    ],
    remoteDataExamples: [
        { name: "api.open-meteo.com", isRemoteData: true, data: openMeteo()},
    ],
    multiviewportExamples: [
        { name: "staticMultiplePalindromes", isMultipleViewPorts: true, data: staticMultiplePlaindromes() }
    ],
    otherExamples: [
        { name: "benchLoadTest", data: benchLoadTestData },
        { name: "pyramidOfMaslows", data: pyramidOfMaslows },
    ]
};

if (process.env.CI_BENCHMARK === "multi-viewports") {
    for(let i = 1; i <= 15; i++) {
        palindromes.remoteDataExamples.push(
            { name: `benchmarkRemoteData${i}`, isMultipleViewPorts: true, data: benchGenerator(i) }
        );
    }
}

if (process.env.PLATFORM !== "GH_PAGES") {
    palindromes.otherExamples.push({ name: "localLiveMonitoring", isRemoteData: true, data: localLiveMonitoringData() })
    palindromes.multiviewportExamples.push( { name: "hybridMultiplePalindromes", isMultipleViewPorts: true, data: hybridMultiplePalindromes() });
    palindromes.remoteDataExamples.push(
        { name: "remoteData", isRemoteData: true, data: remoteSchema(), validator: remoteSchemaValidator },
        { name: "heavyRemoteData", isRemoteData: true, data: heavyRemoteSchema() },
    );
}

//Defining sidebar controls
export let controls = {
    data: {
        name: "Select example",
        control: "select",
        description: "Choose a palindrome to display",
        options: palindromes,
        type: "dynamic",
        category: categories[0],
    },
    mockupData: {
        name: "Mockup data",
        control: "boolean",
        description: "Make the data dynamic",
        if: { control: "liveData", value: false },
        category: categories[0]
    },
    /*    displayArea: {
            name: "displayArea",
            description: "Declare the rendering DIV",
            control: "text",
            category: categories[0],
        },*/
    liveData: {
        name: "Live data",
        control: "boolean",
        description: "Enable or disable live use case",
        if: { control: "mockupData", value: false },
        category: categories[0],
    },
    webWorkersRendering: {
        name: "Activate web workers",
        control: "boolean",
        description: "Enable or disable web workers",
        category: categories[0],
    },
    displayLayers: {
        name: "displayLayers",
        description: "Display or not the layers of palindrome",
        control: "boolean",
        category: categories[1],
    },
    colorsBehavior: {
        name: "colorsBehavior",
        description: "Change the rendering color behavior of layers",
        control: "select",
        type: "static",
        options: ["static", "dynamic", 'ranges'],
        category: categories[1],
    },
    spheresColorsBehavior: {
        name: "spheresColorsBehavior",
        control: "select",
        description: "Make sphere dynamic or static",
        type: "static",
        options: ['static', 'dynamic', 'ranges'],
        category: categories[1],
    },
    bicolorDisplay: {
        name: "bicolorDisplay",
        control: "boolean",
        description: "Switch between a gradient made of 3 colors or 2 colors",
        type: "static",
        category: categories[1]
    },
    displayLayersLines: {
        name: "displayLayersLines",
        description: "display or not layer lines",
        control: "boolean",
        category: categories[1],
    },
    displayMode: {
        name: "sidesDisplayMode",
        control: "select",
        options: ['static', 'dynamic'],
        type: "static",
        description: "Configure the sides mode",
        category: categories[1],
    },
    layerDisplayMode: {
        name: "layerDisplayMode",
        control: "select",
        options: ['static', 'dynamic'],
        type: "static",
        description: "Configure the sides mode",
        category: categories[1],
    },
    displaySides: {
        name: "displaySides",
        control: "boolean",
        description: "Display or not the sides of palindrome",
        category: categories[1],
    },
    displayMetricsLabelsUnit: {
        name: "displayMetricsLabelsUnit",
        description: "Display or not the units of metrics labels",
        control: "boolean",
        category: categories[1],
    },
    displayMetricsLabels: {
        name: "displayMetricsLabels",
        description: "Display or not the metrics labels",
        control: "boolean",
        category: categories[1],
    },
    displayGrid: {
        name: "displayGrid",
        control: "boolean",
        description: "Display or not the grid of the plan",
        category: categories[1],
    },
    displayAllMetricsLabels: {
        name: "displayAllMetricsLabels",

        description: "Display or not all metrics labels",
        control: "boolean",
        category: categories[1],
    },
    displayLayersLabels: {
        name: 'displayLayersLabels',

        description: 'Display or not the layers label',
        control: 'boolean',
        category: categories[1],
    },
    displayFrames: {
        name: 'displayFrames',

        description: 'Display or not the frames',
        control: 'boolean',
        category: categories[1],
    },
    displayMetricSpheres: {
        name: "displayMetricSpheres",

        description: "Display or not all metrics spheres",
        control: "boolean",
        category: categories[1],
    },
    displayFramesLine: {
        name: 'displayFramesLine',

        description: 'Display or not the frames Line',
        control: 'boolean',
        category: categories[1],
    },
    displayFramesBackground: {
        name: 'displayFramesBackground',
        description: 'Display or not the frames background',
        control: 'boolean',
        category: categories[1],
    },
    displayLabelLine: {
        name: 'displayLabelLine',
        description: 'Display or not the frames arrows',
        control: 'boolean',
        category: categories[1],
    },
    benchmark: {
        name: 'benchmark',
        description: 'Activate or deactivate benchmark',
        control: 'radio',
        options: ['Active', 'Inactive'],
        hidden: true,
        category: categories[0],
    },
}

/**
 * Extracts controls by type
 * @param {string} type
 * @returns {*[]}
 */
let extractFieldsByType = (type) => {
    let toggleFields = [];
    for (let control of Object.keys(controls)) {
        if (controls[control].control === type) {
            toggleFields.push(control);
        }
    }
    return toggleFields;
}
export let toggleFields = extractFieldsByType("boolean");
export let selectFields = extractFieldsByType("select");
export let radioFields = extractFieldsByType("radio");