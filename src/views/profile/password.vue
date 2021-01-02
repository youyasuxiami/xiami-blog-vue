<template>
  <div class="app-container">
    <el-form
      ref="form"
      v-loading="formLoading"
      :data="form"
      element-loading-text="加载中..."
      :model="form"
      label-width="120px"
      :rules="rule"
      @keyup.enter.native="onSubmit"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" :type="passwordType1" :key="passwordType1" style="width: 200px;" ref="oldPassword"

        >
          <template slot="append">
            <div @click="showPwd1" style="cursor: pointer !important;">
              <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'"/>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" :type="passwordType2" :key="passwordType2" style="width: 200px;"            ref="newPassword"

        >
          <template slot="append">
            <div @click="showPwd2" style="cursor: pointer !important;">
              <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'"/>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword":type="passwordType3" :key="passwordType3" style="width: 200px;"            ref="confirmPassword"

        >
          <template slot="append">
            <div @click="showPwd3" style="cursor: pointer !important;">
              <svg-icon :icon-class="passwordType3 === 'password' ? 'eye' : 'eye-open'"/>
            </div>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { modifyPassword } from '../../api/profile'
  import { getPublicKey } from '@/api/user'
  import { JSEncrypt } from 'jsencrypt'

  export default {
    data() {
      let validateCheckedRoles = (rule, value, callback) => {
        if (this.form.newPassword !== value) {
          callback(new Error('两次输入的密码不一致，请重新输入'))
        } else {
          callback()
        }
      }
      return {
        formLoading: false,
        form: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rule: {
          oldPassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validateCheckedRoles, trigger: 'blur' }
          ]
        },
        rsaKey: '',
        passwordType1: 'password',
        passwordType2: 'password',
        passwordType3: 'password'
      }
    },
    created() {
      this.getRsaKey()
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // this.formLoading = true
            //加密
            let oldPassword = this.passwordEncryption(
              this.form.oldPassword + ',' + new Date().getTime()
            )
            let newPassword = this.passwordEncryption(
              this.form.newPassword + ',' + new Date().getTime()
            )
            // 获得加密后的密码
            modifyPassword({
              oldPassword: oldPassword,
              newPassword: newPassword
            }).then(data => {
              this.formLoading = false
              if (data.code == '20000') {
                this.$notify({
                  title: '成功',
                  message: data.message,
                  type: 'success',
                  duration: 2000
                })
                this.fetchData()

              } else {
                this.$notify({
                  title: '失败',
                  message: data.message,
                  type: 'error',
                  duration: 2000
                })
              }
            })
          }
        })
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
      showPwd1() {
        if (this.passwordType1 === 'password') {
          this.passwordType1 = ''
        } else {
          this.passwordType1 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.oldPassword.focus()
        })
      },
      showPwd2() {
        if (this.passwordType2 === 'password') {
          this.passwordType2 = ''
        } else {
          this.passwordType2 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.newPassword.focus()
        })
      },

      showPwd3() {
        if (this.passwordType3 === 'password') {
          this.passwordType3 = ''
        } else {
          this.passwordType3 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.confirmPassword.focus()
        })
      }
    }
  }
</script>
<style scoped>
</style>
