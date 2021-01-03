<template>
  <div class="app-container">
    <div>

      <el-form ref="form" :model="searchForm" label-width="80px" size="mini" :inline="true" @keyup.enter.native="fetchData">
        <el-form-item label="标签名称">
          <el-input v-model="searchForm.tagName" clearable></el-input>
        </el-form-item>

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

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-plus" @click="handleAddEditTag">新增
      </el-button>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-delete" @click="handleDeleteTags">批量删除
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
      <el-table-column align="center" label="序号" width="95" :index="table_index"
                       type="index" sortable="true">
      </el-table-column>
      <el-table-column label="分类名称" min-width="90px" align="center" prop="userName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.name}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.name }}
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
          <el-button size="mini" type="primary" @click="handleAddEditTag(scope.row,'edit')">
            编辑
          </el-button>

          <el-button size="mini" type="primary" @click="handleAddEditTag(scope.row,'view')">
            详情
          </el-button>
          &nbsp;
          <el-button size="mini" type="danger" @click="handleDeleteTag(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchData"
                ref="handleSizeChange"/>
    <!--    引入组件-->
    <tag-add-update-view v-if="dialogFormVisible" ref="tagAddUpdateView"
                          @refreshDataList="fetchData"></tag-add-update-view>
  </div>
</template>

<script>
  import { getList,deleteTag,deleteTags } from '@/api/tag'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import tagAddUpdateView from '@/views/blog/tag-add-update-view'
  import { MessageBox } from '_element-ui@2.13.0@element-ui'

  export default {
    name: 'tagList',
    data() {
      return {
        list: null,
        listLoading: true,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        currentPage: 1,
        dialogFormVisible: false,//默认不弹窗
        multipleSelection: [],//用于存放选中的数据的id
        searchForm: {
          tagName: '',
        },
        dateRange: []//时间数组
      }
    },
    components: { Pagination, tagAddUpdateView },
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

        //时间数组拆分
        if (null != this.dateRange && '' != this.dateRange) {
          this.searchForm.beginTime = this.dateRange[0];
          this.searchForm.endTime = this.dateRange[1];
        }

        this.listLoading = true
        getList(this.searchForm).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      // 新增/编辑标签
      handleAddEditTag(row, param) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.tagAddUpdateView.init(row, param)
        })
      },

      //删除用户
      handleDeleteTag(row) {
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
            deleteTag(params).then((data) => {
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
      handleDeleteTags() {
        if(this.multipleSelection.length==0){
          MessageBox.confirm('请选择至少一条数据', '批量删除数据', {
            type: 'warning'
          })
          return
        }
        deleteTags({ ids: (this.multipleSelection) + '' }).then(data => {
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
