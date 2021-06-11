# Palindrome.js

![Palindrome.js](assets/img/Palindrome.js-logo-and-title.jpg "Palindrome.js")

>***A palindrome is a word, number, phrase, or other sequence of characters which reads the same backward as forward, such as madam, racecar. There are also numeric palindromes, including date/time stamps using short digits 11/11/11 11:11 and long digits 02/02/2020.***

```Palindrome.js``` is a ```three.js``` based library which provides 3D visualization for system metrics and KPIs. Presented as metrics sets within layers, ```Palindrome.js``` helps to easily identify relations between metrics, indicators, behaviors or trends for your realtime systems or any other data source. Custom algorithms, visual behaviors, styles and color schemes can easily be modified or added.

<p float="left">
<img alt="Palindrome.js" desc="Palindrome.js" title="Palindrome.js" src="assets/img/Palindrome.js-default.png" width="32%" >
<img alt="Datacenter energy efficiency" desc="Datacenter energy efficiency" title="Datacenter energy efficiency" src="assets/img/dc-energy-efficency.png" width="33.5%">
<img alt="Datacenter custom configuration" desc="Datacenter custom configuration" title="Datacenter custom configuration" src="assets/img/dc-custom-configuration.png" width="29.8%">
</p>

_**```Palindrome.js``` is still considered as an experimental / beta prototype, feedbacks are more than welcome !**_

## Motivation

Idea behind this project is to go one step further current monitoring and dashboards solutions, by enabling a scalable and user oriented, 3D monitoring probe for multi-dimensional and heterogeneous sets of data points. Compatible use cases are various, from comparing system metrics with external indicators, to stacking up multi-tenancy informations groups for measuring differences or similarities, ```Palindrome.js``` can both be used as a live UI component for a larger BI dashboard, or as the signal source for a computer-vision based workflow.

## Tech/framework used
Project is created with:

* Three.js
* love <3

## Setup
This project uses ```yarn``` as the dependency manager, ```parcel-bundler``` as the packager, ```three.js``` as its 3D renderer and ```storybook``` for functional testing. 

First install the project dependencies :

```
yarn install
```

## Storybook
Then, run ```storybook``` for an interactive session :

```
yarn storybook
```

*If for some reason the ```knobs``` panel isn't showing up, open your  browser developer console and type ```localStorage.clear()```*

<img alt="Palindrome Storybook" desc="Palindrome Storybook" title="Palindrome Storybook" src="assets/img/palindrome-storybook.png" width="93%">


## Default HTML
Alternatively, you can run the default html session :

```
yarn dev
```

<img alt="Palindrome HTML" desc="Palindrome HTML" title="Palindrome HTML" src="assets/img/palindrome-html.png" width="93%">

## API Reference
Configuration parameter and its options

### Text style : 
It is a configuration option which allows to change the style of the labels
####  configuration options 
- 2D (Default option)
- 3D TextSprite
- 3D WebGlFont

### Display units in labels :
It is a boolean configuration option which allows us to display or not the units of labels

### Text size : 
It is a configuration option which allows to change the size of the labels
#### configuration options 
- Small
- Medium (Default option)
- Large

### Text color :
It is a configuration option which allows to change the color of the labels

### Bold text :
It is a configuration option which allows to put the labels in bold or not

### Italic text :
It is a configuration option which allows to put the labels in italic or not

### Character font : 
It is a configuration option which allows to change the characters of the labels
#### configuration options :
- Arial (Default option)
- Serif
- Sans-serif 

### Mockup data :
It is a configuration option which allows to make dynamic the data

### Palindrome size :
It is a configuration option which allows to resize the palindrome

### Display sides :
It is a configuration option which allows to display or not the sides of palindrome

### Display sides mode :
It is a configuration option which allows to configure the sides mode

### Display layers :
It is a configuration option which allows to display or not the layers of palindrome

### Display layers mode :
This is a configuration option which allows to configure the layers mode

### Display labels :
It is a configuration option which allows to display or not the labels

### Display all labels :
It is a configuration option which allows to display or not all the labels

### Display grid :
It is a configuration option which allows to display or not the grid of the plan

### Grid size :
It is a configuration option which allows to resize the grid .

### Grid divisions :
This is a configuration option which allows to define the divisions of the grid

### Metric Magnifier :
This is a configuration which that allows to resize the metrics

### Layer status control :
This is a configuration which that allows to resize the metrics

### Line opacity :
This is a configuration which that allows to define the line opacity

### Line transparency :
This is a configuration which that allows to define the line transparency

### Layer status control :
This is a configuration which that allows to resize the line width

### All color configurations
All configuration names ending with color allow to modify the colors of a specific event
###### For example :
##### Line Color : it's to change the color of the lines

## How to add your usecase ?

Todo : add a step by step integration documentation

## Connect with remote data source

Todo : add integration details

## Contribute

Simply open a pull request over the repository to describe your changes.

## Credits
- Rnd Team @ Alter Way
- Farooque Mustafa @farooquemustafa
- Damien Gilles @gillesdami
- Jonathan Rivalan (author) @JonRiv

## License
Licensed under the Apache 2.0 license
