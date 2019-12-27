<template>
  <div class="menu-item">
    <ul>
      <li class="title">
        <svg-icon v-if="menuData.meta.icon" :icon-class="menuData.meta.icon" />
        <span>{{ menuData.meta.title }}</span>
      </li>
      <template v-for="item in menuData.children">
        <li :key="item.name" :class="isActive(item.name)" class="item" @click="to(item.path)">
          {{ item.meta.title }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarBlock',
  props: {
    menuData: {
      type: Object,
      default: null
    }
  },
  computed: {
    active() {
      const route = this.$route
      const { meta, name } = route
      // 如果设置路径，侧栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return name
    }
  },
  methods: {
    isActive(name) {
      if (name === this.active) {
        return 'is-active'
      }
    },
    to(path) {
      this.$router.push(this.menuData.path + '/' + path)
    }
  }
}
</script>

<style lang="scss">
  .menu-item {
    &:last-child {
      ul {
        border-bottom: none;
      }
    }
    ul {
      margin: 0 20px;
      padding: 10px 0;
      border-bottom: 1px solid #dedede;
    }
    .title,
    .item {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      border-left: 4px solid transparent;
      font-size: 1rem;
      line-height: 1;
      svg {
        height: 2rem;
        width: 2rem;
        margin-right: 20px;
        color: #808ea0;
      }
      span {
        color: #808ea0;
      }
    }
    .item {
      cursor: pointer;
      padding-left: 70px;
      transition: border-color .3s,background-color .3s,color .3s;
      border-radius: 5px;
      margin-bottom: 10px;
      &:hover {
        outline: none;
        background-color: #ecf5ff;
      }
      &.is-active {
        color: #409eff;
        background-color: #ecf5ff;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
      }
    }
  }
</style>
