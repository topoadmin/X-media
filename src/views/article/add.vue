<!--
	* @author		Azil
	* @version 	0.0.1
	* @title    发布信息
-->

<template>
  <div>
    <h1>ArticleAdd 测试缓存</h1>
    <el-input v-model="input" placeholder="输入内容" />

    <h1>{{ arr }}</h1>
  </div>
</template>

<script>
export default {
  name: 'ArticleAdd',
  data() {
    return {
      input: '',
      arr: [1, 2, 3]
    }
  },
  created() {
    window.setTimeout(() => {
      this.arr = [3, 2, 1]
    }, 2000)
  }
}
</script>
