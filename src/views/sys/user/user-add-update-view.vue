<template>
  <div>
    <el-dialog :visible.sync="visible" :title=textMap[dialogStatus] width="700px">
      <!-- 表单  start-->
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="120px"
        :rules="rule"
        @keyup.enter.native="dialogStatus==='add'?addData():updateData()"
      >
        <!--        <el-row :gutter="10">-->
        <el-row class="demo-avatar demo-basic">
          <el-col :span="12">
            <el-form-item label="头像" prop="status">
              <pan-thumb :image="temp.avatar" @click.native="toggleShow"/>
              <image-cropper
                v-model="show"
                field="multipartFile"
                :size="50"
                :url="url"
                :headers="headers"
                img-format="png"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="temp.name" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="temp.nickName" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="temp.sex" :disabled="viewDisabled">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="temp.age" clearable type="number"
                               :min="1" :disabled="viewDisabled"></el-input-number>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="temp.phone" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="temp.email" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="账号状态" prop="status">
              <el-select v-model="temp.status" placeholder="请选择" clearable class="m-max-width" :disabled="viewDisabled">
                <el-option :label="item.value" :value="item.code" v-for="item in accountStatusList"
                           :key="item.index1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="temp.newPassword" :type="passwordType2" :key="passwordType2" style="width: 200px;"            ref="newPassword"

              >
                <template slot="append">
                  <div @click="showPwd2" style="cursor: pointer !important;">
                    <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'"/>
                  </div>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="temp.confirmPassword":type="passwordType3" :key="passwordType3" style="width: 200px;"            ref="confirmPassword"

              >
                <template slot="append">
                  <div @click="showPwd3" style="cursor: pointer !important;">
                    <svg-icon :icon-class="passwordType3 === 'password' ? 'eye' : 'eye-open'"/>
                  </div>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="ps">
              <el-input v-model="temp.ps" placeholder="请输入备注" clearable type="textarea"
                        resize="none" :disabled="viewDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色选择" prop="role">
              <el-checkbox-group
                v-model="checkedRoles"
              >
                <el-checkbox v-for="role in roles"
                             :label="role.id"
                             :key="role.id"
                             :disabled="viewDisabled"
                >
                  {{role.roleName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表单  end-->

      <!--      底部按钮 start-->
      <div slot="footer" class="m-footer">
        <!--        新增/编辑-->
        <div v-if="!viewDisabled">
          <el-button @click="visible = false">
            取消
          </el-button>
          <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
            提交
          </el-button>
        </div>
        <!--        查看-->
        <div v-else>
          <el-button @click="visible = false">
            取消
          </el-button>
        </div>
      </div>
      <!--      底部按钮 end-->
    </el-dialog>
  </div>
</template>
<script>
  import { addUser, getRoles, getCheckedRoles } from '@/api/sys'
  import ImageCropper from 'vue-image-crop-upload'
  import PanThumb from '@/components/PanThumb'

  export default {
    data() {
      var validateCheckedRoles = (rule, value, callback) => {
        if (this.checkedRoles.length == 0) {
          callback(new Error('请选择角色'))
        } else {
          callback()
        }
      }
      return {
        visible: true,
        dialogStatus: '',
        addUpdateVisible: true,
        accountStatusList: [],//账号状态数组
        viewDisabled: false,//false：表示可以编辑
        show: false,//默认不显示头像修改框
        url: process.env.VUE_APP_BASE_API + '/upload',
        // params: {
        //   access_token: getToken()
        // },
        headers: {
          smail: '*_~'
        },
        checkedRoles: [],
        roles: [],
        temp: {
          name: '',
          nickName: '',
          sex: '0',
          age: '',
          phone: '',
          email: '',
          ps: '',
          status: '',
          avatar: '',
          newPassword:'',
          confirmPassword:''
        },
        textMap: {
          add: '申请',
          edit: '编辑',
          view: '查看'
        },
        passwordType2: 'password',
        passwordType3: 'password',
        rule: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '年龄不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系方式不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '电子邮箱不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '账号状态不能为空', trigger: 'blur' }
          ],
          role: [
            // { required: true, message: '角色必选，请选择角色', trigger: 'blur' }
            { validator: validateCheckedRoles, trigger: 'blur' }
          ]
        }
      }
    },
    components: { ImageCropper, PanThumb },
    methods: {
      init(row, param) {
        this.viewDisabled = false //可以编辑
        this.visible = true
        // this.dialogStatus = param
        if (param) {//如果是新增传过来，那么param为undefined,将会走else
          this.dialogStatus = param
          this.temp = Object.assign({}, row) // copy obj
          switch (this.temp.sex) {
            case '男':
              this.temp.sex = '0'
              break
            case '女':
              this.temp.sex = '1'
              break
          }

          switch (param) {
            case 'edit':
              this.getChecked()//获取选中的角色数组
              break

            case 'view':
              this.getChecked()//获取选中的角色数组
              this.viewDisabled = true //不可编辑
              break
          }
        } else {
          this.dialogStatus = 'add'
          this.$refs.dataForm.resetFields()//对该表单项进行重置，将其值重置为初始值并移除校验结果
          this.checkedRoles = []
          this.temp.avatar = 'http://youyasumi-oss.oss-cn-beijing.aliyuncs.com/76e11fce-e7fd-4985-84ec-2332b9dfef84.png'
          // this.$refs.dataForm.clearValidate()//清除校验结果
        }
      },
      addData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            // this.temp.author = 'vue-element-admin'
            this.temp.roleIds = this.checkedRoles
            addUser(this.temp).then(data => {
              if (data.code == '20000') {
                this.$notify({
                  title: '成功',
                  message: data.message,
                  type: 'success',
                  duration: 2000,
                  onClose: () => {
                    this.visible = false
                    // this.isDisabled = false;
                    this.$emit('refreshDataList')
                  }
                })
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
      updateData: function() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            for (var i in this.accountStatusList) {
              if (this.accountStatusList[i].value === this.temp.status) {
                this.temp.status = this.accountStatusList[i].code
              }
            }
            this.temp.roleIds = this.checkedRoles
            addUser(this.temp).then((data) => {
              if (data.code == '20000') {
                this.$notify({
                  title: '成功',
                  message: data.message,
                  type: 'success',
                  duration: 2000,
                  onClose: () => {
                    this.visible = false
                    // this.isDisabled = false;
                    this.$emit('refreshDataList')
                  }
                })
                if (this.temp.name == 'zhengjin') {
                  this.$store.dispatch('user/setAvatar', this.temp.avatar)
                }
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
      toggleShow() {
        this.show = !this.show
      },
      /**
       *
       * @param image
       * @param field
       */
      cropSuccess(image, field) {
        this.temp.avatar = image
      },
      /**
       * 上传成功
       * @param jsonData 服务器返回数据，已进行 JSON 转码
       * @param field
       */
      cropUploadSuccess(jsonData, field) {
        this.temp.avatar = jsonData.data.path
      },
      /**
       * 上传失败
       * @param status 服务器返回的失败状态码
       * @param field
       */
      cropUploadFail(status, field) {
      },
      getChecked() {
        getCheckedRoles({ id: this.temp.id }).then(res => {
          this.checkedRoles = res.data
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
    },
    created() {
      // // 获取账号状态下拉框
      this.getTypeValue('account_status').then(res => {
        this.accountStatusList = res.data
      })

      getRoles().then(res => {
        this.checkedRoles = []
        this.roles = res.data
        // for (let i = 0; i < res.data.length; i++) {
        //   //如果选中，就加入checkedRoles数组
        //   if (res.data[i].checked) {
        //     this.checkedRoles.push(res.data[i].id)
        //   }
        // }
      })
    }
  }
</script>
<style lang="scss" scoped>
  .m-max-width {
    width: 100%;
  }

  .m-footer {
    text-align: center;
    margin-bottom: 35px;
  }
</style>
