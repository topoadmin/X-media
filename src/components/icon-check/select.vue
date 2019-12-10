<template>
  <div>
    <i v-if="showIcon" :class="'icon-check-select-active iconfont ' + cValue" />
    <el-select v-model="cValue" placeholder="请选择图标" clearable @change="change" >
      <el-option value="i-c-s-dialog" label="切换大窗口选择图标" />
      <el-option value="" disabled />
      <el-option
        v-for="icon in list"
        :key="'check-icon-'+icon"
        :label="icon"
        :value="icon">
        <i :class="'iconfont ' + icon" style="font-size: 20px;" />
        <span style="float: right; color: #8492a6; font-size: 14px">{{ icon }}</span>
      </el-option>
    </el-select>
    <el-dialog :visible="showDialog" top="5%" append-to-body modal-append-to-body @close="dialogClose">
      <icon-check v-model="cValue" :size="5" @change="dialogChange" />
    </el-dialog>
  </div>
</template>

<script>
import list from './data.js'
import iconCheck from './index.vue'

export default {
  name: 'IconCheckSelect',
  components: { iconCheck },
  props: {
    value: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showDialog: false,
      list,
      cValue: this.value || ''
    }
  },
  methods: {
    dialogChange(v) {
      this.cValue = v
      this.showDialog = false
      this.change()
    },
    dialogClose() {
      this.showDialog = false
    },
    change() {
      if (this.cValue === 'i-c-s-dialog') {
        this.showDialog = true
        this.cValue = this.value
      } else {
        this.$emit('input', this.cValue)
      }
    }
  }
}
</script>

<style lang="scss">
.icon-check-select-active {
  padding-right: 10px;
  color: #409EFF;
}
</style>

