<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
<!--      <keep-alive  v-if="isRouterAlive" :include="this.$store.state.tagsView.cachedViews">-->
<!--      <keep-alive :exclude="uncachedView" :include="cachedView">-->
      <keep-alive >
<!--        <router-view  v-if="isRouterAlive"></router-view>-->
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  data(){
    return {
      isRouterAlive: true
    }
  },
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    cachedView(){
      return this.$store.state.tagsView.cachedView;
    },
    uncachedView() {
      return this.$store.state.tagsView.uncachedView;
    }
  },
  methods:{
    // reload() {
    //   this.isRouterAlive = false;
    //   this.$nextTick(function() {
    //     this.isRouterAlive = true;
    //   });
    // }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
