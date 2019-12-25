<!--
	* @author		Azil
	* @version 	0.0.1
	* @title  	首页
-->

<template>
  <div>
    <x-note type="danger">
      <h3>首先打开浏览器控制台 Network ， 点击下拉框 Online 添加一个 1KB 的网络限速</h3>
      <h3>生产环境中无需此操作，已做 30 秒延迟处理，同时也无法观测到请求的变换（意思是你什么也看不到, Mockjs 不支持）</h3>
      <h3>再点击下方按钮测试</h3>
    </x-note>
    <el-tabs tab-position="left">
      <el-tab-pane label="GET">
        <my-get v-model="res" />
      </el-tab-pane>
      <el-tab-pane label="POST">
        <my-post v-model="res" />
      </el-tab-pane>
    </el-tabs>

    <h1 class="margin-top">请求结果：</h1>
    <x-note type="success">
      <h2>{{ res && res.name }}</h2>
    </x-note>

    <div class="margin-top" />
    <el-button type="primary" plain @click="send">发起一个遮盖局部内容区的请求</el-button>
    <el-button type="primary" plain @click="sendBody">发起一个全局遮盖的请求</el-button>

  </div>
</template>

<script>
import XNote from '@/components/XNote'
import { getRequest } from '@/api/test'

import myGet from './get'
import myPost from './post'

export default {
  name: 'Home',
  components: {
    XNote,
    myGet,
    myPost
  },
  data() {
    return {
      res: null
    }
  },
  methods: {
    send() {
      getRequest({
        date: Date.now()
      }, {
        loading: '局部加载框测试....'
      })
    },
    sendBody() {
      getRequest({
        date: Date.now()
      }, {
        bodyLoading: '全局加载框测试....'
      })
    }
  }
}
</script>
