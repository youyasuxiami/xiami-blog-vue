<template>
  <div class="app-container">
    <div>

      <el-form ref="form" :model="searchForm" label-width="80px" size="mini" :inline="true" @keyup.enter.native="fetchData">
        <el-form-item label="任务名称">
          <el-input v-model="searchForm.jobName" clearable></el-input>
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
<!--        <el-form-item label="创建时间" prop="yearApply">-->
<!--          <el-date-picker-->
<!--            v-model="dateRange"-->
<!--            type="daterange"-->
<!--            format="yyyy-MM-dd"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            range-separator="至"-->
<!--            start-placeholder="开始日期"-->
<!--            end-placeholder="结束日期">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->


        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData" size="mini">
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-plus" @click="handleAddEditJob">新增
      </el-button>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-delete" @click="handleDeleteJobs">批量删除
      </el-button>
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

      <el-table-column label="任务编号" min-width="90px" align="center" prop="id">
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

      <el-table-column label="任务名称" min-width="90px" align="center" prop="jobName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.jobName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.jobName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="任务组名" min-width="90px" align="center" prop="jobGroup">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.jobGroup}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.jobGroup }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column label="触发器名称" min-width="120px" align="center" prop="triggerName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.triggerName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.triggerName }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column label="触发器组别" min-width="120px" align="center" prop="triggerGroup">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.triggerGroup}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.triggerGroup }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

<!--      <el-table-column label="任务类型" min-width="90px" align="center" prop="jobType">-->
<!--        <template slot-scope="scope">-->
<!--          <el-popover trigger="hover" placement="top" align="center">-->
<!--            <span>{{scope.row.jobType}}</span>-->
<!--            <div slot="reference" class="m-popover">-->
<!--              {{ scope.row.jobType }}-->
<!--            </div>-->
<!--          </el-popover>-->
<!--        </template>-->
<!--        '-->
<!--      </el-table-column>-->

      <el-table-column label="定时任务全路径" min-width="200px" align="center" prop="executePath">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.executePath}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.executePath }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

<!--      <el-table-column label="执行参数" min-width="90px" align="center" prop="paramsValue">-->
<!--        <template slot-scope="scope">-->
<!--          <el-popover trigger="hover" placement="top" align="center">-->
<!--            <span>{{scope.row.paramsValue}}</span>-->
<!--            <div slot="reference" class="m-popover">-->
<!--              {{ scope.row.paramsValue }}-->
<!--            </div>-->
<!--          </el-popover>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column label="cron表达式" min-width="150px" align="center" prop="cronExpression">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.cronExpression}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.cronExpression }}
            </div>
          </el-popover>
        </template>
        '
      </el-table-column>

      <el-table-column class-name="status-col" label="创建时间" align="center" width="160" sortable prop="createTime">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="更新时间" align="center" width="160" sortable prop="updateTime">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="上次执行时间" align="center" width="160" sortable prop="previousTime">
        <template slot-scope="scope">{{ scope.row.previousTime }}</template>
      </el-table-column>


      <el-table-column class-name="status-col" label="下次执行时间" align="center" width="160" sortable prop="nextTime">
        <template slot-scope="scope">{{ scope.row.nextTime }}</template>
      </el-table-column>

      <el-table-column label="备注" min-width="150px" align="center" prop="remarks">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.remarks}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.remarks }}
            </div>
          </el-popover>
        </template>
      </el-table-column>


      <el-table-column class-name="status-col" label="任务状态" align="center" prop="jobStatusName">
        <template slot-scope="scope">{{ scope.row.jobStatusName }}</template>
      </el-table-column>

      <el-table-column label="操作" align="left" width="320" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAddEditJob(scope.row,'edit')" v-if="scope.row.jobStatusName=='未发布'">
            编辑
          </el-button>

          <el-button size="mini" type="primary" @click="handleAddEditJob(scope.row,'view')">
            详情
          </el-button>
          &nbsp;
          <el-button size="mini" type="primary" @click="handleDeleteJob(scope.row)">
            删除
          </el-button>

          <el-button size="mini" type="primary" @click="handleStartJob(scope.row)" v-if="scope.row.jobStatusName=='未发布'">
            立即运行
          </el-button>

          <el-button size="mini" type="danger" @click="handleStopJob(scope.row)"v-if="scope.row.jobStatusName=='正在运行'">
            停止
          </el-button>

<!--          <el-button size="mini" type="success" @click="handleResumeJob(scope.row)" v-if="scope.row.jobStatusName=='暂停'">-->
<!--            恢复-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchData"
                ref="handleSizeChange"/>
    <!--    引入组件-->
    <job-add-update-view v-if="dialogFormVisible" ref="jobAddUpdateView" @refreshDataList="fetchData">

    </job-add-update-view>
  </div>
</template>

<script>
  import {
    getJobList,
    updateUserStatus,
    deleteJob,
    deleteJobs,
    startJob,
    stopJob,
    resumeJob
  } from '@/api/monitor/job'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import jobAddUpdateView from '@/views/monitor/job/job-add-update-view'
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
          // name: '',
          // nickName: '',
          // sex: '',
          // accountStatus: '',
          jobName:''
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
    components: { Pagination, jobAddUpdateView },
    created() {
      // 获取列表数据
      this.fetchData()

      // 获取性别下拉框
      this.getTypeValue('sex').then(res => {
        this.sexList = res.data
      })

      // // 获取账号状态下拉框
      this.getTypeValue('account_status').then(res => {
        this.accountStatusList = res.data
      })
    },
    methods: {
      fetchData() {
        // 请求参数
        this.searchForm.pageNum = this.pageNum
        this.searchForm.pageSize = this.pageSize
        // this.searchForm.roleIds = this.value1.toString()

        // this.searchForm.createTime = ''
        // if (null != this.dateRange && '' != this.dateRange) {
        //   this.searchForm.createTime = this.dateRange.toString()
        // }
        let data = this.searchForm

        this.listLoading = true
        getJobList(data).then(response => {//这是json字符串请求
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      // 新增/编辑定时任务
      handleAddEditJob(row, param) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.jobAddUpdateView.init(row, param)
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

      //删除定时任务
      handleDeleteJob(row) {
        let params = {
          id: row.id,
          jobName:row.jobName,
          jobGroup:row.jobGroup
        }
        this.$confirm(
          `确定删除该定时任务?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            deleteJob(params).then((data) => {
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
      handleStartJob(row){
        startJob({
          id:row.id,
          jobName:row.jobName,
          jobGroup:row.jobGroup,
          cronExpression:row.cronExpression,
          executePath:row.executePath,
          triggerName:row.triggerName,
          triggerGroup:row.triggerGroup
        }).then(data=>{
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

      /**
       * 停止
       */
      handleStopJob(row){
        stopJob({
          id:row.id,
          jobName:row.jobName,
          jobGroup:row.jobGroup
        }).then(data=>{
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
      /**
       * 恢复
       * @param row
       */
      // handleResumeJob(row){
      //   resumeJob({
      //     id:row.id,
      //     jobName:row.jobName,
      //     jobGroup:row.jobGroup
      //   }).then(data=>{
      //     if (data.code == '20000') {
      //       this.$notify({
      //         title: '成功',
      //         message: data.message,
      //         type: 'success',
      //         duration: 2000
      //       })
      //       this.fetchData()
      //
      //     } else {
      //       this.$notify({
      //         title: '失败',
      //         message: data.message,
      //         type: 'error',
      //         duration: 2000
      //       })
      //     }
      //
      //   })
      //
      // },

      //获得选中的行的id
      handleSelectionChange(val) {
        this.multipleSelection = []
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].id)
        }
      },
      handleDeleteJobs() {
        if(this.multipleSelection.length==0){
          MessageBox.confirm('请选择至少一条数据', '批量删除数据', {
            type: 'warning'
          })
          return
        }
        deleteJobs({ ids: (this.multipleSelection) + '' }).then(data => {
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
