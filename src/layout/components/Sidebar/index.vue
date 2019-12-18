<template>
  <div class="x-left-sidebar is-active">
    <div class="user-block">
      <a class="close-videos-sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </a>
      <div class="avatar-wrap">
        <img src="img/azil-orange-ico.png" alt="">
      </div>
      <h4>Azil</h4>
      <p>超级管理员</p>
      <div class="user-stats">
        <div class="stat-block">
          <span> 余额（$） </span>
          <span>49.00</span>
        </div>
        <div class="stat-block">
          <span>消费（$）</span>
          <span>199.00</span>
        </div>
      </div>
    </div>
    <div class="user-menu">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <template v-for="item in leftMenu">
          <my-block v-if="!item.hidden" :key="item.name" :menu-data="item" />
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyBlock from './block'

export default {
  name: 'Sidebar',
  components: { MyBlock },
  computed: {
    ...mapGetters(['leftMenu'])
  }
}
</script>
