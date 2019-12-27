<!--
	* @author		Azil
	* @version 	0.0.1
	* @title    自媒体发布
-->

<template>
  <div>
    <h1>自媒体发布</h1>
    <el-input v-model="input" placeholder="输入内容" />
  </div>
</template>

<script>
export default {
  name: 'ArticleVideo',
  data() {
    return {
      input: ''
    }
  }
}
</script>
