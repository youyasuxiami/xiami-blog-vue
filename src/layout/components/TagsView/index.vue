<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll" style="float: left">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
      >
<!--        @contextmenu.prevent.native="openMenu(tag,$event)"-->
        {{ tag.title }}
        <span class="tags-li-icon" v-if="tag.name !== '首页'" @click.prevent.stop="closeSelectedTag(tag)"><i
          class="el-icon-close"></i></span>
      </router-link>
    </scroll-pane>
    <div style="position: absolute;right: 5px;">
      <el-dropdown @command="handleCommand">
        <el-button type="primary" size="small">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="refreshSelectedTag">刷新</el-dropdown-item>
          <el-dropdown-item command="closeSelectedTag">关闭当前标签</el-dropdown-item>
          <el-dropdown-item command="closeOthersTags">关闭其他标签</el-dropdown-item>
          <el-dropdown-item command="closeAllTags">关闭所有标签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import ScrollPane from './ScrollPane'
  import path from 'path'

  export default {
    components: { ScrollPane },
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
        affixTags: []
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      },
      routes() {
        return this.$store.state.permission.routes
      }
    },
    watch: {
      $route() {
        this.addTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.initTags()
      this.addTags()
    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path
      },
      isAffix(tag) {
        return tag.meta && tag.meta.affix
      },
      filterAffixTags(routes, basePath = '/') {
        let tags = []
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      },
      initTags() {
        const affixTags = this.affixTags = this.filterAffixTags(this.routes)
        for (const tag of affixTags) {
          // Must have tag name
          if (tag.name) {
            this.$store.dispatch('tagsView/addVisitedView', tag)
          }
        }
      },
      addTags() {
        const { name } = this.$route
        if (name) {
          this.$store.dispatch('tagsView/addView', this.$route)
        }
        return false
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag)
              // when query is different then update
              if (tag.to.fullPath !== this.$route.fullPath) {
                this.$store.dispatch('tagsView/updateVisitedView', this.$route)
              }
              break
            }
          }
        })
      },
      refreshSelectedTag(view) {
        // console.log("11111111")
        // this.$store.dispatch('tagsView/delCachedView', this.$route).then(() => {
        //   const { fullPath } = this.$route
        //   this.$nextTick(() => {
        //     this.$router.replace({
        //       path: '/redirect' + fullPath
        //     })
        //   })
        // })
        location.reload()
      },
      // 关闭当前标签
      closeSelectedTag(view) {
        this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
        // 调用全局挂载的方法
        // this.$store.dispatch('tagsView/delView', this.$route)
        // 返回上一步路由
        // this.$router.go(-1)
      },
      // 关闭其他标签
      closeOthersTags() {
        this.$router.push(this.selectedTag)
        this.$store.dispatch('tagsView/delOthersViews', this.$route).then(() => {
        // this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      // 关闭所有标签
      closeAllTags(view) {
        this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
          if (this.affixTags.some(tag => tag.path === view.path)) {
            return
          }
          this.toLastView(visitedViews, view)
        })
      },
      toLastView(visitedViews, view) {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView.fullPath)
        } else {
          // now the default is to redirect to the home page if there is no tags-view,
          // you can adjust it according to your needs.
          if (view.name === 'Dashboard') {
            // to reload home page
            this.$router.replace({ path: '/redirect' + view.fullPath })
          } else {
            this.$router.push('/')
          }
        }
      },
      // openMenu(tag, e) {
      //   const menuMinWidth = 105
      //   const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      //   const offsetWidth = this.$el.offsetWidth // container width
      //   const maxLeft = offsetWidth - menuMinWidth // left boundary
      //   const left = e.clientX - offsetLeft + 15 // 15: margin right
      //
      //   if (left > maxLeft) {
      //     this.left = maxLeft
      //   } else {
      //     this.left = left
      //   }
      //
      //   this.top = e.clientY
      //   this.visible = true
      //   this.selectedTag = tag
      // },
      closeMenu() {
        this.visible = false
      },
      handleScroll() {
        this.closeMenu()
      },
      // 选项卡下拉
      handleCommand(command) {
        // @click="refreshSelectedTag(selectedTag)"刷新
        // @click="closeSelectedTag(selectedTag)"关闭当前标签
        // @click="closeOthersTags"关闭其他标签
        // @click="closeAllTags(selectedTag)"关闭所有标签
        switch (command) {
          case 'refreshSelectedTag':
            this.refreshSelectedTag(this.selectedTag)
            break
          case 'closeSelectedTag':
            this.closeSelectedTag(this.selectedTag)
            break
          case 'closeOthersTags':
            this.closeOthersTags()
            break
          case 'closeAllTags':
            this.closeAllTags(this.selectedTag)
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;

          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }

  /*选项卡下拉*/
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }


  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }


  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 40px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }
</style>
