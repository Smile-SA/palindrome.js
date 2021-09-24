# Palindrome.js

![Palindrome.js](assets/img/Palindrome.js-logo-and-title.jpg "Palindrome.js")
>***A palindrome is a word, number, phrase, or other sequence of characters which reads the same backward as forward, such as madam, racecar. There are also numeric palindromes, including date/time stamps using short digits 11/11/11 11:11 and long digits 02/02/2020.***

```Palindrome.js``` is a ```three.js``` based library which provides 3D monitoring for system metrics and KPIs. Presented as metrics sets within layers, ```Palindrome.js``` helps to easily identify relations between metrics, indicators, behaviors or trends for your realtime systems or any other data source. Custom algorithms, visual behaviors, styles and color schemes can easily be modified or added.

_**```Palindrome.js``` is still considered as an experimental / beta prototype, be aware API can change at any moment. Feedbacks are more than welcome !**_

<p float="left">
<img alt="Palindrome.js" desc="Palindrome.js" title="Palindrome.js" src="assets/img/Palindrome.js-default.png" width="32%" >
<img alt="Datacenter energy efficiency" desc="Datacenter energy efficiency" title="Datacenter energy efficiency" src="assets/img/dc-energy-efficency.png" width="33.5%">
<img alt="Datacenter custom configuration" desc="Datacenter custom configuration" title="Datacenter custom configuration" src="assets/img/dc-custom-configuration.png" width="29.8%">
</p>

## Motivation

Idea behind this project is to go one step further current monitoring and dashboards solutions, by enabling a scalable and user oriented, 3D monitoring probe for multi-dimensional and heterogeneous sets of data points. Compatible use cases are various, from comparing system metrics with external indicators, to stacking up multi-tenancy informations groups for measuring differences or similarities, ```Palindrome.js``` can both be used as a live UI component for a larger BI dashboard, or as the signal source for a computer-vision based workflow.

## Tech/framework used
Project is created with:

* Three.js
* love <3

## Setup
This project uses ```three.js``` as its 3D renderer, ```yarn``` as the dependency manager, ```storybook``` for functional testing and ```parcel-bundler``` as the stand-alone packager.

First install the project dependencies :

```
yarn install
```

## Storybook
Then, run ```storybook``` for an interactive session :

```
yarn storybook
```

<img alt="Palindrome Storybook" desc="Palindrome Storybook" title="Palindrome Storybook" src="assets/img/palindrome-storybook.png" width="93%">

## Default HTML
Alternatively, you can run the default html session :

```
yarn dev
```

<img alt="Palindrome HTML" desc="Palindrome HTML" title="Palindrome HTML" src="assets/img/palindrome-html.png" width="93%">

## API Reference
Configuration parameters and their options

| Name| Description | type | Default | Options |
| ------ | ------ | ------ |------ |------ |
| labelsRendering | Change the rendering style of labels | String | 3D TextSprite | '2D', '3D TextSprite', '3D TextWebGlFont'  |
| labelsStructure | Select the structure of the label to display | String | "Name","Type","Value","Unit" | "Name","Type","Value","Unit"  |
| labelsCharacter font | Change the characters of the labels | String| Serif | 'Arial', 'Serif', 'Sans-serif' |
| labelsSize | Change the size of the labels| String| Medium |'Small', 'Medium', 'Large' |
| labelsColor | Change the color of the labels | String| #000000 | - |
| labelsBold | Bold or not the labels | Boolean| True | -|
| labelsItalic| Italicize or not the labels | Boolean| False | -|
| displayLabelsUnits | Display or not the units of labels | Boolean| True | -|
| displayLabels | Display or not the labels | Boolean| True | -|
| displayAllLabels | Display or not all labels| Boolean| False | -|
| fitCameraPosition |Fit camera or not to display objets in plan| Boolean| True | -|
| metricMagnifier | Resize the metrics | Number | 10 | -  |
| palindromeSize | Resize the palindrome | Number | 3 | -  |
| displayLayersMode | Configure the layers mode| String | dynamic | -|
| layerMidColor | Change the layer mid color | String | #DFDF0B | - |
| displayLayers | Display or not the layers of palindrome| Boolean| True | -|
| layerStatusControl | Resize the metrics | Boolean| True | -|
| lineOpacity | Change the line opacity | Number | 1 | -  |
| lineWidth | Resize the line widht | Number | 0,5 | -  |
| lineColor | Change the line color | String | #000000 | - |
| displaySides | Configure the sides mode| String | dynamic | -|
| mainAppColor | Change the main app color | String | #00FF06 | - |
| subAppColor | Change the sub app color | String |#9FC5E8 | - |
| displaySides | Display or not the sides of palindrome | Boolean| True | -|
| gridSize | Resize the grid | Number | 100 | -  |
| gridDivisions | Define the divisions of the grid | Number | 100 | -  |
| displayGrid | Display or not the grid of the plan| Boolean| True | -|
| zPlaneInitial | Resize the initial zplane | Number | 0 | -  |
| zPlaneHeight | Resize the height zplane | Number | 40 | -  |
| zPlaneMultilayer | Resize the multilayer zplane |Number | -20 | -  |
| status color low | Change low status color | String |#9FC5E8 | - |
| status color med | Change med status color | String |#00FF00 | - |
| status color high | Change high status color | String |#FF0000 | - |
| statusRangeLow | Resize low status range | Number | 0 | -  |
| statusRangeMed | Resize med status range | Number | 30 | -  |
| statusRangeHigh | Resize high status range | Number | 60 | -  |
| data | The data we analyze | Json | Default json data | -|
| mockupData | Make dynamic the data | Boolean|True | -|

## How to add your usecase ?

Todo : add a step by step integration documentation

## Connect with remote data source

Todo : add integration details
(Default option)

## Contribute

Simply open a pull request over the repository to describe your changes.

## Credits
- Rnd Team @ Alter Way
- Koku Ulrich GBLOKPO @koku-ulrich.gblokpo
- Farooque Mustafa @farooquemustafa
- Damien Gilles @gillesdami
- Jonathan Rivalan (author) @JonRiv

## License
Licensed under the Apache 2.0 license
