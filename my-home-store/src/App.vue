<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import url('../src/less/common.less');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
  background-color: @main-color;
}
#app {
  position: relative;
  width: 100%;
  min-width: 1024px;
  max-width: 1980px;
  height: 100%;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
