<template>
  <div class="app-container">
    <div>
      <el-form ref="form"
               :model="searchForm"
               size="mini"
               :inline="true"
               @keyup.enter.native="fetchData"
      >
        <el-form-item label="回复者的用户名" label-width="120px"
        >
          <el-input v-model="searchForm.userName" clearable></el-input>
        </el-form-item>

        <el-form-item label="被回复者的用户名" label-width="130px"
        >
          <el-input v-model="searchForm.toUserName" clearable></el-input>
        </el-form-item>

        <el-form-item label="内容" label-width="80px">
          <el-input v-model="searchForm.content" clearable></el-input>
        </el-form-item>

        <el-form-item label="评论类型" label-width="80px">
          <el-select v-model="searchForm.typeId" placeholder="请选择" clearable>
            <el-option label="评论" value="0"></el-option>
            <el-option label="点赞" value="1"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="审核状态" label-width="120px">
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
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        width="55">-->
<!--      </el-table-column>-->
      <el-table-column align="center" label="序号" width="95" :index="table_index"
                       type="index" sortable="true">
      </el-table-column>

      <el-table-column label="一级评论的id" min-width="120px" align="center" prop="firstCommentId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.firstCommentId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.firstCommentId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="上一级的评论id" min-width="120px" align="center" prop="parentCommentId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.parentCommentId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.parentCommentId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="回复者的用户id" min-width="120px" align="center" prop="userId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.userId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.userId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="被回复者的用户id" min-width="120px" align="center" prop="toUserId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.toUserId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.toUserId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="回复者的用户名" min-width="120px" align="center" prop="userName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.userName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.userName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="被回复者的用户名" min-width="120px" align="center" prop="toUserName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.toUserName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.toUserName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="avatar" label="回复者的头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.userAvatar" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>

      <el-table-column prop="avatar" label="被回复者的头像" align="center">
        <template slot-scope="scope" v-if="scope.row.toUserAvatar">
          <img :src="scope.row.toUserAvatar" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>

      <el-table-column label="评论内容" min-width="120px" align="center" prop="content">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.content}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.content }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="博客id" min-width="120px" align="center" prop="blogId">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.blogId}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.blogId }}
            </div>
          </el-popover>
        </template>
      </el-table-column>


      <el-table-column label="点赞数" min-width="120px" align="center" prop="likes">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.likes}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.likes }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="评论类型" min-width="120px" align="center" prop="type">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.type}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.type }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="审核状态" min-width="120px" align="center" prop="status">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.status}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.status }}
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
          <el-button size="mini" type="danger" @click="handleChangeStatus(scope.row, 0)" v-if="scope.row.status!='删除'">
            删除
          </el-button>

          <el-button size="mini" type="primary" @click="handleChangeStatus(scope.row, 1)" v-if="scope.row.status!='激活'">
            激活
          </el-button>

          <el-button size="mini" type="warning" @click="handleChangeStatus(scope.row, 2)" v-if="scope.row.status!='冻结'">
            冻结
          </el-button>

          <el-button size="mini" type="success" @click="handleChangeStatus(scope.row, 3)" v-if="scope.row.status!='置顶'">
            置顶
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
  import {
    getList
  } from '@/api/comment'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import blogAddUpdateView from '@/views/blog/blog-add-update-view'
  import { updateCommentStatus } from '@/api/comment'

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
          userName: '',
          toUserName: '',
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

      this.getTypeValue('comment_status').then(res => {
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
        getList(this.searchForm).then(response => {//这是json字符串请求
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
        updateCommentStatus(params).then((data) => {
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
