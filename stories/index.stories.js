import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: 'Pallindrome',
  decorators: [withKnobs]
};

export const Radar = () => '';
//export const Simple = () => {
//  const title = text('Title', 'Pallindrome - type 1');
//  const content = `${title}`;
//  return `<h1>${content}</h1>`;
//};

import {testScript} from '../src/index.js';
