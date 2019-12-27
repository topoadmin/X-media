<!--
	* @author		Azil
	* @version 	0.0.1
	* @title    新闻发布
-->

<template>
  <div>
    <h1>新闻发布</h1>
    <el-input v-model="input" placeholder="输入内容" />
  </div>
</template>

<script>
export default {
  name: 'ArticleNews',
  data() {
    return {
      input: ''
    }
  }
}
</script>
