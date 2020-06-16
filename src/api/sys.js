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






