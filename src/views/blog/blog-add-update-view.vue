<template>
  <div>
    <el-dialog :visible.sync="visible" :title=textMap[dialogStatus] width="80%">
      <!-- 表单  start-->
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="300px"
        @keyup.enter.native="dialogStatus==='add'?addData():updateData()"
      >
        <el-row style="margin-bottom: 15px;">
          <el-col :span="3">
            <el-select v-model="temp.flag">
              <el-option
                v-for="item in flagList"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="21">
            <el-input placeholder="请输入标题" class="input-with-select" v-model="temp.title"/>
          </el-col>
        </el-row>

        <mavon-editor
          v-model="temp.content"
          ref=md
          @imgAdd="imgAdd"
          @imgDel="imgDel"
          style="height: 800px;"
        ></mavon-editor>

        <el-row style="margin-top: 15px;">
          <el-col :span="3">
            <div class="m-tag">
              分类
            </div>
          </el-col>

          <el-col :span="9" style="padding-right: 0.5em">
            <el-select v-model="temp.typeId" placeholder="请选择" clearable class="m-max-width">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <div class="m-tag">
              标签
            </div>
          </el-col>
          <el-col :span="9">
            <el-select v-model="value1" placeholder="请选择" clearable class="m-max-width" multiple>
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row style="margin-top: 15px;">
          <el-col :span="3">
            <div class="m-tag">
              推荐
            </div>
          </el-col>

          <el-col :span="9" style="padding-right: 0.5em">
            <el-select v-model="temp.recommend" placeholder="请选择" clearable class="m-max-width">
              <el-option
                v-for="item in recommendList"
                :key="item.id"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row style="margin-top: 15px;">
          <el-col :span="3">
            <div class="m-tag">
              首图
            </div>
          </el-col>
          <el-col :span="21">
            <el-input v-model="temp.firstPicture" @click.native="toggleShow">
            </el-input>
            <image-cropper
              v-model="show"
              field="multipartFile"
              :width="231"
              :height="140"
              :size="50"
              :url="url"
              :langExt="zdy"
              :headers="headers"
              img-format="png"
              @crop-success="cropSuccess"
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail"
            />
          </el-col>
        </el-row>

        <el-row style="margin-top: 15px;">
          <el-col :span="24">
            <el-input v-model="temp.description" type="textarea" rows="6" placeholder="请输入博客描述"/>
          </el-col>
        </el-row>

        <el-row style="margin-top: 15px;">
<!--          <el-col :span="3">-->
<!--            <el-checkbox v-model="temp.recommend">推荐</el-checkbox>-->
<!--          </el-col>-->

          <el-col :span="3">
            <el-checkbox v-model="temp.shareStatement">转载声明</el-checkbox>
          </el-col>

          <el-col :span="3">
            <el-checkbox v-model="temp.appreciation">赞赏</el-checkbox>
          </el-col>

          <el-col :span="3">
            <el-checkbox v-model="temp.commentabled">评论</el-checkbox>
          </el-col>
        </el-row>
      </el-form>      <!-- 表单  end-->

      <!--      底部按钮 start-->
      <div slot="footer" class="m-footer">
        <!--        新增/编辑-->
        <div v-if="!viewDisabled">
          <el-button @click="visible = false" size="medium">
            返回
          </el-button>
          <el-button type="info" @click=addData size="medium" v-if="dialogStatus==='add'">
            保存
          </el-button>
          <el-button type="primary" @click=addData size="medium">
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
  import ImageCropper from 'vue-image-crop-upload'
  import PanThumb from '@/components/PanThumb'
  import { getTypes } from '@/api/type'
  import { getTags, getCheckedTags } from '@/api/tag'
  import { addBlog,addPhoto } from '@/api/blog'

  export default {
    data() {
      return {
        visible: true,
        dialogStatus: '',
        addUpdateVisible: true,
        accountStatusList: [],//账号状态数组
        viewDisabled: false,//false：表示可以编辑
        show: false,//默认不显示头像修改框
        url: process.env.VUE_APP_BASE_API + '/upload',
        // params: {
        //   access_token: getToken()
        // },
        zdy: {
          hint: '点击，或拖动图片至此处',
          loading: '正在上传……',
          noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
          success: '上传成功',
          fail: '图片上传失败',
          preview: '图片预览',
          btn: {
            off: '取消',
            close: '关闭',
            back: '上一步',
            save: '保存'
          },
          error: {
            onlyImg: '仅限图片格式',
            outOfSize: '单文件大小不能超过 ',
            lowestPx: '图片最低像素为（宽*高）：'
          }
        },
        headers: {
          smail: '*_~'
        },
        roles: [],
        flagList: [],
        typeList: [],
        tagList: [],
        recommendList:[],
        value1: [],
        temp: {
          flag: '1',
          title: '',
          content: '',
          typeId: '',
          recommend:'',
          firstPicture: '',
          description: '',
          shareStatement: false,
          appreciation: false,
          commentabled: false
        },
        textMap: {
          add: '申请',
          edit: '编辑',
          view: '查看'
        },
        img_file:{}
      }
    },
    components: { ImageCropper, PanThumb },
    methods: {
      init(row, param) {
        this.viewDisabled = false //可以编辑
        this.visible = true

        if (param) {//如果是新增传过来，那么param为undefined,将会走else
          this.dialogStatus = param
          this.temp = Object.assign({}, row) // copy obj
          switch (this.temp.flag) {
            case '原创':
              this.temp.flag = '1'
              break
            case '转载声明':
              this.temp.flag = '2'
              break
            case '翻译':
              this.temp.flag = '3'
              break
          }

          switch (this.temp.recommend) {
            case '正常':
              this.temp.recommend = '0'
              break
            case '一级推荐':
              this.temp.recommend = '1'
              break
            case '二级推荐':
              this.temp.recommend = '2'
              break
            case '三级推荐':
              this.temp.recommend = '3'
              break
            case '四级推荐':
              this.temp.recommend = '4'
              break
          }
          // this.temp.recommend = this.temp.recommend === ""

          this.temp.shareStatement = this.temp.shareStatement === 1

          this.temp.appreciation = this.temp.appreciation === 1

          this.temp.commentabled = this.temp.commentabled === 1

          switch (param) {
            case 'edit':
              this.getChecked()//获取选中的标签的id
              break

            case 'view':
              this.getChecked()//获取选中的标签的id
              this.viewDisabled = true //不可编辑
              break
          }
        } else {
          this.dialogStatus = 'add'
          this.temp.flag = '1'
          this.temp.title = ''
          this.temp.content = ''
          this.temp.typeId = ''
          this.temp.recommend = ''
          this.value1 = []
          this.temp.firstPicture = ''
          this.temp.description = ''
          this.temp.shareStatement = false
          this.temp.appreciation = false
          this.temp.commentabled = false
        }
      },
      imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('multipartFile', $file)

        let url=this.url

        this.img_file[pos] = $file
        addPhoto(
          formdata
        ).then((response) => {
          if (response.code == '20000') {
            let _res = response.data
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            this.$refs.md.$img2Url(pos, _res.path)

            this.$notify({
              title: '成功',
              message: response.message,
              type: 'success',
              duration: 2000,
            })
          } else {
            this.$notify({
              title: '失败',
              message: response.message,
              type: 'error',
              duration: 2000
            })
          }
        })


        // this.$http({
        //   url: url,
        //   method: 'post',
        //   data: formdata,
        //   headers: { 'Content-Type': 'multipart/form-data' }
        // }).then((res) => {
        //   let _res = res.data
        //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        //   this.$refs.md.$img2Url(pos, _res.url)
        // })
      },
      imgDel(pos) {
        delete this.img_file[pos]
      },
      getChecked() {
        getCheckedTags({ id: this.temp.id }).then(res => {
          this.value1 = res.data
        })
      },
      /**
       *
       * @param image
       * @param field
       */
      cropSuccess(image, field) {
        this.temp.firstPicture = image
      },
      /**
       * 上传成功
       * @param jsonData 服务器返回数据，已进行 JSON 转码
       * @param field
       */
      cropUploadSuccess(jsonData, field) {
        this.temp.firstPicture = jsonData.data.path
      },
      /**
       * 上传失败
       * @param status 服务器返回的失败状态码
       * @param field
       */
      cropUploadFail(status, field) {
      },
      toggleShow() {
        this.show = !this.show
      },
      addData() {
        //赋值
        this.temp.tagIds = this.value1
        addBlog(
          this.temp
        ).then((data) => {
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
    }
    ,
    created() {
      this.getTypeValue('flag').then(res => {
        this.flagList = res.data
      })

      getTypes().then(res => {
        this.typeList = res.data
      })

      getTags().then(res => {
        this.tagList = res.data
      })

      this.getTypeValue('recommend_type').then(res => {
        this.recommendList = res.data
      })
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
