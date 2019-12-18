<!--
	* @author		Azil
	* @version 	0.0.1
	* @title    订单列表
-->

<template>
  <div>
    <h1>OrderList 测试缓存</h1>
    <el-input v-model="input" placeholder="输入内容" />
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      input: ''
    }
  }
}
</script>
