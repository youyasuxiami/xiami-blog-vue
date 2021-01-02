<template>
  <div class="app-container">
    <div>
      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-plus" @click="handleAddEditUser">新增
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      show-checkbox
      highlight-current-row
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
    >
      <el-table-column label="菜单名称" min-width="150px" align="center" prop="name" >
      </el-table-column>

      <el-table-column label="菜单ID" align="center" >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.id}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.id}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="菜单路径" align="center" min-width="200px">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.url}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.url}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="菜单类型" width="100px" align="center">
        <template slot-scope="scope">
            <el-tag v-if="scope.row.type == '0'" type=""effect="dark">一级菜单</el-tag>
            <el-tag v-if="scope.row.type == '1'" type="success"effect="dark">二级菜单</el-tag>
            <el-tag v-if="scope.row.type == '2'" type="warning"effect="dark">三级菜单</el-tag>
            <el-tag v-if="scope.row.type == '3'" type="warning"effect="dark">按钮</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="菜单图标" align="center" width="200">
        <template slot-scope="{row}">{{ row.icon }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="授权标识" width="300" align="center">
        <template slot-scope="scope">{{ scope.row.perms }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="排序号" align="center" width="160"  prop="createTime">
        <template slot-scope="scope">{{ scope.row.orderNum }}</template>
      </el-table-column>


      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAddEditUser(scope.row,'edit')">
            编辑
          </el-button>

          <el-button size="mini" type="warning" @click="handleAddEditUser(scope.row,'view')">
            详情
          </el-button>
          &nbsp;
          <el-button size="mini" type="danger" @click="handleDeleteUser(scope.row)">
            删除
          </el-button>


        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchData"
                ref="handleSizeChange"/>
    <!--    引入组件-->
    <menu-add-update-view v-if="dialogFormVisible" ref="userAddUpdateView"
                          @refreshDataList="fetchData"></menu-add-update-view>
  </div>
</template>

<script>
  import { getMenuList,deleteMenu } from '@/api/sys'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import menuAddUpdateView from '@/views/sys/menu/menu-add-update-view'
  // import {updateUserStatus, deleteUser,addUsers} from '@/api/sys'

  export default {
    name:'menuList',
    data() {
      return {
        list: [],
        listLoading: true,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        roleList: [],//角色数组
        sexList: [],//性别数组
        accountStatusList: [],//账号状态数组
        currentPage: 1,
        dialogFormVisible: false,//默认不弹窗
        searchForm: {
        },
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
    components: { Pagination, menuAddUpdateView },
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

        this.listLoading = true
        getMenuList(data).then(response => {//这是json字符串请求
          this.list = response.data.data
          localStorage.setItem("accessRoutes", JSON.stringify(this.list));
          let accessRoutes=JSON.parse(localStorage.getItem("accessRoutes"))
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
          `确定提交操作?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            deleteMenu(params).then((data) => {
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
                  duration: 4000
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
