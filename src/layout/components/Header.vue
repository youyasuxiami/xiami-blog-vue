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
          <el-menu-item :index="item.id.toString()" :key="item.id" v-for="item in firstMenu">{{item.name}}</el-menu-item>
        </el-menu>
      </div>
      <div class="topbar-account topbar-btn">

      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { getFirstMenus,getMenusByFirstMenuId } from '@/api/menu'
  import router from '@/router'
  import store from '@/store'
  export default {
    data() {
      return {
        activeIndex: '101',
        firstMenu: [] //一级菜单数组
      }
    },
    created() {
      this.getFirstMenuList()
    },
    methods: {
      handleSelect(index) {
        this.activeIndex = index
        let urls;
        //  this.$store.dispatch('user/getInfo',{"firstMenuId":this.activeIndex}).then(data=>{
        //    urls=data.urls;
        //  })
        getMenusByFirstMenuId({"firstMenuId":this.activeIndex}).then(async(data) => {

          if (data.code == '20000') {
            urls = data.data.urls
            console.log("urls")
            const accessRoutes = await store.dispatch('permission/generateRoutes', urls)//获取该用户的所有菜单
            console.log("获取路由表")
            console.log(accessRoutes)
            router.addRoutes(accessRoutes)
          } else {
            console.log("失败")
          }
        })
      },
      getFirstMenuList() {
        getFirstMenus().then((data) => {
          if (data.code == '20000') {
            this.firstMenu=data.data
            console.log("成功")
          } else {
            console.log("失败")
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
    width: 149px;
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
