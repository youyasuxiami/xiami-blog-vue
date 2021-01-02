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
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="type">
              <el-select v-model="temp.type" placeholder="请选择" clearable class="m-max-width" :disabled="viewDisabled||checkDisabled">
                <el-option :label="item.value" :value="item.code" v-for="item in menuTypeList"
                           :key="item.index1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="父级菜单" prop="id" v-if="temp.type !=='0'&&temp.type !== '一级菜单'">
<!--              viewDisabled:true代表不可编辑-->
              <el-input
                v-model="temp.fatherMenuName"
                clearable
                :disabled="viewDisabled||checkDisabled"
                @focus="showTree"
              ></el-input>
              <el-tree
                style="border: 1px solid #ccc;z-index:10000;"
                :data="menuData"
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps"
                @node-click="handleNodeClick"
                v-bind:style="{display: isShowTree?'block':'none'}"
              >
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="temp.name" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单路径" prop="url">
              <el-input v-model="temp.url" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="权限" prop="perms" v-if="temp.type !== '0'&&temp.type !== '1'&&temp.type !== '2'&&temp.type !== '一级菜单'&&temp.type !== '二级菜单'&&temp.type !== '三级菜单'">
              <el-input v-model="temp.perms" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="排序号" prop="orderNum">
              <el-input v-model="temp.orderNum" :disabled="viewDisabled"/>
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
      <div class="cover" v-if="isShowCover" @click="closeAllCover"></div>
    </el-dialog>
  </div>
</template>
<script>
  import { addMenu, getMenuList } from '@/api/sys'

  export default {
    data() {
      return {
        visible: true,
        dialogStatus: '',
        addUpdateVisible: true,
        menuTypeList: [],//菜单类型数组
        viewDisabled: false,//false：表示可以编辑
        checkDisabled: false,//false：表示可以菜单类型/父级菜单编辑,在详情和编辑页面要设置为true,表示不可编辑
        // show: false,//默认不显示头像修改框
        // url: process.env.VUE_APP_BASE_API + '/upload',
        // params: {
        //   access_token: getToken()
        // },
        headers: {
          smail: '*_~'
        },
        isShowTree: false,
        isShowCover: false,
        menuData: [],//全部菜单
        listLoading: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // searchForm: {
        //   name: 'zhengjin'
        // },
        temp: {
          type: '',
          id: '',
          name: '',
          url: '',
          perms: '',
          orderNum: '',
          fatherMenuName: '',
          parentId: ''
        },
        textMap: {
          add: '申请',
          edit: '编辑',
          view: '查看'
        },
        rule: {
          type: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          // id: [
          //   { required: true, message: '父级菜单不能为空', trigger: 'blur' }
          // ],
          name: [
            { required: true, message: '菜单名称不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '菜单路径不能为空', trigger: 'blur' }
          ],
          // perms: [
          //   { required: true, message: '权限不能为空', trigger: 'blur' }
          // ],
          orderNum: [
            { required: true, message: '排序号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init(row, param) {
        this.viewDisabled = false //可以编辑
        this.checkDisabled = false //可以编辑
        this.visible = true
        this.menuData = []
        this.getMenuData()  //获得所有菜单

        // this.dialogStatus = param
        if (param) {//如果是新增传过来，那么param为undefined,将会走else
          this.dialogStatus = param
          this.temp = Object.assign({}, row) // copy obj
          switch (this.temp.type) {
            case 0:
              this.temp.type = '一级菜单'
              break
            case 1:
              this.temp.type = '二级菜单'
              break
            case 2:
              this.temp.type = '三级菜单'
              break
            case 3:
              this.temp.type = '按钮'
              break
          }

          switch (param) {
            case 'edit':
              this.checkDisabled = true //不可编辑
              break

            case 'view':
              this.viewDisabled = true //不可编辑
              this.checkDisabled = true //不可编辑
              break
          }
        } else {
          this.dialogStatus = 'add'
          this.$refs.dataForm.resetFields()//对该表单项进行重置，将其值重置为初始值并移除校验结果
          this.temp.fatherMenuName = ''
        }
      },
      // 申请提交
      addData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            // this.temp.author = 'vue-element-admin'
            addMenu(this.temp).then(data => {
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


            for (var i in this.menuTypeList) {
              if (this.menuTypeList[i].value === this.temp.type) {
                this.temp.type = this.menuTypeList[i].code
              }
            }
            addMenu(this.temp).then((data) => {
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
      showTree() {
        this.isShowTree = !this.isShowTree
        this.isShowCover = !this.isShowCover
      },
      // 获得菜单
      getMenuData() {
        // 请求参数
        // this.searchForm.pageNum = this.pageNum
        // this.searchForm.pageSize = this.pageSize
        // let data = this.searchForm

        this.listLoading = true
        getMenuList({}).then(data => {//这是json字符串请求
          if (data) {
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
      },
      // 关闭
      closeAllCover() {
        this.isShowCover = false
        this.isShowTree = false
      },
      handleNodeClick(data) {
        this.temp.fatherMenuName = data.name
        this.temp.parentId = data.id
      }
    },

    created() {
      //获取菜单类型下拉框
      this.getTypeValue('menu_type').then(res => {
        this.menuTypeList = res.data
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

  .cover {
    background-color: #ccc;
    opacity: 0.08;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
  }
</style>
