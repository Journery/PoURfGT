<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h1 class="title">高校老年教师工作平台</h1>
      </div>
      <div class="page-title-container">
        <p class="title">账号密码登录</p>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="save-password-container">
        <el-checkbox v-model="save_password" label="记住密码" name="save_password" />
        <a text-align="right">忘记密码?</a>
      </div>

      <!-- </el-form-item> -->

      <el-button :loading="loading" class="login-button" type="primary" style="" @click.native.prevent="handleLogin">
        登录
      </el-button>

      <el-row class="face-login-container" :gutter="10">
        <el-col>
          <p>- 其他登录方式 -</p>
        </el-col>
        <el-col :span="8">
          <el-button class="other-login-button" @click="dialogVisible = true">
            <span style="color: #889aa4;">
              <svg-icon icon-class="face" />
            </span>
            人脸
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-button class="other-login-button" @click="axiosTest">
            <span style="color: #889aa4;">
              <svg-icon icon-class="wechat" />
            </span>
            微信
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-button class="other-login-button">
            <span style="color: #889aa4;">
              <svg-icon icon-class="qq" />
            </span>
            QQ
          </el-button>
        </el-col>
      </el-row>
      <!--      <div class="tips" ref="tip">
        <span style="margin-right:20px;">username: teacher或student</span>
        <span> password: any</span>
      </div> -->
      <el-dialog
        ref="FaceDialog"
        v-el-drag-dialog
        :visible.sync="dialogVisible"
        title="刷脸登录"
        @opened="handleOpened"
        @close="handleClose()"
      >
        <div class="video-container">
          <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay />
          <canvas id="canvasCamera" style="display:none;" :width="videoWidth" :height="videoHeight" />
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import {
  validateUsername,
  validatePassword
} from '@/utils/validate'
import { getInfo } from '@/api/user'
import elDragDialog from '@/directive/el-drag-dialog'
import axios from 'axios'

export default {
  name: 'Login',
  directives: {
    elDragDialog
  },
  data() {
    return {
      save_password: true,
      dialogVisible: false,
      videoWidth: 500,
      videoHeight: 500,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      loginForm: {
        username: '20720000',
        password: '123456'
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    axiosTest() {
      // axios.get("/api/login.do?username=10001&password=123456&user_type=2").then(function(resp){
      //   console.log(resp);
      // })
      axios.post('/api/login.do', this.loginForm).then(resp => {
        console.log(resp)
      })
      axios.post('/api/getUserInfo.do', { 'username': this.loginForm.username }).then(resp => {
        console.log(resp)
      })
      getInfo(this.loginForm.username).then(resp => {
        console.log(resp)
      })
      // axios.post("/api/query_student_list.do", data).then(function(res){
      //   console.log(res);
      // })

      // getStudentList(data).then(response => {
      //   this.$message("get");
      //   console.log(response);
      // })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({
          path: this.redirect || '/'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('user/login', this.loginForm).then(() => {
      //       this.$router.push({
      //         path: this.redirect || '/'
      //       })
      //       this.loading = false
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    getCompetence() {
      var _this = this
      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: 'scaleX(-1)'
        }
      }
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in _this.thisVideo) {
          _this.thisVideo.srcObject = stream
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream)
        }
        _this.thisVideo.onloadedmetadata = function(e) {
          _this.thisVideo.play()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    //  绘制图片（拍照功能）
    setImage() {
      var _this = this
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL('image/png')
      _this.imgSrc = image
      const blob = this.dataURLtoBlob(image)
      var fd = new FormData()
      fd.append('file', blob)
      this.$store.dispatch('user/face', resp).then(() => {
        this.$router.push({
          path: this.redirect || '/'
        })
      }).catch(() => {
        this.$message('验证失败，请重试')
      })
      // this.$emit('refreshDataList', this.imgSrc)
    },

    // base64转文件
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },

    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop()
    },

    handleOpened(done) {
      this.getCompetence()
      this.$message('正在获取人脸中，请保持不动')
      const now_this = this
      setTimeout(function() {
        now_this.setImage()
      }, 2000)
    },

    handleClose(done) {
      this.stopNavigator()
      this.imgSrc = ''
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    background-image: url("../../assets/login-bg.jpeg");
    background-size: 100% 100%;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.3);
      border-radius: 40px;
      color: #454545;
    }

    .el-form-item:hover,
    .el-form-item:focus {
      background: rgba(0, 0, 20, 0.7);
      outline: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      border-color: rgba(255, 255, 255, 0.7);
    }

  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color: $bg;
    background-image: url(../../assets/login-bg.jpeg);
    background-size: 100% 100%;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 220px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .login-button {
      width: 100%;
      margin-bottom: 10px;
      background: #fbceb5;
      border: 1px solid #fbceb5;
      color: #000;
      border-radius: 40px;
      height: 47px;
    }

    .other-login-button {
      width: 100%;
      margin-bottom: 10px;
      background: #fbceb5;
      border: 1px solid #fbceb5;
      color: #000;
      border-radius: 40px;
      height: 47px;
      padding: 0 0 0 0;
    }

    .face-login-container {
      position: relative;
      text-align: center;
      color: #eee;
      margin-bottom: 10px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $light_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 32px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .page-title-container {
      position: relative;

      .title {
        font-size: 24px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
      }
    }

    .save-password-container {
      display: flex;
      justify-content: space-between;
      align-content: center;
      color: #fbceb5;
      font-size: 14px;
      margin-bottom: 15px;
      padding: 0 15px 0 15px;

      ::v-deep .el-checkbox {
        color: #fbceb5;
        font-size: 14px;
      }

      ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #fbceb5;
        font-size: 14px;
      }

      ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #fbceb5;
        border-color: #fbceb5;
      }

    }

    .video-container {
      text-align: center;

      .video {
        width: 50%;
        height: 50%;
        margin: 50px auto;
        background-color: aquamarine;
        display: block;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $light_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
