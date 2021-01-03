<template>
  <div class="app-container">
    <div>

      <el-form ref="form" :model="searchForm" label-width="80px" size="mini" :inline="true" @keyup.enter.native="fetchData"
      >
        <el-form-item label="用户名">
          <el-input v-model="searchForm.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="searchForm.nickName" clearable></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="value1" multiple placeholder="请选择" style="width: 360px;">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="searchForm.sex" placeholder="请选择" clearable>
            <el-option :label="item.value" :value="item.code" v-for="item in sexList"
                       :key="item.index1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账号状态">
          <el-select v-model="searchForm.accountStatus" placeholder="请选择" clearable>
            <el-option :label="item.value" :value="item.code" v-for="item in accountStatusList"
                       :key="item.index1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="yearApply">
          <!--          <el-date-picker-->
          <!--            v-model="searchForm.createTime"-->
          <!--            type="date"-->
          <!--            format="yyyy-MM-dd"-->
          <!--            value-format="yyyy-MM-dd"-->
          <!--            placeholder="选择日期时间">-->
          <!--          </el-date-picker>-->
          <!--          - -->
          <!--          <el-date-picker-->
          <!--            v-model="searchForm.createTime"-->
          <!--            type="date"-->
          <!--            format="yyyy-MM-dd"-->
          <!--            value-format="yyyy-MM-dd"-->
          <!--            placeholder="选择日期时间">-->
          <!--          </el-date-picker>-->
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData" size="mini">
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <!--      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center append-to-body>-->
      <!--        <p style="margin-bottom: 12px;">请选择回退的范围</p>-->
      <!--        <el-radio-group v-model="exportFlag">-->
      <!--          <el-radio label="1">上一步</el-radio>-->
      <!--          <el-radio label="2">回退全部</el-radio>-->
      <!--        </el-radio-group>-->
      <!--        <span slot="footer" class="dialog-footer">-->
      <!--          <el-button type="primary" @click="audit('rollback',backRadio)">确 定</el-button>-->
      <!--          <el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--        </span>-->
      <!--      </el-dialog>-->

      <!--      <el-row>-->
      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-plus" @click="handleAddEditUser">新增
      </el-button>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-download">
        <a href="/file/download?fileName=用户表.xlsx">下载模板</a>
      </el-button>

      <el-upload
        style="display: inline-block;"
        action
        :show-file-list="false"
        :multiple="false"
        accept=".xls, .xlsx"
        :http-request="importFile"

      >
        <!--        ref="upload"-->
        <!--        action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--        :auto-upload="true"--><!--        默认true，自动提交-->
        <!--        :before-upload="beforeUpload"-->
        <!--        :on-success="uploadSuccess"-->
        <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload">批量导入</el-button>
        <!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
        <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->

      </el-upload>

      <!--      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-download">-->
      <!--        <a  :href="'/user/exportUserToExcel?name='+searchForm.name+'&nickName='+searchForm.nickName-->
      <!--        +'&sex='+searchForm.sex+'&accountStatus='+searchForm.accountStatus+'&roleId='+searchForm.roleId+''">导出</a>-->
      <!--      </el-button>-->
      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-download" @click="exportExcel">导出当页数据
      </el-button>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-download" @click="exportAllExcel">导出全部数据
      </el-button>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-delete" @click="handleDeleteUsers">批量删除
      </el-button>
      <!--      </el-row>-->
    </div>

    <el-table
      ref="handSelectTest_multipleTable"
      @row-click="handleRowClick"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--    @sort-change="sortChange"-->
      <!--      :default-sort = "{prop: 'name', order: 'createTime'}"-->
      <el-table-column align="center" label="序号" width="95" :index="table_index"
                       type="index" sortable="true">
        <!--        <template slot-scope="scope">{{ scope.$index }}</template>-->
      </el-table-column>
      <!--      <el-table-column align="center" label="ID" width="95">-->
      <!--        <template slot-scope="scope">{{ scope.row.id }}</template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column label="用户名"  min-width="90px" align="center" sortable :sort-method="sortDevName">-->
      <el-table-column label="用户名" min-width="90px" align="center" prop="name">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.name}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.name }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.nickName}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.nickName}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="avatar" label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>

      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">{{ row.sex }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="年龄" align="center">
        <template slot-scope="{row}">{{ row.age }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="联系方式" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="电子邮箱" width="200" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.email}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.email}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="创建时间" align="center" width="160" sortable prop="createTime">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="更新时间" align="center" width="160" sortable prop="updateTime">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="最新登录时间" align="center" width="160" sortable prop="loginTime">
        <template slot-scope="scope">{{ scope.row.loginTime }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="备注" align="center" width="110">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.ps}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.ps}}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="账号状态" align="center">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="400px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAddEditUser(scope.row,'edit')">
            编辑
          </el-button>

          <el-button size="mini" type="primary" @click="handleAddEditUser(scope.row,'view')">
            详情
          </el-button>

          &nbsp;
          <span v-if="scope.row.status=='启用'">
            <el-button size="mini" type="warning" @click="handleUpdateUserStatus(scope.row)">
            禁用
          </el-button>
          </span>

          <span v-else>
            <el-button size="mini" type="success" @click="handleUpdateUserStatus(scope.row)">
            启用
          </el-button>
          </span>
          &nbsp;
          <el-button size="mini" type="danger" @click="handleDeleteUser(scope.row)">
            删除
          </el-button>

          <el-button size="mini" type="danger" @click="handleResetUser(scope.row)">
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    <div class="block" style="margin-top: 20px;">-->
    <!--      <el-pagination-->
    <!--        @size-change="handleSizeChange"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--        :current-page="currentPage"-->
    <!--        :page-sizes="[10, 20, 50, 100]"-->
    <!--        :page-size="pageSize"-->
    <!--        layout="total, sizes, prev, pager, next, jumper"-->
    <!--        :total="total">-->
    <!--      </el-pagination>-->
    <!--    </div>-->
    <!--    <pagination v-show="total>0" :total="total" :page.sync="this.pageNum" :limit.sync="this.pageSize" @pagination="getList" />-->
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchData"
                ref="handleSizeChange"/>
    <!--    引入组件-->
    <user-add-update-view v-if="dialogFormVisible" ref="userAddUpdateView"
                          @refreshDataList="fetchData"></user-add-update-view>
  </div>
</template>

<script>
  import {
    getList,
    updateUserStatus,
    deleteUser,
    addUsers,
    exportUsers,
    exportAllUsers,
    deleteUsers,
    getRoles,
    resetUser
  } from '@/api/sys'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import userAddUpdateView from '@/views/sys/user/user-add-update-view'
  import { MessageBox } from '_element-ui@2.13.0@element-ui'

  export default {
    name: 'userList',
    data() {
      return {
        value1: [],
        list: null,
        listLoading: true,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        roleList: [],//角色数组
        sexList: [],//性别数组
        accountStatusList: [],//账号状态数组
        currentPage: 1,
        dialogFormVisible: false,//默认不弹窗
        multipleSelection: [],//用于存放选中的数据的id
        searchForm: {
          name: '',
          nickName: '',
          sex: '',
          accountStatus: ''
          // createTime: []//时间数组
          // pageNum: 1,//暂时json
          // pageSize: 10,//暂时json
        },
        dateRange: [],//时间数组
        dataForm: {
          name: '',
          nickName: '',
          password: '',
          sex: '',
          age: '',
          phone: '',
          email: '',
          avatar: '',
          createTime: '',
          updateTime: '',
          loginTime: '',
          ps: '',
          status: ''
        }
      }
    },
    components: { Pagination, userAddUpdateView },
    created() {
      // 获取列表数据
      this.fetchData()

      // 获取角色下拉框
      // getTypeValue('sys_role').then(res => {
      //   this.roleList = res.data
      // })

      // 获取性别下拉框
      this.getTypeValue('sex').then(res => {
        this.sexList = res.data
      })

      // // 获取账号状态下拉框
      this.getTypeValue('account_status').then(res => {
        this.accountStatusList = res.data
      })

      getRoles().then(res => {
        this.roleList = res.data
      })

    },
    methods: {
      table_index(index) {
        return (this.pageNum - 1) * this.pageSize + index + 1
      },
      fetchData() {
        // 请求参数
        this.searchForm.pageNum = this.pageNum
        this.searchForm.pageSize = this.pageSize
        this.searchForm.roleIds = this.value1.toString()

        this.searchForm.createTime = ''
        if (null != this.dateRange && '' != this.dateRange) {
          this.searchForm.createTime = this.dateRange.toString()
        }
        let data = this.searchForm

        // let formData = new FormData()
        // for(let key in data){
        //   formData.append(key,data[key]);
        // }
        // formData.append('pageNum', this.pageNum)
        // formData.append('pageSize', this.pageSize)
        //
        // var jsonData = {};
        // formData.forEach((value, key) => jsonData[key] = value);
        this.listLoading = true
        // getList(formData).then(response => {//这是formData表单请求
        getList(data).then(response => {//这是json字符串请求
          // getList(this.searchForm).then(response => {//这是json字符串请求
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      // 新增/编辑用户
      handleAddEditUser(row, param) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.userAddUpdateView.init(row, param)
        })
      },
      // 导出
      exportExcel() {

        // 请求参数
        // this.searchForm.pageNum = this.pageNum
        // this.searchForm.pageSize = this.pageSize
        let datas = this.searchForm

        // this.listLoading = true
        // getList(formData).then(response => {//这是formData表单请求
        exportUsers(datas).then(data => {
          if (data) {
            //调用成功，在html中创建一个a元素
            let aTag = document.createElement('a')
            //创建一个blob对象
            let blob = new Blob([data], {
              type: 'application/vnd.ms-excel'
            }) // 这个content是下载的文件内容，自己修改
            aTag.download = `用户表.xlsx` // 下载的文件名
            // aTag.style.display = "none";
            aTag.href = window.URL.createObjectURL(blob) //创建一个URL对象
            document.body.appendChild(aTag)
            aTag.click()
            window.URL.revokeObjectURL(blob) //释放URL对象
            document.body.removeChild(aTag)
          } else {
          }
        })
      },
      // 导出全部数据
      exportAllExcel() {

        // 请求参数
        // this.searchForm.pageNum = this.pageNum
        // this.searchForm.pageSize = this.pageSize
        let datas = this.searchForm

        // this.listLoading = true
        // getList(formData).then(response => {//这是formData表单请求
        exportAllUsers(datas).then(data => {
          if (data) {
            //调用成功，在html中创建一个a元素
            let aTag = document.createElement('a')
            //创建一个blob对象
            let blob = new Blob([data], {
              type: 'application/vnd.ms-excel'
            }) // 这个content是下载的文件内容，自己修改
            aTag.download = `用户表.xlsx` // 下载的文件名
            // aTag.style.display = "none";
            aTag.href = window.URL.createObjectURL(blob) //创建一个URL对象
            document.body.appendChild(aTag)
            aTag.click()
            window.URL.revokeObjectURL(blob) //释放URL对象
            document.body.removeChild(aTag)
          } else {
          }
        })
      },

      //禁用0、启用1
      handleUpdateUserStatus(row) {
        let status = ''
        if (row.status == '启用') {
          status = '0'//传给后端，0表示禁用
        } else if (row.status == '禁用') {
          status = '1'//传给后端，1表示启用
        }

        let params = {
          id: row.id,
          status: status
        }
        updateUserStatus(params).then((data) => {
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
      },

      //删除用户
      handleDeleteUser(row) {
        let params = {
          id: row.id
        }
        this.$confirm(
          `确定删除该用户?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            deleteUser(params).then((data) => {
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
          })
      },

      beforeUpload(file) {
        //判断文件格式
        let hz = file.name.split('.')[1]
        if (hz != 'xlsx' && hz != 'xls') {
          this.$alert('只能上传EXCEL文件！')
          return false
        }
      },
      uploadSuccess(response) {
        if (response.respCode == 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$store.dispatch('teacher/getTeacherList', this.infoQ)
        } else {
          this.$alert('添加失败!' + response.message)
        }
      },
      // 导入
      importFile(param) {
        let uploadData = new FormData()
        uploadData.append('file', param.file)
        addUsers(uploadData).then((data) => {
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
      },
      //获得选中的行的id
      handleSelectionChange(val) {
        this.multipleSelection = []
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].id)
        }
      },
      handleDeleteUsers() {
        if(this.multipleSelection.length==0){
          MessageBox.confirm('请选择至少一条数据', '批量删除数据', {
            type: 'warning'
          })
          return
        }
        deleteUsers({ ids: (this.multipleSelection) + '' }).then(data => {
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
      },
      //点击表格一行数据触发
      handleRowClick(row, column, event) {
        this.$refs.handSelectTest_multipleTable.toggleRowSelection(row)
      },
      // 重置密码
      handleResetUser(row) {
        let params = {
          id: row.id
        }
        this.$confirm(
          `确定重置该用户密码?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            resetUser(params).then(data => {
              if (data.code == '20000') {
                // this.$notify({
                //   title: '成功',
                //   message: data.message,
                //   type: 'success',
                //   duration: 2000
                // })
                this.$message({
                  message: data.message,
                  type: "success",
                  duration: 3000,
                  onClose: () => {
                    this.fetchData()
                  }
                });



              } else {
                this.$notify({
                  title: '失败',
                  message: data.message,
                  type: 'error',
                  duration: 2000
                })
              }
            })
          })
      }
    },
    watch: {
      total() {
        if (this.total == (this.pageNum - 1) * this.pageSize && this.total != 0) {
          this.pageNum -= 1
          this.fetchData()//获取列表数据
        }
      }
    }

  }
</script>
<style lang="scss" scoped>
  .m-add-btn {
    margin-bottom: 10px;
  }

  .m-popover {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
