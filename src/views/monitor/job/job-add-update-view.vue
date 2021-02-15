<template>
  <div>
    <el-dialog :visible.sync="visible" :title=textMap[dialogStatus] width="700px">
      <!-- 表单  start-->
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="120px"
        :rules="rule"
        @keyup.enter.native="dialogStatus==='add'?addData():updateData()"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="jobName" >
              <el-input v-model="temp.jobName" :disabled="viewDisabled_two"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务组名" prop="jobGroup">
              <el-input v-model="temp.jobGroup" :disabled="viewDisabled_two"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="触发器名称" prop="triggerName">
              <el-input v-model="temp.triggerName" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="触发器组名" prop="triggerGroup">
              <el-input v-model="temp.triggerGroup" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="定时任务全路径" prop="executePath">
              <el-input v-model="temp.executePath" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="cron表达式" prop="cronExpression">
              <el-input v-model="temp.cronExpression" :disabled="viewDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="temp.remarks" placeholder="请输入备注" clearable type="textarea"
                        resize="none" :disabled="viewDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表单  end-->

      <!--      底部按钮 start-->
      <div slot="footer" class="m-footer">
        <!--        新增/编辑-->
        <div v-if="!viewDisabled">
          <el-button @click="visible = false">
            取消
          </el-button>
          <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
            提交
          </el-button>
        </div>
        <!--        查看-->
        <div v-else>
          <el-button @click="visible = false">
            取消
          </el-button>
        </div>
      </div>
      <!--      底部按钮 end-->
    </el-dialog>
  </div>
</template>
<script>
  import { addUpdateJob } from '@/api/monitor/job'

  export default {
    data() {
      return {
        visible: true,
        dialogStatus: '',
        addUpdateVisible: true,
        viewDisabled: false,//false：表示可以编辑
        viewDisabled_two: false,//false：表示可以编辑
        show: false,//默认不显示头像修改框
        // params: {
        //   access_token: getToken()
        // },
        temp: {
          jobName:"",
          jobGroup:"",
          executePath:"",
          cronExpression:"",
          remarks:"",
          triggerName:"",
          triggerGroup:""
        },
        textMap: {
          add: '申请',
          edit: '编辑',
          view: '查看'
        },
        rule: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '年龄不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系方式不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '电子邮箱不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '账号状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init(row, param) {
        this.viewDisabled = false //可以编辑
        this.viewDisabled_two = false //可以编辑
        this.visible = true
        // this.dialogStatus = param
        if (param) {//如果是新增传过来，那么param为undefined,将会走else
          this.dialogStatus = param
          this.temp = Object.assign({}, row) // copy obj

          switch (param) {
            case 'edit':
              this.viewDisabled_two = true //不可编辑
              break

            case 'view':
              this.viewDisabled = true //不可编辑
              this.viewDisabled_two = true //不可编辑
              break
          }
        } else {
          this.dialogStatus = 'add'
          this.$refs.dataForm.resetFields()//对该表单项进行重置，将其值重置为初始值并移除校验结果
        }
      },
      addData() {
        this.$refs['dataForm'].validate((valid) => {

          if (valid) {
            addUpdateJob(this.temp).then(data => {
              if (data.code == '20000') {
                this.$notify({
                  title: '成功',
                  message: data.message,
                  type: 'success',
                  duration: 2000,
                  onClose: () => {
                    this.visible = false
                    // this.isDisabled = false;
                    this.$emit('refreshDataList')
                  }
                })
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
        })
      },
      updateData: function() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addUpdateJob(this.temp).then((data) => {
              if (data.code == '20000') {
                this.$notify({
                  title: '成功',
                  message: data.message,
                  type: 'success',
                  duration: 2000,
                  onClose: () => {
                    this.visible = false
                    // this.isDisabled = false;
                    this.$emit('refreshDataList')
                  }
                })
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
        })
      },
      toggleShow() {
        this.show = !this.show
      },
    },
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
