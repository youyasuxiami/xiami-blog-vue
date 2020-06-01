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
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
<!--      <el-table-column align="center" label="ID" width="95">-->
<!--        <template slot-scope="scope">{{ scope.row.id }}</template>-->
<!--      </el-table-column>-->
      <el-table-column label="用户名"  align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="昵称"  align="center">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="性别"  align="center">
        <template slot-scope="{row}">{{ row.sex }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="年龄"  align="center">
        <template slot-scope="{row}">{{ row.age }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="联系方式" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="电子邮箱" width="150"  align="center">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="创建时间"  align="center" width="160">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="更新时间"  align="center" width="160">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="最新登录时间"  align="center" width="160">
        <template slot-scope="scope">{{ scope.row.loginTime }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="备注"  align="center" width="110">
        <template slot-scope="scope">{{ scope.row.ps }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="账号状态"  align="center">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary">
            编辑
          </el-button>
          <el-button size="mini" type="success">
            发布
          </el-button>
          <el-button size="mini" type="danger">
            删除
          </el-button>
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
    <pagination v-show="total>0" :total="total" :page.sync="this.pageNum" :limit.sync="this.pageSize"  />

  </div>
</template>

<script>
  import { getList } from '@/api/sys'
  import { getTypeValue } from '@/utils/dictionary'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination



  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        searchForm: {
          name: '',
          nickName: '',
          roleId: '',
          sex: '',
          accountStatus: '',
          createTime: [],//时间数组
          // pageNum: 1,//暂时json
          // pageSize: 10,//暂时json
        },
        roleList: [],//角色数组
        sexList: [],//性别数组
        accountStatusList: [],//账号状态数组
        currentPage: 1
      }
    },
    components: { Pagination },
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      fetchData() {//我不想把pageSize、pageIndex放在里面searchForm，怎么做？？？？？

        // 请求参数
        this.searchForm.pageNum=this.pageNum
        this.searchForm.pageSize=this.pageSize
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
      }
    }
  }
</script>





