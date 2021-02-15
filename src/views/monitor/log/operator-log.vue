<template>
  <div class="app-container">
    <div>

      <el-form ref="form" :model="searchForm" label-width="80px" size="mini" :inline="true" @keyup.enter.native="fetchData">
        <el-form-item label="日志标题">
          <el-input v-model="searchForm.title" clearable></el-input>
        </el-form-item>

        <el-form-item label="操作地点">
          <el-input v-model="searchForm.operAddr" clearable></el-input>
        </el-form-item>

        <el-form-item label="操作人员">
          <el-input v-model="searchForm.operName" clearable></el-input>
        </el-form-item>

        <!--        <el-form-item label="昵称">-->
        <!--          <el-input v-model="searchForm.nickName" clearable></el-input>-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="角色">-->
        <!--          <el-select v-model="value1" multiple placeholder="请选择" style="width: 360px;">-->
        <!--            <el-option-->
        <!--              v-for="item in roleList"-->
        <!--              :key="item.id"-->
        <!--              :label="item.roleName"-->
        <!--              :value="item.id">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="性别">-->
        <!--          <el-select v-model="searchForm.sex" placeholder="请选择" clearable>-->
        <!--            <el-option :label="item.value" :value="item.code" v-for="item in sexList"-->
        <!--                       :key="item.index1"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="账号状态">-->
        <!--          <el-select v-model="searchForm.accountStatus" placeholder="请选择" clearable>-->
        <!--            <el-option :label="item.value" :value="item.code" v-for="item in accountStatusList"-->
        <!--                       :key="item.index1"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
                <el-form-item label="创建时间" prop="yearApply">
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


<!--      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-delete" @click="handledeleteLogs">批量删除-->
<!--      </el-button>-->
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

      <el-table-column label="日志编号" min-width="90px" align="center" prop="id">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.id}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.id }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column label="日志标题" min-width="90px" align="center" prop="title">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.title}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.title }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column label="请求类型" min-width="90px" align="center" prop="method">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.method}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.method }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column label="请求URL" min-width="150px" align="center" prop="operUrl">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.operUrl}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.operUrl }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="主机地址" min-width="150px" align="center" prop="operIp">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.operIp}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.operIp }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作地点" min-width="120px" align="center" prop="operAddr">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.operAddr}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.operAddr }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作人员" min-width="90px" align="center" prop="operName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.operName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.operName }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column label="操作状态" min-width="90px" align="center" prop="status" :formatter="statusFormat">
      </el-table-column>

      <el-table-column label="错误消息" min-width="150px" align="center" prop="errorMsg">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.errorMsg}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.errorMsg }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="用户代理" min-width="90px" align="center" prop="userAgent">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.userAgent}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.userAgent }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>



      <el-table-column class-name="status-col" label="操作时间" align="center" width="160" sortable prop="operTime">
        <template slot-scope="scope">{{ scope.row.operTime }}</template>
      </el-table-column>

      <el-table-column label="操作" align="left"  class-name="small-padding fixed-width" width="160px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetailLog(scope.row)">
            详情
          </el-button>
<!--          <el-button size="mini" type="primary" @click="handleDeleteLog(scope.row)">-->
<!--            删除-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="fetchData"
                ref="handleSizeChange"/>

    <!--    引入组件-->
    <operator-log-detail v-if="dialogFormVisible" ref="detailLogView" @refreshDataList="fetchData">

    </operator-log-detail>

  </div>
</template>

<script>
  import {
    getOperatorLogList,
    deleteLog,
    deleteLogs
  } from '@/api/monitor/operator'
  import Pagination from '@/components/Pagination/index'
  import operatorLogDetail from '@/views/monitor/log/operator-log-detail'
  import { MessageBox } from '_element-ui@2.13.0@element-ui'
  import store from '@/store'

  export default {
    name: 'userList',
    data() {
      return {
        value1: [],
        list: null,
        listLoading: true,
        total: 0,
        logStatusList: [],//操作日志状态数组
        currentPage: 1,
        multipleSelection: [],//用于存放选中的数据的id
        searchForm: {
          // 请求参数
          pageNum : 1,
          pageSize : 10,
          title:"",
          operName:'',
          operAddr:''
        },
        dateRange: [],//时间数组
        dialogFormVisible: false//默认不弹窗
      }
    },
    components: { Pagination, operatorLogDetail },
    created() {
      // 获取列表数据
      this.fetchData()

      //获取日志操作状态的字典翻译数据
      this.getTypeValue('operator_log_status').then(res => {
        this.logStatusList = res.data
      })
    },
    methods: {
      fetchData() {
        this.searchForm.createTime = ''
        if (null != this.dateRange && '' != this.dateRange) {
          this.searchForm.createTime = this.dateRange.toString()
        }
        let data = this.searchForm

        this.listLoading = true
        getOperatorLogList(data).then(response => {//这是json字符串请求
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      handleDetailLog(row) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.detailLogView.init(row)
        })
      },

      //删除操作日志
      handleDeleteLog(row) {
        let params = {
          id: row.id
        }
        this.$confirm(
          `确定删除该日志?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            deleteLog(params).then((data) => {
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

      //获得选中的行的id
      handleSelectionChange(val) {
        this.multipleSelection = []
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].id)
        }
      },

      handledeleteLogs() {
        if(this.multipleSelection.length==0){
          MessageBox.confirm('请选择至少一条数据', '批量删除数据', {
            type: 'warning'
          })
          return
        }
        deleteLogs({ ids: (this.multipleSelection) + '' }).then(data => {
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

      // 翻译表格
      statusFormat(row, column) {
        return this.selectDictLabel(this.logStatusList, row.status);
      }
    },
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
