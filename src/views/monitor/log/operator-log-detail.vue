<template>
  <div>
    <el-dialog :visible.sync="visible" :title=textMap[dialogStatus] width="700px">
      <!-- 表单  start-->
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="日志编号" prop="id" >
              <el-input v-model="temp.id"  readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日志标题" prop="title">
              <el-input v-model="temp.title" readonly/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="请求类型" prop="method">
              <el-input v-model="temp.method" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求URL" prop="operUrl">
              <el-input v-model="temp.operUrl" readonly/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="主机地址" prop="operIp">
              <el-input v-model="temp.operIp" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作地点" prop="operAddr">
              <el-input v-model="temp.operAddr" readonly/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="操作人员" prop="operName">
              <el-input v-model="temp.operName" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作状态" prop="status">
              <el-input v-model="temp.status" readonly/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="错误信息" prop="errorMsg">
              <el-input v-model="temp.errorMsg" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间" prop="operTime">
              <el-input v-model="temp.operTime" readonly/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="用户代理" prop="userAgent">
              <el-input v-model="temp.userAgent" placeholder="请输入备注" clearable type="textarea"
                        resize="none" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表单  end-->

      <!--      底部按钮 start-->
      <div slot="footer" class="m-footer">
        <!--        查看-->
          <el-button @click="visible = false">
            取消
          </el-button>
      </div>
      <!--      底部按钮 end-->
    </el-dialog>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        visible: true,
        dialogStatus: 'view',
        logStatusList: [],//操作日志状态数组
        temp: {
          id:"",
          title:"",
          method:"",
          operUrl:"",
          operIp:"",
          operAddr:"",
          operName:"",
          status:"",
          errorMsg:"",
          userAgent:"",
          operTime:""
        },
        textMap: {
          add: '申请',
          edit: '编辑',
          view: '查看'
        },
      }
    },
    created() {
      //获取日志操作状态的字典翻译数据
      this.getTypeValue('operator_log_status').then(res => {
        this.logStatusList = res.data
        console.log("打印操作状态")
        console.log(this.logStatusList)
      })
    },
    methods: {
      init(row) {
        this.temp = Object.assign({}, row)
        if(this.temp.status==0){
          this.temp.status="成功"
        }else{
          this.temp.status="失败"
        }
        this.visible = true
        this.viewDisabled = false //不可编辑
        this.viewDisabled_two = false //不可编辑
      }
    }
  }
</script>
<style lang="scss" scoped>
  .m-max-width {
    width: 100%;
  }

  .m-footer {
    text-align: center;
    margin-bottom: 35px;
  }
</style>
