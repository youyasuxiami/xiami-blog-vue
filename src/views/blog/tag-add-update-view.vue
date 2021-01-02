<template>
  <div>
    <el-dialog :visible.sync="visible" :title=textMap[dialogStatus] width="800px">
      <!-- 表单  start-->
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="120px"
        :rules="rule"
        @keyup.enter.native="dialogStatus==='add'?addData():updateData()"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>

      </el-form>
      <!-- 表单  end-->

      <!--      底部按钮 start-->
      <div slot="footer" class="m-footer">
        <!--        新增/编辑-->
        <div v-if="!viewDisabled">
          <el-button @click="visible = false" size="medium">
            返回
          </el-button>
          <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
            提交
          </el-button>
        </div>
        <!--        查看-->
        <div v-else>
          <el-button @click="visible = false">
            返回
          </el-button>
        </div>
      </div>      <!--      底部按钮 end-->
    </el-dialog>
  </div>
</template>
<script>
  import { addTag } from '@/api/tag'

  export default {
    data() {
      return {
        visible: true,
        dialogStatus: '',
        addUpdateVisible: true,
        viewDisabled: false,//false：表示可以编辑
        show: false,//默认不显示头像修改框
        temp: {
          name: ''
        },
        textMap: {
          add: '申请',
          edit: '编辑',
          view: '查看'
        },
        rule: {
          name: [
            { required: true, message: '标签名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init(row, param) {
        this.viewDisabled = false //可以编辑
        this.visible = true

        if (param) {//如果是新增传过来，那么param为undefined,将会走else
          this.dialogStatus = param
          this.temp = Object.assign({}, row) // copy obj
          switch (param) {
            case 'edit':
              break

            case 'view':
              this.viewDisabled = true //不可编辑
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
            addTag(this.temp).then((data) => {
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
            addTag(this.temp).then((data) => {

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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .m-max-width {
    width: 100%;
  }

  .m-tag {
    height: 39px;
    line-height: 30px;
    padding: 5px;
    width: 100%;
    border: 1px #00B5AD solid;
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    color: #00B5AD;
    font-size: 1em;
    font-weight: 600;
  }

  .m-footer {
    text-align: center;
    margin-bottom: 35px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .disabled .el-upload--picture-card {
    display: none !important;
  }

  /deep/ .el-select .el-input__inner {
    color: #00B5AD;
    font-size: 1em;
    font-weight: 600;
  }
</style>
