/**
 * @author  				Azil
 * @version	  		  1.0.0
 * @desc            实现三级路由的缓存控制
 */

export default {
  data() {
    return {
      cachedViews: []
    }
  },
  watch: {
    $route() {
      this.updateCachedView()
    }
  },
  created() {
    const { meta } = this.$route
    // 手动添加二级路由的缓存
    if (meta && meta.activeMenu && !meta.parentNoCache) {
      this.$store.dispatch('common/addTwoCachedView', {
        name: meta.activeMenu,
        meta: { noCache: meta.parentNoCache }
      })
    }
    this.updateCachedView()
  },
  methods: {
    updateCachedView() {
      const { name, meta, path } = this.$route
      // TODO: 判断了必须是三级路由，所以某些参数的传递形式可能会发生错误，建议使用 ?v=1 此形式传递参数
      if (meta && !meta.noCache && path.split('').filter(p => p === '/').length === 3) {
        const findCv = this.cachedViews.find(item => item === name)
        if (!findCv) {
          this.cachedViews.push(name)
        }
      }
    }
  }
}
