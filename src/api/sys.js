import request from '@/utils/request'

// 用户管理 START **********************
export function getList(params) {
  return request({
    url: "/user/searchList",
    method: 'get',
    params
  })
}
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export function updateUserStatus(params) {
  return request({
    url: '/user/updateUserStatus',
    method: 'post',
    params
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    params
  })
}

/**
 * 批量导入用户
 * @param params
 * @returns {AxiosPromise}
 */
export function addUsers(data) {
  return request({
    url: '/user/importExcel',
    method: 'post',
    headers: {"Content-type": "multipart/form-data"},
    data
  })
}

/**
 * 导出当前页数据
 * @param params
 * @returns {AxiosPromise}
 */
export function exportUsers(params) {
  return request({
    url: '/user/exportUserToExcel',
    method: 'get',
    params,
    headers: { "Content-type": "multipart/form-data" },
    responseType: "blob"
  })
}
/**
 * 导出全部数据
 * @param params
 * @returns {AxiosPromise}
 */
export function exportAllUsers(params) {
  return request({
    url: '/user/exportAllUserToExcel',
    method: 'get',
    params,
    headers: { "Content-type": "multipart/form-data" },
    responseType: "blob"
  })
}

/**
 * 批量删除用户
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteUsers(params) {
  return request({
    url: '/user/deleteUsers',
    method: 'get',
    params
  })
}

/**
 * 获取所有的角色
 * @param params
 * @returns {AxiosPromise}
 */
export function getRoles() {
  return request({
    url: '/user/getRoles',
    method: 'get',
  })
}

/**
 * 获取一个用户所拥有的的角色
 * @param params
 * @returns {AxiosPromise}
 */
export function getCheckedRoles(params) {
  return request({
    url: '/user/getCheckedRoles',
    method: 'get',
    params
  })
}

export function resetUser(params) {
  return request({
    url: '/user/resetUser',
    method: 'post',
    params
  })
}












// 用户管理 END **********************

// 菜单管理 START **********************
export function getMenuList(params) {
  return request({
    url: "/menu/menuList",
    method: 'get',
    params
  })
}

export function getRoleList(params) {
  return request({
    url: "/role/roleList",
    method: 'get',
    params
  })
}

/**
 * 添加菜单
 * @param data
 * @returns {AxiosPromise}
 */
export function addMenu(data) {
  return request({
    url: '/menu/addMenu',
    method: 'post',
    data
  })
}
/**
 * 删除一个菜单
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteMenu(params) {
  return request({
    url: '/menu/deleteMenu',
    method: 'get',
    params
  })
}
/**
 * 批量删除菜单
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteMenus(params) {
  return request({
    url: '/menu/deleteMenus',
    method: 'get',
    params
  })
}
// 菜单管理 END **********************

// 角色管理 START **********************
/**
 * 添加角色
 * @param data
 * @returns {AxiosPromise}
 */
export function addRole(data) {
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}

/**
 * 根据角色Id获取菜单列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getMenusByRoleId(params) {
  return request({
    url: '/role/getMenusByRoleId',
    method: 'get',
    params
  })
}

/**
 * 删除一个角色
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteRole(params) {
  return request({
    url: '/role/deleteRole',
    method: 'get',
    params
  })
}
// 角色管理 END **********************










