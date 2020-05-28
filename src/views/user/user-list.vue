<template>
  <div class="app-container">
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
        <template slot-scope="scope">{{ scope.row.sex }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="年龄" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.age }}</template>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
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
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
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
