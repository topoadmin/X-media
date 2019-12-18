<!--
	* @author		Azil
	* @version 	0.0.1
	* @title    我的稿件列表
-->

<template>
  <div>
    <x-note type="info">
      <h3>本页三级路由开启了缓存，但是二级路由关闭了缓存，切换左侧导航，你的录入数据会消失</h3>
    </x-note>
    <el-radio-group v-model="activePath" @change="to">
      <el-radio label="/order/list/toutiao" border>头条</el-radio>
      <el-radio label="/order/list/baijiahao" border>百家号</el-radio>
      <el-radio label="/order/list/weibo" border>微博</el-radio>
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
  name: 'OrderList',
  components: {
    XNote
  },
  data() {
    return {
      activePath: '/order/list/toutiao',
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
    if (meta && meta.activeMenu && !meta.parentNoCache) { // 自行处理添加二级路由的缓存
      this.$store.dispatch('common/addTwoCachedView', {
        name: meta.activeMenu,
        meta: { noCache: meta.parentNoCache }
      })
    }
    this.updateCachedView()
  },
  activated() {
    this.activePath && this.$router.replace(this.activePath)
    // this.updateCachedView()
  },
  methods: {
    to(value) {
      this.$router.push(value)
    },
    updateCachedView() {
      const { name, meta, path } = this.$route
      // TODO: 由于判断了必须是三级路由，所有某些参数的传递形式可能会发生错误，建议使用 ?v=1 此形式传递参数
      if (meta && !meta.noCache && path.split('').filter(p => p === '/').length === 3) {
        const findCv = this.cachedViews.find(item => item === name)
        if (!findCv) {
          this.cachedViews.push(name)
        }
      }
    }
  }
}
</script>
