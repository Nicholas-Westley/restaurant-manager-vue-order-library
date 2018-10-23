<template>
  <div id="app">
      <controller
          :assetsUrl="assetsUrl"
          :restaurantId="restaurantId"/>
  </div>
</template>

<script>
import Controller from './components/Controller';
export default {
    name: 'app',
    props: {
        assetsUrl: String,
        restaurantId: Number,
    },
    components: {
        Controller,
    },
};
</script>

<style>
    #app {
        height: 100%;
    }
</style>
