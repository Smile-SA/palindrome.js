<template>
  <div id="app">
    <Palindrome :dataStructure="dataStructure" :config="config"/>
  </div>
</template>

<script>
import Palindrome from './components/Palindrome.vue'
import { getData } from './useCaseExample';
export default {
  name: 'App',
  components: {
    Palindrome
  },
  data() {
    const config = {displayGrid: false};
    return {
      dataStructure: getData(),
      config
    }
  }
}
</script>

