import request from '@/utils/request'

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

export function exportUsers(params) {
  return request({
    url: '/user/exportUserToExcel',
    method: 'get',
    params,
    headers: { "Content-type": "multipart/form-data" },
    responseType: "blob"
  })
}

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

export function addMenu(data) {
  return request({
    url: '/menu/addMenu',
    method: 'post',
    data
  })
}

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









