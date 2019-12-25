<template>
  <div class="x-header">
    <div class="x-navbar-brand">
      <router-link v-waves title="首页" class="x-logo" to="/home" tag="span" @click.native="toHome">
        <img src="img/X.png" alt="">
      </router-link>
    </div>
    <div class="x-navbar">
      <ul class="x-navbar-left">
        <li class="x-navbar-item">
          <el-popover placement="bottom-start" popper-class="x-popover" trigger="hover">
            <div class="x-popover-title">
              <span class="username">
                <small>通知</small>
              </span>
              <router-link to="profile" class="profile">
                <font>查看全部</font>
              </router-link>
            </div>
            <el-badge slot="reference" is-dot>
              <a :class="{ 'is-active': active === 'message' }" class="x-navbar-item-link is-danger">
                <i class="el-icon-chat-dot-round"/>
              </a>
            </el-badge>
          </el-popover>
        </li>
        <li class="x-navbar-item">
          <a :class="{ 'is-active': active === 'manage' }" class="x-navbar-item-link" title="产品中心" @click="handleManage('/media')">
            <svg-icon icon-class="dashboard" />
          </a>
        </li>
        <li class="x-navbar-item">
          <a :class="{ 'is-active': explorerMenu }" class="x-navbar-item-link is-danger" title="快捷菜单" @click.stop="handleExplorerMenu()">
            <i class="el-icon-s-grid"/>
          </a>
        </li>
      </ul>
      <ul class="x-navbar-right">
        <li class="x-navbar-item">
          <div class="x-navbar-item-link">
            <el-popover
              placement="bottom-start"
              popper-class="x-popover user-popover"
              trigger="hover">
              <div class="x-popover-title">
                <span class="username">
                  Azil
                  <small>超级管理员</small>
                </span>
                <router-link to="profile" class="profile">
                  <font>个人资料</font>
                </router-link>
              </div>
              <div class="account-items">
                <a v-waves class="account-item">
                  <div class="media">
                    <div class="icon-wrap">
                      <svg-icon icon-class="setting" />
                    </div>
                    <div class="media-content">
                      <h3>Settings</h3>
                      <small>系统设置</small>
                    </div>
                  </div>
                </a>
                <a v-waves class="account-item" @click="logout()">
                  <div class="media">
                    <div class="icon-wrap">
                      <svg-icon icon-class="logout" />
                    </div>
                    <div class="media-content">
                      <h3>Log out</h3>
                      <small>注销当前账户</small>
                    </div>
                  </div>
                </a>
              </div>
              <div v-waves slot="reference" class="x-user-img">
                <img src="img/azil-orange-ico.png" alt="">
              </div>
            </el-popover>
          </div>
        </li>
      </ul>
    </div>
    <el-drawer
      :modal="false"
      :visible.sync="explorerMenu"
      custom-class="explorer-menu"
      class="explorer-dialog"
      direction="btt"
      size="100%">
      <div class="explorer-container">
        <div class="explorer-header">
          <h1>快捷菜单</h1>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
const nullActives = ['HomeIndex'] // 不显示导航焦点的路由
export default {
  name: 'Header',
  data() {
    return {
      active: 'manage',
      explorerMenu: false
    }
  },
  watch: {
    explorerMenu(nv) {
      if (nv) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  created() {
    if (nullActives.includes(this.$route.name)) {
      this.active = ''
    }
  },
  methods: {
    toHome() {
      this.active = null
      this.explorerMenu = false
    },
    handleManage(path) {
      this.active = 'manage'
      this.explorerMenu = false
      path && this.$router.push(path)
    },
    handleExplorerMenu() { // 展开快捷菜单
      this.explorerMenu = !this.explorerMenu
    },
    logout() {
      this.$message.success('登出成功')
      this.$store.dispatch('user/logout')
      window.setTimeout(() => {
        this.$router.push('/login')
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.user-popover {
  width: 200px;
  .account-items {
    padding: 10px 0;
    max-height: 420px;
    overflow-y: auto;
    hr {
      margin: .4rem 0;
      background-color: #f5f5f5;
      border: none;
      display: block;
      height: 2px;
    }
    .account-item {
      cursor: pointer;
      padding: .5rem .75rem;
      display: block;
      line-height: 1.2;
      &:hover {
        background: #f5f5f5;
      }
      .media {
        align-items: center;
        .icon-wrap {
          height: 35px;
          width: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 1rem;
          .svg-icon {
            width: 18px;
            height: 18px;
            stroke-width: 2px;
            stroke: #757a91;
          }
        }
        h3 {
          color: #393a4f;
          font-size: .8rem;
          line-height: 1.2rem;
          font-weight: 500;
        }
        small {
          color: #757a91;
          line-height: 1.2rem;
          font-size: .75rem;
        }
      }
    }
  }
}
</style>
