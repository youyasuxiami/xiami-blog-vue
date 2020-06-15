<template>
  <div class="app-container">
    <div>

      <el-form ref="form" :model="searchForm" label-width="80px" size="mini" :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="searchForm.nickName" clearable></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="searchForm.roleId" placeholder="请选择" clearable>
            <el-option :label="item.value" :value="item.code" v-for="item in roleList"
                       :key="item.index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="searchForm.sex" placeholder="请选择" clearable>
            <el-option :label="item.value" :value="item.code" v-for="item in sexList"
                       :key="item.index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账号状态">
          <el-select v-model="searchForm.accountStatus" placeholder="请选择" clearable>
            <el-option :label="item.value" :value="item.code" v-for="item in accountStatusList"
                       :key="item.index"></el-option>
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
            v-model="searchForm.createTime"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData()" size="mini">
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <!--      <el-row>-->
      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-plus" @click="handleAddEditUser">新增
      </el-button>
      <!--      </el-row>-->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    @sort-change="sortChange"
    >
<!--      :default-sort = "{prop: 'name', order: 'createTime'}"-->
      <el-table-column align="center" label="序号" width="95" :index="table_index"
                       type="index" sortable="true">
        <!--        <template slot-scope="scope">{{ scope.$index }}</template>-->
      </el-table-column>
      <!--      <el-table-column align="center" label="ID" width="95">-->
      <!--        <template slot-scope="scope">{{ scope.row.id }}</template>-->
      <!--      </el-table-column>-->

<!--      <el-table-column label="用户名"  min-width="90px" align="center" sortable :sort-method="sortDevName">-->
      <el-table-column label="用户名"  min-width="90px" align="center" prop="name" sortable="custom">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.name}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.name }}
            </div>
          </el-popover>
        </template>'
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
          <img  :src="scope.row.avatar" alt="" style="width: 50px;height: 50px">
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

      <el-table-column class-name="status-col" label="创建时间" align="center" width="160" sortable  prop="createTime">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="更新时间" align="center" width="160" sortable  prop="updateTime">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="最新登录时间" align="center" width="160" sortable  prop="loginTime">
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
      <el-table-column label="操作" align="center" width="320" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAddEditUser(scope.row,'edit')">
            编辑
          </el-button>

          <el-button size="mini" type="primary"@click="handleAddEditUser(scope.row,'view')">
            详情
          </el-button>

          &nbsp;
          <span v-if="scope.row.status=='启用'">
            <el-button size="mini" type="warning">
            禁用
          </el-button>
          </span>

          <span v-else>
            <el-button size="mini" type="success">
            启用
          </el-button>
          </span>
          &nbsp;


          <el-button size="mini" type="danger">
            删除
          </el-button>



            <!--                        年度计划申请的按钮-->
<!--            <div v-if="type!='7'&&type!='2'&&type!='3'">-->
<!--              &nbsp;-->
<!--              <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">查看-->
<!--              </el-button>-->

<!--              &nbsp;-->
<!--              <span v-if="scope.row.statusName=='已归档'">-->
<!--                                    <el-button size="mini" type="primary" @click="handleReset(scope.$index, scope.row)">-->
<!--                                        变更-->
<!--                                    </el-button>-->
<!--                                </span>-->
<!--              <span v-if="scope.row.statusName=='已保存' ||scope.row.statusName=='退回'">-->
<!--                                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">-->
<!--                                        编辑-->
<!--                                    </el-button>-->
<!--                            </span>-->
<!--              &nbsp;-->
<!--              <el-button size="mini" type="primary" @click="handleChart(scope.$index, scope.row)">流程图-->
<!--              </el-button>-->
<!--            </div>-->



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
    <user-add-update-view v-if="dialogFormVisible" ref="userAddUpdateView" @refreshDataList="fetchData"></user-add-update-view>
  </div>
</template>

<script>
  import { getList } from '@/api/sys'
  import { getTypeValue } from '@/utils/dictionary'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import userAddUpdateView from '@/views/sys/user/user-add-update-view'

  export default {
    data() {
      return {
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
      getTypeValue('sys_role').then(res => {
        this.roleList = res.data
      })

      // 获取性别下拉框
      getTypeValue('sex').then(res => {
        this.sexList = res.data
      })

      // // 获取账号状态下拉框
      getTypeValue('account_status').then(res => {
        this.accountStatusList = res.data
      })

    },
    methods: {
      sortDevName(str1, str2) {
        let res = 0
        for (let i = 0; ;i++) {
          if (!str1[i] || !str2[i]) {
            res = str1.length - str2.length
            break
          }
          const char1 = str1[i]
          const char1Type = this.getChartType(char1)
          const char2 = str2[i]
          const char2Type = this.getChartType(char2)
          // 类型相同的逐个比较字符
          if (char1Type[0] === char2Type[0]) {
            if (char1 === char2) {
              continue
            } else {
              if (char1Type[0] === 'zh') {
                res = char1.localeCompare(char2)
              } else if (char1Type[0] === 'en') {
                res = char1.charCodeAt(0) - char2.charCodeAt(0)
              } else {
                res = char1 - char2
              }
              break
            }
          } else {
            // 类型不同的，直接用返回的数字相减
            res = char1Type[1] - char2Type[1]
            break
          }
        }
        return res
      },

      table_index(index) {
        return (this.pageNum - 1) * this.pageSize + index + 1
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
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
        getList(data).then(response => {//这是json字符串请求
          // getList(this.searchForm).then(response => {//这是json字符串请求
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      // 新增/编辑用户
      handleAddEditUser(row,param) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.userAddUpdateView.init(row,param)
        })
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
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
