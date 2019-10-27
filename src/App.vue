<template>
  <div id="app" style="margin-top: 0px">
    <Navbar />
    <HelloWorld msg="Текущие дэдлайны"/>
    <ProgressBar />
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import HelloWorld from './components/HelloWorld.vue'
import ProgressBar from "./components/ProgressBar"

export default {
  name: 'app',
  components: {
    HelloWorld,
    ProgressBar,
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
