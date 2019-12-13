<template>
  <div class="x-main default">
    <x-header />

    <div class="x-wrapper">
      <router-view name="sidebar" />
      <router-view class="main-wrapper" />
    </div>
  </div>
</template>

<script>
import XHeader from './components/Header.vue'

export default {
  name: 'Layout',
  components: { XHeader }
}
</script>
