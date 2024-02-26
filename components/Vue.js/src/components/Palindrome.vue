<template>
  <div ref="canvas"></div>
</template>

<script>
import palindromeLib, { devPalindrome } from '../palindrome/palindrome.js';

export default {
  mounted() {
    const container = document.createElement('div');
    container.setAttribute('id', 'palindrome');
    
    const config = devPalindrome();
    this.applyConfiguration(this.config, config);
    config.data = this.dataStructure || {};

    palindromeLib(container, { ...config });
    this.$refs.canvas.appendChild(container);
  },
  methods: {
    applyConfiguration(userConfig, currentConfig) {
      for (const [key, value] of Object.entries(userConfig)) {
        currentConfig[key] = value;
      }
      return currentConfig;
    }
  },
  name: 'Palindrome-component',
  props: ['dataStructure', 'config']
}
</script>

