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




