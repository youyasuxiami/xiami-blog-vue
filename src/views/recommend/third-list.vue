<template>
  <div class="app-container">
    <div>
      <el-form ref="form"
               :model="searchForm"
               label-width="80px"
               size="mini"
               :inline="true"
               @keyup.enter.native="fetchData"
      >
        <el-form-item label="作者">
          <el-input v-model="searchForm.userName" clearable></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="searchForm.typeId" placeholder="请选择" clearable>
            <el-option :label="item.name" :value="item.id" v-for="item in typeList"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="searchForm.title" clearable></el-input>
        </el-form-item>

        <el-form-item label="文章来源">
          <el-select v-model="searchForm.flag" placeholder="请选择" clearable>
            <el-option label="原创" value="1"></el-option>
            <el-option label="转载声明" value="2"></el-option>
            <el-option label="翻译" value="3"></el-option>
          </el-select>
        </el-form-item>

        <!--        <el-form-item label="推荐等级">-->
        <!--          <el-select v-model="searchForm.recommend" placeholder="请选择" clearable>-->
        <!--            <el-option label="正常" value="0"></el-option>-->
        <!--            <el-option label="一级推荐" value="1"></el-option>-->
        <!--            <el-option label="二级推荐" value="2"></el-option>-->
        <!--            <el-option label="三级推荐" value="3"></el-option>-->
        <!--            <el-option label="四级推荐" value="4"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->

        <el-form-item label="状态">
          <el-select v-model="searchForm.publish" placeholder="请选择" clearable>
            <el-option label="发布" value="1"></el-option>
            <el-option label="已保存" value="2"></el-option>
          </el-select>
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

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-plus" @click="handleAddEditBlog">新增
      </el-button>

      <el-button class="m-add-btn" type="primary" size="small" icon="el-icon-delete" @click="handleDeleteBlogs">批量删除
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
      <el-table-column align="center" label="序号" width="95"
                       type="index" sortable="true">
      </el-table-column>
      <el-table-column label="作者" min-width="90px" align="center" prop="userName">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" align="center">
            <span>{{scope.row.userName}}</span>
            <div slot="reference" class="m-popover">
              {{ scope.row.userName }}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.typeName}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.typeName}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.title}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.title}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="avatar" label="首图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.firstPicture" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="文章来源" width="100" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.flag}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.flag}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="推荐" width="200" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.recommend}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.recommend}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="转载声明" width="200" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.shareStatement"
            :active-value="1"
            :inactive-value="0"
            @change="handleShareStatementChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="赞赏" width="200" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.appreciation"
            :active-value="1"
            :inactive-value="0"
            @change="handleAppreciationChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="评论" width="200" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.commentabled"
            :active-value="1"
            :inactive-value="0"
            @change="handleCommentabledChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="观看次数" width="200" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.views}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.views}}
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="发布/草稿" width="200" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.publish}}</span>
            <div slot="reference" class="m-popover">
              {{scope.row.publish}}
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
          <el-button size="mini" type="primary" @click="handleAddEditBlog(scope.row,'edit')">
            编辑
          </el-button>

          <el-button size="mini" type="primary" @click="handleAddEditBlog(scope.row,'view')">
            详情
          </el-button>

          &nbsp;
          <span v-if="scope.row.status=='启用'">
            <el-button size="mini" type="warning" @click="handleUpdateUserStatus(scope.row)">
            发布
          </el-button>
          </span>

          <span v-else>
            <el-button size="mini" type="success" @click="handleUpdateUserStatus(scope.row)">
            草稿
          </el-button>
          </span>
          &nbsp;
          <el-button size="mini" type="danger" @click="handleDeleteBlog(scope.row)">
            删除
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
  // import { updateUserStatus, deleteUser, addUsers, exportUsers, exportAllUsers, deleteUsers } from '@/api/sys'
  import { getList,changeShareStatement,changeAppreciation, changeCommentabled,deleteBlog,deleteBlogs } from '@/api/blog'
  import { getTypes } from '@/api/type'
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  import blogAddUpdateView from '@/views/blog/blog-add-update-view'
  import { MessageBox } from '_element-ui@2.13.0@element-ui'

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
        accountStatusList: [],//账号状态数组
        currentPage: 1,
        dialogFormVisible: false,//默认不弹窗
        multipleSelection: [],//用于存放选中的数据的id
        dateRange:[],//创建时间的数组

        typeList:[],//分类数组

        searchForm: {
          userName: '',
          typeId: '',
          title: '',
          flag: '',
          recommend: '',
          publish: '',
          createTime: []//时间数组
        },
      }
    },
    components: { Pagination, blogAddUpdateView },
    created() {
      // 获取列表数据
      this.fetchData()

      getTypes().then(res => {
        this.typeList = res.data
      })

    },
    methods: {
      fetchData() {
        // 请求参数
        this.searchForm.pageNum = this.pageNum
        this.searchForm.pageSize = this.pageSize

        //数组时间
        this.searchForm.beginTime = "";
        this.searchForm.endTime = "";
        if (null != this.dateRange && '' != this.dateRange) {
          this.searchForm.beginTime = this.dateRange[0];
          this.searchForm.endTime = this.dateRange[1];
        }
        this.listLoading = true
        // 推荐等级
        this.searchForm.recommend=3

        getList(this.searchForm).then(response => {//这是json字符串请求
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },

      // 新增/编辑博客
      handleAddEditBlog(row, param) {
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.blogAddUpdateView.init(row, param)
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

      //删除博客
      handleDeleteBlog(row) {
        let params = {
          id: row.id
        }
        this.$confirm(
          `确定删除该博客?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            deleteBlog(params).then((data) => {
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
      //获得选中的行的id
      handleSelectionChange(val) {
        this.multipleSelection = []
        for (let i = 0; i < val.length; i++) {
          this.multipleSelection.push(val[i].id)
        }
      },

      handleDeleteBlogs() {
        if(this.multipleSelection.length==0){
          MessageBox.confirm('请选择至少一条数据', '批量删除数据', {
            type: 'warning'
          })
          return
        }
        deleteBlogs({ ids: (this.multipleSelection) + '' }).then(data => {
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

      //更新文章来源
      handleShareStatementChange(row) {
        let text = row.shareStatement === 1 ? '【开启】' : '【关闭】'
        this.$confirm('确认要' + text + '可转载吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeShareStatement({
            id: row.id,
            shareStatement: row.shareStatement
          }).then(data => {
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
        }).catch(function() {
          row.shareStatement = row.shareStatement === 0 ? 1 : 0
        })
      },

      //更新赞赏
      handleAppreciationChange(row) {
        let text = row.appreciation === 1 ? '【开启】' : '【关闭】'
        this.$confirm('确认要' + text + '赞赏吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeAppreciation({
            id: row.id,
            appreciation: row.appreciation
          }).then(data => {
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
        }).catch(function() {
          row.appreciation = row.appreciation === 0 ? 1 : 0
        })
      },

      //更新评论
      handleCommentabledChange(row) {
        let text = row.commentabled === 1 ? '【开启】' : '【关闭】'
        this.$confirm('确认要' + text + '可评论吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeCommentabled({
            id: row.id,
            commentabled: row.commentabled
          }).then(data => {
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
        }).catch(function() {
          row.commentabled = row.commentabled === 0 ? 1 : 0
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
