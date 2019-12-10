<template>
  <div class="x-wrapper default">
    <x-header />

    <div class="x-view-wrapper">
      <router-view />
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
