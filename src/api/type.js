import request from '@/utils/request'

export function getTypes(params) {
  return request({
    url: '/type/getTypes',
    method: 'get',
    params
  })
}

export function getList(params) {
  return request({
    url: "/type/getTypeList",
    method: 'get',
    params
  })
}

export function addType(data) {
  return request({
    url: '/type/addType',
    method: 'post',
    data
  })
}

export function deleteType(params) {
  return request({
    url: '/type/deleteType',
    method: 'delete',
    params
  })
}

export function deleteTypes(params) {
  return request({
    url: '/type/deleteTypes',
    method: 'delete',
    params
  })
}
