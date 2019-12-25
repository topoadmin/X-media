<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import website from '@/const/website.js'

export default {
  name: 'App',
  created() {
    document.title = website.title
  }
}
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
