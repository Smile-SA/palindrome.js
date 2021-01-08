import palindrome from './src/index';

import { debugTwoLayersThreePoints } from './src/data_structures_examples/debug_TwoLayersThreePoints';

    const config = { 
        mockupData: true,
        displayArea: 'palindrome',
    	palindromeSize : 3,
        displaySides : true,
        displayMode: 'dynamic',
        displayLayers : true,
        displayLayersLines : true,
        layerDisplayMode: 'dynamic',
        displayLabels : true,
        displayLabelsAll : true,
        displayGrid: true,
        gridSize: 100,
        gridDivisions: 100,
        metricMagnifier: 10,
        layerStatusControl: true,
        layerMidColor:'#FF2C00',
        mainAppColor:'#FFCC00',
        subAppColor:'#FFFFFF',
        statusRange: {
            low: '0',
            med: '30',
            high: '60'
        },
        statusColor: {
            low: '#9FC5E8',
            med: '#00FF00',
            high: '#FF0000'
        },
        line: {
            lineColor: '#000000',
            lineOpacity: 1,
            lineTranparency: 0.5,
            lineWidth: 3
        },
        zplane: {
            zplaneInitial: 0,
            zplaneHeight: 40,
            zplaneMultilayer: -20
        },
        data: debugTwoLayersThreePoints()
    };

    const container = document.getElementById('palindrome');
    palindrome(container, JSON.parse(JSON.stringify(config)));

