<template>
  <el-row class="container">
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../../assets/logo.png" style="padding-left:8px;" width="50px"></a>
      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff;"><span>小锦哥个人博客</span></a>
      </div>
      <div class="topbar-title">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#373D41"
          text-color="#fff"
          active-text-color="#ffd04b">
                    <el-menu-item index="/enterpriseManager">个人信息</el-menu-item>
                    <el-menu-item index="/orderManager">系统管理</el-menu-item>
<!--          <el-menu-item :index="item.path" :key="item.path" v-for="item in firstMenu">{{item.name}}</el-menu-item>-->
        </el-menu>
      </div>
      <div class="topbar-account topbar-btn">

      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { getFirstMenus } from '@/api/menu'

  export default {
    data() {
      return {
        activeIndex: '/',
        firstMenu: [] //一级菜单数组
      }
    },
    // created() {
    //   this.getFirstMenuList()
    // },
    methods: {
      handleSelect(index) {
        alert(this.$route.path)
        // this.defaultActiveIndex = index
      },
      getFirstMenuList() {
        getFirstMenus().then((data) => {
          console.log('data')
          console.log(data)
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

      }
    }
  }
</script>
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .container .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;
  }

  .container .topbar-wrap .topbar-logo {
    float: left;
    width: 60px;
    line-height: 26px;
  }

  .container .topbar-wrap .topbar-btn {
    color: #fff;
  }

  .container .topbar-wrap .topbar-logos {
    float: left;
    width: 128px;
    line-height: 48px;
    font-size: 14px;
  }

  .container .topbar-wrap .topbar-title {
    float: left;
    text-align: left;
    padding-left: 10px;
    border-left: 1px solid #000;
  }

  .container .topbar-wrap .topbar-account {
    float: right;
    padding-right: 12px;
  }

  .container .topbar-wrap .userinfo-inner {
    cursor: pointer;
    color: #fff;
    padding-left: 10px;
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-user:before {
    content: "\ec52";
  }

</style>
