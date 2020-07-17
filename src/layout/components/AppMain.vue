<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" v-if="isRouterAlive" ></router-view>
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
    uncachedView() {
      return this.$store.state.tagsView.uncachedView;
    }
  },
  methods:{
    // reload() {
    //   console.log("33333")
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
