<!--
	* @author		Azil
	* @version 	0.0.1
	* @title  	首页
-->

<template>
  <div>
    <x-note>
      <h1>POST 请求演示</h1>
    </x-note>
    <el-button type="primary" plain @click="send">发起10个请求</el-button>
    <el-button type="danger" plain @click="stop">结束所有请求</el-button>
    <div class="margin-top" />
    <el-button type="primary" plain @click="sendOne">关闭历史同请求，只保留新请求（多次点击）</el-button>
    <el-button type="primary" plain @click="sendTwo">如果历史请求未结束，禁止发起同请求（多次点击）</el-button>
  </div>
</template>

<script>
import XNote from '@/components/XNote'
import { postRequest } from '@/api/test'
import { inPathDelete } from '@/utils/axiosHandler'

export default {
  name: 'HomePost',
  components: {
    XNote
  },
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      res: null
    }
  },
  methods: {
    sendOne() {
      postRequest({
        date: Date.now()
      }, {
        closeRepeat: true,
        repeatParams: true
      }).then(data => {
        this.$emit('input', data.data)
      }).catch(err => {
        console.error(err)
      })
    },
    sendTwo() {
      postRequest({
        date: Date.now()
      }, {
        repeat: true,
        repeatParams: true
      }).then(data => {
        this.$emit('input', data.data)
      }).catch(err => {
        console.error(err)
      })
    },
    send() {
      for (let i = 0; i < 10; i++) {
        postRequest().then(data => {
          this.$emit('input', data.data)
        }).catch(err => {
          console.error(err)
        })
      }
    },
    stop() {
      inPathDelete('postRequest', true)
    }
  }
}
</script>
