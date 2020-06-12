<template>
  <div>
    <el-dialog :visible.sync="visible" :title=title>
<!--      <el-form ref="dataForm" :model="temp" label-width="70px">-->
<!--              <el-form ref="dataForm"  :model="temp" label-position="right" label-width="120px" style="width: 400px; margin-left:50px;">-->
              <el-form ref="dataForm"  :model="temp" label-position="right" label-width="120px">
        <!--        <el-row :gutter="10">-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="备注" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号状态" prop="title">
              <el-input v-model="temp.title"/>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        visible: true,
        title:"申请",
        searchForm: {
          name: "zhengjin"
        },
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        }
      }
    },
    // props: ["show"],
    // methods: {
    //   closeShow() {
    //     this.$emit("update:show",false);
    //   }
    // },
  }
</script>
<style lang="scss" scoped>
</style>
