<!--
	* @author				Azil
	* @version			1.0.0
	* @desc:        笔记组件
	* @props
      type [String] 类型
  * @slot 内容
-->

<template>
  <div :class="['x-note', 'x-note-' + type]">
    <p>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: 'XNote',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss">
  $primary: #8bb4e7;
  $success: #67C23A;
  $warning: #E6A23C;
  $danger: #F56C6C;
  $info: #909399;
  .x-note {
    margin: 0 0 20px;
    border-radius: 4px;
    padding: 15px 30px 15px 15px;
    border-left: 5px solid #eee;
    background-color: #f5f8fd;
    color: #5e6d82;
    p {
      margin: 0;
    }
    &-primary {
      border-color: $primary;
      background-color: lighten($primary, 20%);
    }
    &-success {
      border-color: $success;
      background-color: lighten($success, 40%);
    }
    &-warning {
      border-color: $warning;
      background-color: lighten($warning, 30%);
    }
    &-danger {
      border-color: $danger;
      background-color: lighten($danger, 25%);
    }
    &-info {
      border-color: $info;
      background-color: lighten($info, 30%);
    }
  }
</style>
