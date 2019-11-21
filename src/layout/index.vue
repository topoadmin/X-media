<template>
  <div :class="classObj">
    <h1>layout</h1>
  </div>
</template>

<script>
export default {
  computed: {
    classObj() {
      return ['wrapper']
    }
  }
}
</script>
