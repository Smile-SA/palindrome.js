import { addons } from '@storybook/addons';
import palindromeTheme from './storybookPalindromeTheme';

addons.setConfig({
  panelPosition: 'right',
  theme: palindromeTheme,
});
