import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(urls, route) {
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.urls.includes(role))
  // } else {
  //   return false
  // }
  if (urls) {
    return urls.includes(route.path)
    // return urls.some(ulr => route.url==ulr)
  } else {
    return false
  }
}

/**
 * 根据角色筛选菜单
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, urls) {
  const res = []
// routes代表所有的菜单
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(urls, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, urls)
      }
      //把符合角色的菜单过滤出来
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

/**
 * 获取要显示的菜单
 * @type {{generateRoutes({commit: *}, *=): *}}
 */
const actions = {
  generateRoutes({ commit }, urls) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   //获取符合角色的菜单（要显示出来的菜单）：参数：所有菜单、该登录用户拥有的角色
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      accessedRoutes = filterAsyncRoutes(asyncRoutes, urls)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
