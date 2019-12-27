<template>
  <div class="x-main default">
    <x-header />

    <div class="x-wrapper">
      <router-view ref="sidebar" name="sidebar" />
      <div
        v-loading="!!mainLoading"
        :element-loading-text="mainLoading"
        :class="{ 'right': sidebarShow }"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="x-main-wrapper"
      >
        <keep-alive :include="cachedViews">
          <router-view class="x-two-router-view" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import XHeader from './components/Header.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: { XHeader },
  data() {
    return {
      sidebarShow: false
    }
  },
  computed: {
    ...mapGetters(['mainLoading']),
    cachedViews() {
      return this.$store.getters.twoCachedViews
    }
  },
  watch: {
    $route(nv) {
      this.updateCachedView(nv)
      this.$nextTick(() => {
        this.sidebarShow = !!this.$refs.sidebar
      })
    }
  },
  created() {
    this.updateCachedView(this.$route)
    this.$nextTick(() => {
      this.sidebarShow = !!this.$refs.sidebar
    })
  },
  methods: {
    updateCachedView(route) {
      const { meta, path } = route
      // TODO: 由于判断了必须是二级路由，所有某些参数的传递形式可能会发生错误，建议使用 ?v=1 此形式传递参数
      if (meta && !meta.noCache && path.split('').filter(p => p === '/').length === 2) {
        const name = route.name
        const findCv = this.cachedViews.find(item => item === name)
        if (!findCv) {
          this.$store.dispatch('common/addTwoCachedView', route)
        }
      }
    }
  }
}
</script>
