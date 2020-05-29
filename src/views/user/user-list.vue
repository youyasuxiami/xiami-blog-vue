<template>
  <div class="app-container">
    <div class="filter-container">
            <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
              <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
              <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
            </el-select>
            <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
              <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" >
        Export
      </el-button>
      <!--      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" >-->
      <!--        reviewer-->
      <!--      </el-checkbox>-->
    </div>


    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!--      <el-table-column prop="nickName" label="昵称" width="180"></el-table-column>-->
      <!--      <el-table-column prop="name" label="用户名" width="180"></el-table-column>-->
      <!--      <el-table-column prop="sex" label="性别" width="180"></el-table-column>-->
      <!--      <el-table-column prop="age" label="年龄" width="180"></el-table-column>-->
      <!--      <el-table-column prop="phone" label="联系方式" width="180"></el-table-column>-->
      <!--      <el-table-column prop="email" label="电子邮箱" width="180"></el-table-column>-->
      <!--      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>-->
      <!--      <el-table-column prop="loginTime" label="最新登录时间" width="180"></el-table-column>-->
      <!--      <el-table-column prop="ps" label="备注" width="180"></el-table-column>-->
      <!--      <el-table-column prop="status" label="账号状态" width="180"></el-table-column>-->

      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="昵称" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="{row}">{{ row.sex }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="年龄" width="110" align="center">
        <template slot-scope="{row}">{{ row.age }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="联系方式" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="电子邮箱" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="创建时间" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="更新时间" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="最新登录时间" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.loginTime }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="备注" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.ps }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="账号状态" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button  size="mini" type="primary">
            编辑
          </el-button>
          <el-button  size="mini" type="success">
            发布
          </el-button>
          <!--          <el-button v-if="row.status!='draft'" size="mini">-->
          <!--            保存-->
          <!--          </el-button>-->
          <el-button size="mini" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
<!--    <pagination v-show="total>0" total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->

    <!--    <div style="text-align: center;margin-top: 30px;">-->
<!--      <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :total="total"-->
<!--        @current-change="current_change">-->
<!--      </el-pagination>-->
<!--    </div>-->

    <div class="block" style="margin-top: 20px;">
<!--      <span class="demonstration">完整功能</span>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getList} from '@/api/user'

  export default {
    // filters: {
    //   statusFilter(status) {
    //     const statusMap = {
    //       published: 'success',
    //       draft: 'gray',
    //       deleted: 'danger'
    //     }
    //     return statusMap[status]
    //   }
    // },
    data() {
      return {
        list: null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: "",
          type: undefined,
          sort: '+id'
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data
          this.listLoading = false
        })
      }
    }
  }
</script>
