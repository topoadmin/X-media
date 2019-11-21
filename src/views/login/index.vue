<template>
  <div class="login-wrapper">
    <el-row class="login-body">
      <el-col :span="12" :xs="0" class="left">
        <div class="left-body">
          <h1>X 媒体直通车</h1>
          <p>直通小视频、VLOG、自媒体、软文、广告牌等各种媒体</p>
        </div>
      </el-col>
      <el-col :span="12" :xs="24" class="right">
        <div class="logo-wrap">
          <div class="wrap-inner">
            <img src="img/X.png" alt="" >
          </div>
        </div>
        <div class="login-form">
          <div class="avatar">
            <img src="img/azil-orange-ico.png" alt="">
          </div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username">
              <md-input v-model="form.username" name="username" @keyup.enter.native="submitForm">用户名</md-input>
            </el-form-item>
            <el-form-item prop="password">
              <md-input v-model="form.password" name="password" type="password" @keyup.enter.native="submitForm">密码</md-input>
            </el-form-item>
            <el-form-item style="overflow: hidden;">
              <el-button :loading="loading" class="block-100" type="primary" plain @click="submitForm">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MdInput from '@/components/md-input'
export default {
  name: 'Login',
  components: { MdInput },
  data() {
    return {
      universeKey: +new Date(),
      list: [1, 2, 3],
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            min: 2,
            max: 16,
            message: '请输入 2-16 位用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            min: 8,
            message: '密码最小长度为 8 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$notify.success({
        title: '系统提示',
        message: '请继续点击登录',
        position: 'top-left'
      })
    }
  }
}
</script>

<style lang="scss">
$accent: #475069;
$white-smoke: #fcfcfc;
$white: #fff;
$placeholder: #cecece;
$green: #1CE589;
.login-wrapper {
  height: 100vh;
  display: flex;
  .login-body {
    flex: 1;
    .left {
      height: 100%;
      position: relative;
      background: lighten($accent, 16%);
      .left-body {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translate(0, -50%);
        h1,
        p {
          font-weight: bold;
          color: $white-smoke;
        }
        h1 {
          font-size: 4rem;
          text-shadow: 4px 4px darken($accent, 8%), 8px 8px darken($accent, 8%);
        }
      }
    }
    .right {
      height: 100%;
      position: relative;
      .logo-wrap {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: -100px;
        height: 200px;
        width: 200px;
        border-radius: 50%;
        background: $white;
        display: flex;
        justify-content: center;
        align-items: center;

        .wrap-inner {
          height: 186px;
          width: 186px;
          border-radius: 50%;
          background: linear-gradient(180deg, lighten($accent, 16%), $accent);
          background-size: 400% 400%;
          animation: gradientShift 45s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            animation: shaking .2s steps(6, end) infinite;
            display: block;
            width: 80%;
          }
        }
      }
      .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        max-width: 400px;
        width: 60%;
        .avatar {
          position: relative;
          height: 110px;
          width: 110px;
          border-radius: 50%;
          margin: 0 auto 20px auto;
          border: 1.4px solid $placeholder;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            display: block;
            height: 94px;
            width: 94px;
            border-radius: 50%;
          }
        }
        .block-100 {
          background: lighten($accent, 16%);
          color: $white-smoke;
          font-size: 16px;
          font-weight: bold;
          border: none;
          overflow: hidden;
          &::after {
            position: absolute;
            transition: .3s;
            content: '';
            height: 2px;
            background: $white;
            left: 0;
            bottom: auto;
            top: -2px;
            width: 100%;
          }
          &:hover {
            background: lighten($accent, 18%);
            &::after {
              top: 100%;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .login-wrapper {
    .login-body {
      .right {
        .avatar {
          display: none !important;
        }
        .logo-wrap {
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          .wrap-inner {
            height: 134px;
            width: 134px;
          }
        }
        .login-form {
          top: 65%;
        }
      }
    }
  }
}
</style>
