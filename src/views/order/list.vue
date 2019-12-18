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
import threeCachedViewMixin from '@/mixin/threeCachedView'

export default {
  name: 'OrderList',
  components: {
    XNote
  },
  mixins: [threeCachedViewMixin],
  data() {
    return {
      activePath: '/order/list/toutiao'
    }
  },
  activated() {
    this.activePath && this.$router.replace(this.activePath)
  },
  methods: {
    to(value) {
      this.$router.push(value)
    }
  }
}
</script>
