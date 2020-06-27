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







