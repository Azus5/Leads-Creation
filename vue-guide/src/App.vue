<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
  overflow-y: auto;
}

#app {
  font: 400 14px Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
