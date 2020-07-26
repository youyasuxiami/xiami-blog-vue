import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index'),
      name: '首页',
      meta: { title: '首页', icon: 'dashboard', affix: true }
    },
      {
        path: '/tabs',
        component: () => import('@/views/tabs/Tabs'),
        name: '选项卡',
        hidden: true,
        meta: {
          title: '未读消息'
        }
      },
      {
        path: '/404',
        component: () => import('@/views/error/404moban'),
        hidden: true
      }
    ]
  },
  {
    path: '/profile',
    name: '个人信息',
    component: Layout,
    hidden: true,
    redirect: '/profile/info',
    meta: {
      title: '个人信息',
      icon: 'user'
    },
    children: [
      {
        path: '/profile/info',
        name: 'profileInfo',
        component: () => import('@/views/profile/info'),
        hidden: true,
        meta: {
          title: '用户信息',
          icon: 'profile',
          affix: false
        }
      },
      {
        path: '/profile/password',
        name: 'profilePassword',
        component: () => import('@/views/profile/password'),
        hidden: true,
        meta: {
          title: '修改密码',
          icon: 'password',
          affix: false
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/info',
    meta: {
      title: '博客管理',
      icon: 'user'
    },
    children: [
      {
        path: '/blog/info',
        name: 'ProfileInfo',
        // component: () => import('@/views/profile/info'),
        component: () => import('@/views/sys/user/user-list'),
        meta: {
          title: '博客列表',
          icon: 'profile',
          affix: false
        }
      },
      {
        path: '/blog/comment',
        name: 'ProfileInfo',
        // component: () => import('@/views/profile/password'),
        component: () => import('@/views/sys/role/role-list'),
        meta: {
          title: '评论管理',
          icon: 'password',
          affix: false
        }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    // name: '系统管理',
    redirect: '/user/userList',
    meta: {
      title: '系统管理',
      icon: 'setting'
    },
    children: [
      {
        path: '/sys/user/userList',
        component: () => import('@/views/sys/user/user-list'),
        name: 'userList',
        meta: { title: '用户管理', icon: 'sys-user', affix: false }
      },
      {
        path: '/sys/menu/menuList',
        component: () => import('@/views/sys/menu/menu-list'),
        name: 'menuList',
        meta: { title: '菜单管理', icon: 'menu', affix: false }
      },
      {
        path: '/sys/role/roleList',
        component: () => import('@/views/sys/role/role-list'),
        name: 'roleList',
        meta: { title: '角色管理', icon: 'role', affix: false }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
