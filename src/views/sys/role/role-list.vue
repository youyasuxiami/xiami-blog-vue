<template>
  <div class="app-container">
    <div>

      <el-form ref="form" :model="searchForm" label-width="80px" size="mini" :inline="true"
               @keyup.enter.native="fetchData"
      >
        <el-form-item label="角色名称">
          <el-input v-model="searchForm.roleName" clearable></el-input>
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input v-model="searchForm.roleDesc" clearable></el-input>
        </el-form-item>



<!--        <el-form-item label="创建时间" prop="yearApply">-->
<!--          <el-date-picker-->
<!--            v-model="searchForm.createTime"-->
<!--            type="daterange"-->
<!--            format="yyyy-MM-dd"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始日期"-->
<!--            end-placeholder="结束日期">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->


        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData()" size="mini">
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-plus" @click="handleAddEditRole">新增
      </el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95" :index="table_index"
                       type="index" sortable="true">
      </el-table-column>

      <el-table-column label="角色名称" min-width="90px" align="center" prop="name">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.roleName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.roleName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="角色描述" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.roleDesc}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.roleDesc}}
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

      <el-table-column label="操作" align="center" width="320" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button size="mini" type="primary" @click="handleAddEditRole(scope.row,'edit')">
            编辑
          </el-button>

          <el-button size="mini" type="warning" @click="handleAddEditRole(scope.row,'view')">
            详情
          </el-button>
          &nbsp;
          <el-button size="mini" type="danger" @click="handleDeleteRole(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchData"
                ref="handleSizeChange"/>
    <!--    引入组件-->
    <role-add-update-view v-if="dialogFormVisible" ref="roleAddUpdateView"
                          @refreshDataList="fetchData"></role-add-update-view>
  </div>
</template>

<script>
  import {getRoleList,deleteRole} from '@/api/sys'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import roleAddUpdateView from '@/views/sys/role/role-add-update-view'
  import {updateUserStatus, deleteUser,addUsers} from '@/api/sys'

  export default {
    name:'roleList',
    data() {
      return {
        list: null,
        listLoading: true,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        currentPage: 1,
        dialogFormVisible: false,//默认不弹窗
        searchForm: {
          name: '',
          nickName: '',
          roleId: '',
          sex: '',
          accountStatus: '',
          createTime: []//时间数组
          // pageNum: 1,//暂时json
          // pageSize: 10,//暂时json
        },
        dataForm: {
          roleName: '',
          roleDesc: '',
          createTime: '',
          updateTime: '',
          loginTime: '',
        }
      }
    },
    components: {Pagination, roleAddUpdateView},
    created() {
      // 获取列表数据
      this.fetchData()
    },
    methods: {
      table_index(index) {
        return (this.pageNum - 1) * this.pageSize + index + 1
      },
      fetchData() {
        // 请求参数
        this.searchForm.pageNum = this.pageNum
        this.searchForm.pageSize = this.pageSize
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
        getRoleList(data).then(response => {//这是json字符串请求
          // getList(this.searchForm).then(response => {//这是json字符串请求
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      // 新增/编辑角色
      handleAddEditRole(row, param) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.roleAddUpdateView.init(row, param)
        })
      },
      // 导出
      exportExcel(){

        // 请求参数
        // this.searchForm.pageNum = this.pageNum
        // this.searchForm.pageSize = this.pageSize
        let datas = this.searchForm

        // this.listLoading = true
        // getList(formData).then(response => {//这是formData表单请求
        exportUsers(datas).then(data => {
          if (data) {
            //调用成功，在html中创建一个a元素
            let aTag = document.createElement("a");
            //创建一个blob对象
            let blob = new Blob([data], {
              type: "application/vnd.ms-excel"
            }); // 这个content是下载的文件内容，自己修改
            aTag.download = `用户表.xlsx`; // 下载的文件名
            // aTag.style.display = "none";
            aTag.href = window.URL.createObjectURL(blob); //创建一个URL对象
            document.body.appendChild(aTag);
            aTag.click();
            window.URL.revokeObjectURL(blob); //释放URL对象
            document.body.removeChild(aTag);
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
      handleDeleteRole(row) {

        let params = {
          id: row.id
        }
        this.$confirm(
          `确定删除该角色?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            deleteRole(params).then((data) => {
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
        let hz = file.name.split(".")[1];
        if (hz != "xlsx" && hz != "xls") {
          this.$alert("只能上传EXCEL文件！");
          return false;
        }
      },
      uploadSuccess(response) {
        if (response.respCode == 0) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.$store.dispatch("teacher/getTeacherList", this.infoQ);
        } else {
          this.$alert("添加失败!" + response.message);
        }
      },
      // 导入
      importFile(param) {
          let uploadData = new FormData();
          uploadData.append("file", param.file)
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
      }
    },
    watch:{
      total(){
        if(this.total==(this.pageNum-1)*this.pageSize&& this.total!=0){
          this.pageNum-=1;
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
