<template>
  <ul class="icon-list">
    <li
      v-for="(icon, index) in list"
      :key="index + icon"
      :style="{ 'width': percent + '%' }"
      :class="{ 'is-active': value === icon }"
      @click="change(icon)"
    >
      <span>
        <i :class="'iconfont ' + icon" />
        <span class="icon-name">{{ icon }}</span>
      </span>
    </li>
  </ul>
</template>

<script>
import list from './data.js'
export default {
  name: 'IconCheck',
  props: {
    value: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      list
    }
  },
  computed: {
    percent() {
      return 100 / this.size
    }
  },
  methods: {
    change(icon) {
      this.$emit('input', icon)
      this.$emit('change', icon)
      this.$emit('close', icon)
    }
  }
}
</script>

<style lang="scss">

.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-radius: 4px;
  border: 1px solid transparent;
  margin: 0 auto;
  li {
    cursor: pointer;
    float: left;
    width: 10%;
    text-align: center;
    height: 130px;
    line-height: 130px;
    font-size: 14px;
    border: 1px solid transparent;
    &:after {
      content: "";
      height: 100%;
    }
    &:after,
    span {
      display: inline-block;
      vertical-align: middle;
    }
    span {
      line-height: normal;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, SimSun, sans-serif;
      color: #99a9bf;
      transition: color 0.15s linear;
    }
    i {
      display: block;
      font-size: 50px;
      margin-bottom: 5px;
      color: #1a72ff;
      transition: color 0.15s linear;
    }
    .icon-name {
      display: inline-block;
      padding: 0 1rem;
      font-size: 14px !important;
      text-align: justify;
      word-break: break-all;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 这里修改为要显示的行数
      -webkit-box-orient: vertical;
    }
    &.is-active,
    &:hover {
      border-color: #e8e8e8;
      box-shadow: -1px 3px 10px 0 rgba(0,0,0,0.06);
    }
  }
}
</style>
