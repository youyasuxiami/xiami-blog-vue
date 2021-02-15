<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">
        <h3>
          博客后台管理系统
        </h3>
      </div>
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="loginRules"
               class="ms-content"
               label-position="left"
               @keyup.enter.native="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            auto-complete="off">
            <template slot="prepend">
              <svg-icon icon-class="user"/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            name="password"
            auto-complete="off"
            @keyup.enter.native="handleLogin">
            <template slot="prepend">
              <svg-icon icon-class="password"/>
            </template>
          </el-input>

        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="captcha">
              <el-input
                ref="username"
                v-model="loginForm.captcha"
                placeholder="验证码"
                name="captcha"
                type="text"
                auto-complete="off">
                <template slot="prepend">
                  <svg-icon icon-class="captcha"/>
                </template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <div style="margin-left: 7px;cursor: pointer">
              <img alt="如果看不清楚，请单击图片刷新！" class="pointer" :src="src" @click="refreshCode" width="100%" height="39px">
            </div>
          </el-col>

          <el-col :span="3">
            <div style="margin-left: 7px;margin-top: 40%;cursor: pointer" @click="refreshCode">
              <i class="el-icon-refresh-right"/>
            </div>
          </el-col>

        </el-row>


        <el-button :loading="loading"
                   style="width:100%;margin-bottom:30px;background: #373737;border: 0px;border-radius: 10px;color: #fff"
                   @click.native.prevent="handleLogin">登 录
        </el-button>

        <!--      <div class="tips">-->
        <!--        <span style="margin-right:20px;">username: admin</span>-->
        <!--        <span> password: any</span>-->
        <!--      </div>-->

      </el-form>
    </div>
  </div>
</template>
<script>
  import { getPublicKey,getCaptcha } from '@/api/user'
  import {JSEncrypt} from 'jsencrypt'

  export default {
    name: 'Login',
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!validUsername(value)) {
      //     callback(new Error('用户名不能为空'))
      //   } else {
      //     callback()
      //   }
      // }
      // const validatePassword = (rule, value, callback) => {
      //   if (value.length < 6) {
      //     callback(new Error('密码不能小于6位'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        loginForm: {
          username: '',
          password: '',
          captcha: ''
        },
        loginRules: {
          // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          // password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
        },
        loading: false,
        redirect: undefined,
        src: process.env.VUE_APP_BASE_API+'/captcha.jpg',
        rsaKey: ''
      }
    },
    // watch: {
    //   $route: {
    //     handler: function(route) {
    //       this.redirect = route.query && route.query.redirect
    //     },
    //     immediate: true
    //   }
    // },
    created(){
      this.getRsaKey()
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            localStorage.setItem("activeIndex",'')
            let jsonData=Object.assign({},this.loginForm);
            //加密
            jsonData.password= this.passwordEncryption(
              jsonData.password + ',' + new Date().getTime()
            )
            this.$store.dispatch('user/Login', jsonData).then((data) => {

              this.$router.push({ path: '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }
        })
      },
      refreshCode() {
        this.src = process.env.VUE_APP_BASE_API+'/captcha.jpg?t=' + new Date().getTime()
      },
      // 获取公钥的方法
      getRsaKey() {
        getPublicKey().then(data => {
          if (data.code == '20000') {
            this.rsaKey = data.data
          } else {
          }
        })
      },
      //密码加密方法
      passwordEncryption(passwordUser) {
        let publicKey = this.rsaKey // 从后台获取公钥
        let encryptor = new JSEncrypt() // 新建JSEncrypt对象
        encryptor.setPublicKey(publicKey) // 设置公钥
        let passwordEncryp = encryptor.encrypt(passwordUser) // 对密码进行加密
        return passwordEncryp
      },
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/outer_bg-f009f9.jpg);
    background-size: cover;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    /*color: #409EFF;*/
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 40%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
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
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .login-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      background-image: url(../../assets/img/login-bg.jpg);
      background-size: 100%;
    }

    .ms-login {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 350px;
      margin: -190px 0 0 -175px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.3);
      overflow: hidden;
    }

    .ms-title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      border-bottom: 1px solid #ddd;
    }

    .ms-content {
      padding: 30px 30px;
    }
  }
</style>
