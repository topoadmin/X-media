<!--
	* @author		Azil
	* @version 	0.0.1
	* @title    媒体资源列表
-->

<template>
  <div>
    <x-note>
      <h3>以下是三级路由，分别在【头条，百家号，微博下】输入内容，然后切换左侧导航试试吧</h3>
    </x-note>
    <x-note type="warning">
      <h3>当前页的【百家号】已经关闭了三级缓存，切换左侧导航，你录入的数据会消失</h3>
    </x-note>
    <x-note type="success">
      <p>
        <el-link>
          <router-link to="/order">我的稿件</router-link>
        </el-link>
        关闭了二级缓存，开启了三级缓存
      </p>
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
import threeCachedViewMixin from '@/mixin/threeCachedView'

export default {
  name: 'MediaList',
  components: {
    XNote
  },
  mixins: [threeCachedViewMixin],
  data() {
    return {
      activePath: this.$route.path || '/media/list/toutiao'
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
