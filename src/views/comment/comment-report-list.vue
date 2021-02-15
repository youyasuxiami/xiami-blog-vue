<template>
  <div class="app-container">
    <div>
      <el-form ref="form"
               :model="searchForm"
               size="mini"
               :inline="true"
               @keyup.enter.native="fetchData"
      >
        <el-form-item label="举报人的用户名" label-width="120px"
        >
          <el-input v-model="searchForm.reportUserName" clearable></el-input>
        </el-form-item>

        <el-form-item label="被举报人的用户名" label-width="130px"
        >
          <el-input v-model="searchForm.reportToUserName" clearable></el-input>
        </el-form-item>

        <el-form-item label="被举报的评论内容" label-width="140px">
          <el-input v-model="searchForm.reportCommentContent" clearable></el-input>
        </el-form-item>

        <el-form-item label="举报的原因" label-width="120px">
          <el-input v-model="searchForm.reason" clearable></el-input>
        </el-form-item>

        <el-form-item label="进展状态" label-width="120px">
          <el-select v-model="searchForm.statusId" placeholder="请选择" clearable>
            <el-option :label="item.value" :value="item.code" v-for="(item,index) in statusList"
                       :key="item.index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" prop="yearApply" label-width="130px">
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
    </div>

    <div style="width: 100%;border: 1px solid #e5e5e5;margin: 10px 0">
    </div>

    <el-table
      ref="handSelectTest_multipleTable"
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

      <el-table-column label="举报人id" min-width="120px" align="center" prop="reportUserId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.reportUserId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.reportUserId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="被举报人id" min-width="140px" align="center" prop="reportToUserId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.reportToUserId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.reportToUserId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="举报人用户名" min-width="120px" align="center" prop="reportUserName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.reportUserName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.reportUserName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="被举报人用户名" min-width="140px" align="center" prop="reportToUserName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.reportToUserName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.reportToUserName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="被举报的评论id" min-width="120px" align="center" prop="reportCommentId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.reportCommentId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.reportCommentId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="被举报的评论内容" min-width="140px" align="center" prop="reportCommentContent">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.reportCommentContent}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.reportCommentContent }}
            </div>
          </el-popover>
        </template>
      </el-table-column>


      <el-table-column label="举报原因" min-width="120px" align="center" prop="reason">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.reason}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.reason }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="进展状态" min-width="120px" align="center" prop="progressStatusName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.progressStatusName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.progressStatusName }}
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

      <el-table-column label="操作" align="center" width="240px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleChangeStatus(scope.row, 1)" v-if="scope.row.progressStatusName!='举报成功'">
            举报通过
          </el-button>
          <el-button size="mini" type="danger" @click="handleChangeStatus(scope.row, 2)" v-if="scope.row.progressStatusName!='举报不通过'">
            举报不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchData"
                ref="handleSizeChange"/>
    <!--    引入组件-->
    <blog-add-update-view v-if="dialogFormVisible" ref="blogAddUpdateView"
                          @refreshDataList="fetchData"></blog-add-update-view>
  </div>
</template>

<script>
  import { getCommentReportList} from '@/api/comment'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import blogAddUpdateView from '@/views/blog/blog-add-update-view'
  import { updateProgressStatusName } from '@/api/comment'

  export default {
    name: 'blogList',
    data() {
      return {
        list: null,
        listLoading: true,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        roleList: [],//角色数组
        sexList: [],//性别数组
        statusList: [],//账号状态数组
        currentPage: 1,
        dialogFormVisible: false,//默认不弹窗
        multipleSelection: [],//用于存放选中的数据的id
        dateRange: [],//创建时间的数组

        searchForm: {
          reportUserName: '',
          reportToUserName: '',
          content: '',
          typeId: '',
          statusId: ''
        }
      }
    },
    components: { Pagination, blogAddUpdateView },
    created() {
      // 获取列表数据
      this.fetchData()

      this.getTypeValue('progress_status').then(res => {
        this.statusList = res.data
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

        //数组时间
        this.searchForm.beginTime = ''
        this.searchForm.endTime = ''
        if (null != this.dateRange && '' != this.dateRange) {
          this.searchForm.beginTime = this.dateRange[0]
          this.searchForm.endTime = this.dateRange[1]
        }
        this.listLoading = true
        getCommentReportList(this.searchForm).then(response => {//这是json字符串请求
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      //改变状态
      handleChangeStatus(row, index) {

        let params = {
          id: row.id,
          status: index
        }
        updateProgressStatusName(params).then((data) => {
          if (data.data.code == '20000') {
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
