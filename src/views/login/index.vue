<template>
  <div ref="wrapper" class="login-wrapper">
    <el-row class="login-body">
      <el-col :span="12" :xs="0" class="left">
        <div class="left-body">
          <h1>X 媒体直通车</h1>
          <p>直通短视频、VLOG、自媒体、软文、广告牌等各种媒体</p>
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
            <!-- <img :src="@/icons/svg/friends.svg" alt=""> -->
            <svg-icon icon-class="friends" />
            <img src="img/azil-orange-ico.png" alt="">
          </div>
          <el-form ref="form" :model="form" :rules="rules" autocomplete="off">
            <el-form-item prop="username">
              <md-input id="username" v-model="form.username" name="username" autofocus @keyup.enter.native="submitForm">用户名</md-input>
            </el-form-item>
            <el-form-item prop="password">
              <md-input v-model="form.password" name="password" type="password" @keyup.enter.native="submitForm">密码</md-input>
            </el-form-item>
            <el-form-item style="overflow: hidden;">
              <el-button v-waves :loading="loading" class="login-button" type="primary" plain @click="submitForm">登 录</el-button>
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
      loading: false,
      form: {
        username: 'admin',
        password: 'admin123456'
      },
      rules: {
        username: [
          {
            required: true,
            min: 3,
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
  mounted() {
    this.$nextTick(() => {
      this.$refs.wrapper.click()
    })
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/setUsername', this.form.username).then(() => {
            this.$message.success('登录成功')
            this.$router.push('/')
          })
        }
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
          height: 200px;
          width: 200px;
          border-radius: 50%;
          margin: 0 auto 20px auto;
          border: 1.4px solid $placeholder;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          svg,
          img {
            width: 90%;
            height: 90%;
            transform: rotateY(0);
            transition: all 0.333s ease-out 0s;
            backface-visibility: hidden;
          }
          img {
            position: absolute;
            top: 5%;
            left: 5%;
            opacity: 0;
            transform: rotateY(180deg);
          }
          &:hover {
            svg {
              opacity: 0;
              transform: rotateY(-180deg);
            }
            img {
              opacity: 1;
              transform: rotateY(0deg);
            }
          }
        }
        .login-button {
          width: 100%;
          display: block;
          background: lighten($accent, 16%);
          color: $white-smoke;
          font-size: 16px;
          font-weight: bold;
          border: none;
          overflow: hidden;
          &:hover {
            background: lighten($accent, 20%);
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
