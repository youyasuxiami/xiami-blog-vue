import request from '@/utils/request'

// 用户管理 START **********************
export function getJobList(params) {
  return request({
    url: "/monitor/getJobList",
    method: 'get',
    params
  })
}
export function addUpdateJob(data) {
  return request({
    url: '/monitor/addUpdateJob',
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

export function deleteJob(params) {
  return request({
    url: '/monitor/deleteJob',
    method: 'delete',
    params
  })
}

/**
 * 批量删除用户
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteJobs(params) {
  return request({
    url: '/monitor/deleteJobs',
    method: 'delete',
    params
  })
}

/**
 * 开启定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function startJob(data) {
  return request({
    url: '/monitor/startJob',
    method: 'post',
    data
  })
}

/**
 * 暂停定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function stopJob(data) {
  return request({
    url: '/monitor/stopJob',
    method: 'post',
    data
  })
}

/**
 * 恢复定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function resumeJob(data) {
  return request({
    url: '/monitor/resumeJob',
    method: 'post',
    data
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










