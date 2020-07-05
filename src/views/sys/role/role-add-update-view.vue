<template>
  <div>
    <el-dialog :visible.sync="visible" :title=textMap[dialogStatus]>
      <!-- 表单  start-->
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="120px"
        :rules="rule"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="temp.roleName" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色描述" prop="roleDesc">
              <el-input v-model="temp.roleDesc" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        菜单-->
        <el-tree
          ref="tree"
          :data="menuData"
          show-checkbox
          node-key="id"
          :default-expanded-keys=menuKeys
          :default-checked-keys=menuKeys
          :props="defaultProps">
        </el-tree>
      </el-form>
      <!-- 表单  end-->

      <!--      底部按钮 start-->
      <div slot="footer" class="m-footer">
        <!--        新增/编辑-->
        <div v-if="!viewDisabled">
          <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
            提交
          </el-button>
          <el-button @click="visible = false">
            取消
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
  import { getMenuList } from '@/api/sys'
  import { getTypeValue } from '@/utils/dictionary'
  import ImageCropper from 'vue-image-crop-upload'
  import PanThumb from '@/components/PanThumb'
  import { modifyIcon } from '@/api/profile'

  export default {
    data() {
      return {
        visible: true,
        dialogStatus: '',
        addUpdateVisible: true,
        accountStatusList: [],//账号状态数组
        viewDisabled: false,//false：表示可以编辑
        show: false,//默认不显示头像修改框
        url: process.env.VUE_APP_BASE_API + '/upload',
        menuData: [],
        menuKeys: [],//节点
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // params: {
        //   access_token: getToken()
        // },
        headers: {
          smail: '*_~'
        },
        // searchForm: {
        //   name: 'zhengjin'
        // },
        temp: {
          roleName: '',
          roleDesc: ''
        },
        textMap: {
          add: '申请',
          edit: '编辑',
          view: '查看'
        },
        rule: {
          roleName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          roleDesc: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: { ImageCropper, PanThumb },
    methods: {
      init(row, param) {
        this.viewDisabled = false //可以编辑
        this.visible = true
        this.menuData = []
        this.getMenuData()

        // this.dialogStatus = param
        if (param) {//如果是新增传过来，那么param为undefined,将会走else
          console.log('编辑/查看')
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
              console.log('edit')
              break

            case 'view':
              console.log('view')
              this.viewDisabled = true //不可编辑
              break
          }
        } else {
          console.log('add')
          this.dialogStatus = 'add'
          this.$refs.dataForm.resetFields()//对该表单项进行重置，将其值重置为初始值并移除校验结果
          this.temp.avatar = 'http://youyasumi-oss.oss-cn-beijing.aliyuncs.com/76e11fce-e7fd-4985-84ec-2332b9dfef84.png'
          // this.$refs.dataForm.clearValidate()//清除校验结果
        }
      },
      addData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log('---------------')
            console.log(this.$refs.tree.getCheckedKeys())//完全选中
            console.log(this.$refs.tree.getHalfCheckedKeys())//半选中
            console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))

            return false
            // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            // this.temp.author = 'vue-element-admin'
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
            addUser(this.temp).then((data) => {

              // // 更新头像
              // modifyIcon({
              //   username: this.temp.name,
              //   path: jsonData.data.path
              // }).then(response => {
              //   this.$message({
              //     message: response.message,
              //     type: 'success'
              //   })
              //   console.log(jsonData.data.path)
              //   // 更新 vuex 中的头像
              //   // this.$store.dispatch('user/setAvatar', jsonData.data.path)
              // }).catch(() => {
              // })

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
      //获得菜单
      getMenuData() {
        // 请求参数
        // this.searchForm.pageNum = this.pageNum
        // this.searchForm.pageSize = this.pageSize
        // let data = this.searchForm

        this.listLoading = true
        getMenuList({}).then(data => {//这是json字符串请求
          console.log('data')
          console.log(data)
          if (data) {
            // console.log('菜单',JSON.parse(data.data))
            // let record = JSON.parse(data.data)
            this.menuData = data.data.data

            // if(this.editVisible || this.detailVisible){
            //   this.getMenuId()
            // }
          } else {
            this.$message.error(`加载权限失败!`)
          }

          // this.list = response.data.data
          // this.total = response.data.total
          this.listLoading = false
        })
      }
      //获取已选择菜单的id
      // getMenuId () {
      //   console.log('获取菜单id')
      //   this.$http({
      //     url: '/power-grid/role/getRoleMenusJson',
      //     method: 'get',
      //     params:{
      //       id: this.dataForm.id || null
      //     }
      //   }).then(( data ) => {
      //     if (data) {
      //       // console.log(data)
      //       let menuList = []
      //       menuList = data.data
      //       for(var i in menuList){
      //         this.menuKeys.push(menuList[i].menuId)
      //       }
      //       // console.log('this.menuKeys',this.menuKeys)
      //       this.getCheck()
      //
      //     } else {
      //       this.$message.error(`加载权限失败!`)
      //     }
      //   })
      // }
    },

    created() {
      // // 获取账号状态下拉框
      getTypeValue('account_status').then(res => {
        this.accountStatusList = res.data
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
  }
</style>
