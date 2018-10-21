<template>
  <div id="app">
      <controller :assetsUrl="assetsUrl"/>
  </div>
</template>

<script>
import Controller from './components/Controller';
export default {
    name: 'app',
    props: ['assetsUrl'],
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
