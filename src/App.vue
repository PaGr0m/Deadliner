<template>
  <div id="app">
    <Navbar />
    <HelloWorld msg="Текущие дэдлайны"/>
    <ProgressBar />

      <TimeLine></TimeLine>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import HelloWorld from './components/HelloWorld.vue'
import ProgressBar from "./components/ProgressBar"
import TimeLine from  "./components/TimeLine"

export default {
  name: 'app',
  components: {
    TimeLine,
    HelloWorld,
    ProgressBar,
    Navbar,
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
}
</style>
