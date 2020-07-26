<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <Header style="background: #373D41;height: 60px; position: fixed;top: 0;" ></Header>
    <sidebar class="sidebar-container"/>
    <div class="main-container" >
      <navbar style="position: absolute;top: 60px;width: 100%;"/>
      <tags-view style="position: absolute;top: 113px;width: 100%;"/>
      <div class="app-main"style="position:absolute;top: 153px;overflow-y: scroll;height:100px;padding-bottom: 70px;">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="this.$store.state.tagsView.cachedViews" :exclude="this.$store.state.tagsView.uncachedView">
            <router-view  v-if="isRouterAlive"></router-view>
          </keep-alive>
        </transition>
      </div>
<!--      <app-main style="position:absolute;top: 153px;overflow-y: scroll;height:100px;padding-bottom: 70px;"  />-->
    </div>
  </div>
</template>

<script>
  // import { Navbar, Sidebar, AppMain, TagsView, Header } from './components'
  import { Navbar, Sidebar, TagsView, Header } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import { mapState } from 'vuex'

  export default {
    name: 'Layout',
    data(){
      return {
        isRouterAlive: true
      }
    },
    components: {
      Navbar,
      Sidebar,
      // AppMain,
      TagsView,
      Header
    },
    mixins: [ResizeMixin],
    provide() {
      return {
        reload: this.reload
      };
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        showSettings: state => state.settings.showSettings,
        needTagsView: state => state.settings.tagsView
        // fixedHeader: state => state.settings.fixedHeader
      }),
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      fixedHeader() {
        return this.$store.state.settings.fixedHeader
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      },
      key() {
        return this.$route.path
      },
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    //@include clearfix;
    /*position: relative;*/
    height: 100%;
    width: 100%;
    overflow: hidden;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
