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
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { modifyPassword } from '../../api/profile'

  export default {
    data() {
      let validateCheckedRoles = (rule, value, callback) => {
        if (this.form.newPassword!==value) {
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
          ],
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.formLoading = true
            modifyPassword({
              oldPassword:this.form.oldPassword,
              newPassword:this.form.newPassword
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
      }
    }
  }
</script>
<style scoped>
</style>
