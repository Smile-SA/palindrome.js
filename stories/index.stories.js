import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: 'Pallindrome',
  decorators: [withKnobs]
};

//note : this is buggish as at the current moment palyndrome is displayed in every views
export const Palyndrome = () => '';

//note : example below provides a modifiable title with knobs. if the knobs panel doesn't shows up, run `localstorage.clear()` in the browser console
export const SimpleKnob = () => {
const title = text('Title', 'Pallindrome - type 1');
const content = `${title}`;
return `<h1>${content}</h1>`;
};


//note : below calls the palyndrome and an external configuration file. configuration is not availble through knobs.
import {config} from '../src/configuration';
import {pallindrome} from '../src/index';
setTimeout(function(){
  console.log(config);
  console.log(pallindrome)
},5000)
