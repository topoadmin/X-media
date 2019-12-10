<template>
  <div class="x-header">
    <div class="x-navbar-brand">
      <a v-waves class="x-logo" href="/">
        <img src="img/X.png" alt="">
      </a>
    </div>
    <div class="x-navbar">
      <ul class="x-navbar-left">
        <li class="x-navbar-item">
          <el-popover
            placement="bottom-start"
            popper-class="x-popover"
            trigger="click">
            <h1>测试</h1>
            <el-badge slot="reference" is-dot>
              <a v-waves :class="getClassName('message')" @click="handleNavbarItem('message')">
                <i class="el-icon-chat-square"/>
              </a>
            </el-badge>
          </el-popover>
        </li>
        <li class="x-navbar-item">
          <a v-waves :class="getClassName('explorer-menu', 'is-danger')" @click.stop="handleExplorerMenu()">
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
              trigger="click">
              <div>
                <div class="title">
                  <span class="username">
                    Azil
                    <small>超级管理员</small>
                  </span>
                  <router-link to="profile" class="profile">
                    <font>个人资料</font>
                  </router-link>
                </div>
                <div class="account-items">
                  <a class="account-item">
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
                  <a class="account-item">
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
              </div>
              <el-badge slot="reference" type="success" is-dot>
                <div v-waves class="user-img">
                  <img src="/img/azil-orange-ico.png" alt="">
                </div>
              </el-badge>
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
        <icon-check :size="5" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import IconCheck from '@/components/icon-check'

export default {
  name: 'HeaderLayout',
  components: { IconCheck },
  data() {
    return {
      active: 'message',
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
  methods: {
    handleNavbarItem(type) {
      this.active = type
      this.explorerMenu = false
    },
    handleExplorerMenu() { // 展开快捷菜单
      this.active = 'explorer-menu'
      this.explorerMenu = !this.explorerMenu
    },
    getClassName(active, color) { // 获取 class
      let className = 'x-navbar-item-link ' + color
      if (active === this.active) {
        className += ' is-active'
      }
      return className
    }
  }
}
</script>

<style lang="scss">
.user-popover {
  width: 300px;
  padding: 0;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem .75rem;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    .username {
      font-size: 1rem;
      font-weight: 600;
      small {
        padding: 0 .5rem;
        color: #757a91;
        font-size: .75rem;
        line-height: 1rem;
      }
    }
    .profile {
      font-size: .75rem;
      color: #0058e6;
      vertical-align: inherit;
    }
  }
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
