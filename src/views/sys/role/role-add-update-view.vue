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
        @keyup.enter.native="dialogStatus==='add'?addData():updateData()"
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
  import { getMenuList, addRole, getMenusByRoleId } from '@/api/sys'

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
        menusSelect: [],//选中的菜单
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
    methods: {
      init(row, param) {
        this.viewDisabled = false //可以编辑
        this.visible = true
        this.menuData = []
        this.menuKeys = []//默认选中的和默认展开的
        this.getMenuData()

        // this.dialogStatus = param
        if (param) {//如果是新增传过来，那么param为undefined,将会走else
          this.dialogStatus = param
          this.temp = Object.assign({}, row) // copy obj
          //根据角色id获取角色拥有的菜单
          getMenusByRoleId({ id: row.id }).then(data => {//这是json字符串请求
            if (data.code == '20000') {
              this.menuKeys=data.data
            }else{
            }
          })
          // 显示顶部文字
          switch (param) {
            case 'edit':
              break
            case 'view':
              this.viewDisabled = true //不可编辑
              break
          }
        } else {
          this.dialogStatus = 'add'
          this.$refs.dataForm.resetFields()//对该表单项进行重置，将其值重置为初始值并移除校验结果
          this.temp.avatar = 'http://youyasumi-oss.oss-cn-beijing.aliyuncs.com/76e11fce-e7fd-4985-84ec-2332b9dfef84.png'
          // this.$refs.dataForm.clearValidate()//清除校验结果
        }
      },
      addData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.menusSelect = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
            addRole({
              roleName: this.temp.roleName,
              roleDesc: this.temp.roleDesc,
              menusSelect: this.menusSelect
            }).then(data => {
              if (data.code == '20000') {
                this.$notify({
                  title: '成功',
                  message: data.message,
                  type: 'success',
                  duration: 2000,
                  onClose: () => {
                    this.visible = false
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
            this.menusSelect = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
            addRole({
              id:this.temp.id,
              roleName: this.temp.roleName,
              roleDesc: this.temp.roleDesc,
              menusSelect: this.menusSelect
            }).then((data) => {

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
          if (data) {
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
    },

    created() {
      // // 获取账号状态下拉框
      this.getTypeValue('account_status').then(res => {
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
