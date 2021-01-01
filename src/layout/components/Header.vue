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
      <div class="right-menu">
        <template v-if="device!=='mobile'">
<!--          缩放-->
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
          <!-- 消息中心 -->
          <div class="right-menu-item" style="position: relative">
            <el-tooltip
              effect="dark"
              :content="message?`有${message}条未读消息`:`消息中心`"
              placement="bottom"
            >
              <router-link to="/tabs">
                <i class="el-icon-bell"></i>
              </router-link>
            </el-tooltip>
            <span class="btn-bell-badge" v-if="message"></span>
          </div>
          <el-tooltip content="字体大小" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>
        </template>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <router-link to="/profile/info">
              <el-dropdown-item>用户信息</el-dropdown-item>
            </router-link>
            <router-link to="/profile/password">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { getFirstMenus,getMenusByFirstMenuId } from '@/api/menu'
  import router from '@/router'
  import store from '@/store'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        activeIndex: '101',
        firstMenu: [], //一级菜单数组
        message: 2
      }
    },
    components:{
      Screenfull,
      SizeSelect
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ])
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
        localStorage.setItem("activeIndex",this.activeIndex)
        getMenusByFirstMenuId({"firstMenuId":this.activeIndex}).then(async(data) => {

          if (data.code == '20000') {
            urls = data.data.urls
            const accessRoutes = await store.dispatch('permission/generateRoutes', urls)//获取该用户的所有菜单
            router.addRoutes(accessRoutes)
          } else {
          }
        })
      },
      getFirstMenuList() {
        getFirstMenus().then((data) => {
          if (data.code == '20000') {
            this.firstMenu=data.data
            this.activeIndex = localStorage.getItem("activeIndex")
            if(!this.activeIndex){
              this.activeIndex=this.firstMenu[0].id+""
            }
          } else {
          }
        })

      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .btn-bell-badge {
    position: absolute;
    right: 5px;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

</style>
