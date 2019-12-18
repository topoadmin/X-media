<!--
	* @author		Azil
	* @version 	0.0.1
	* @title    媒体资源列表
-->

<template>
  <div>
    <x-note type="danger">
      <h1>以下是三级路由，分布在【头条，百家号，微博下】输入内容，然后切换左侧导航试试吧</h1>
    </x-note>
    <el-radio-group v-model="activePath" @change="to">
      <el-radio label="/media/list/toutiao" border>头条</el-radio>
      <el-radio label="/media/list/baijiahao" border>百家号</el-radio>
      <el-radio label="/media/list/weibo" border>微博</el-radio>
    </el-radio-group>

    <el-card style="margin-top: 20px;">
      <keep-alive :include="cachedViews">
        <router-view class="x-two-router-view" />
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import XNote from '@/components/XNote'

export default {
  name: 'MediaList',
  components: {
    XNote
  },
  data() {
    return {
      activePath: '/media/list/toutiao',
      cachedViews: []
    }
  },
  watch: {
    $route(nv) {
      this.updateCachedView(nv)
    }
  },
  created() {
    const { meta } = this.$route
    if (meta && meta.activeMenu && !meta.parentNoCache) { // 自行处理添加二级路由的缓存
      this.$store.dispatch('common/addTwoCachedView', {
        name: meta.activeMenu,
        meta: { noCache: meta.parentNoCache }
      })
    }
  },
  activated() {
    this.activePath && this.$router.replace(this.activePath)
  },
  methods: {
    to(value) {
      this.$router.push(value)
    },
    updateCachedView(route) {
      const { meta, path } = route
      // TODO: 由于判断了必须是三级路由，所有某些参数的传递形式可能会发生错误，建议使用 ?v=1 此形式传递参数
      if (meta && !meta.noCache && path.split('').filter(p => p === '/').length === 3) {
        const name = route.name
        const findCv = this.cachedViews.find(item => item === name)
        if (!findCv) {
          this.cachedViews.push(name)
        }
      }
    }
  }
}
</script>
