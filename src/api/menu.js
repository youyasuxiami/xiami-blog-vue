import request from '@/utils/request'

export function getFirstMenus(params) {
  return request({
    url: '/api/firstMenus',
    method: 'get',
    params
  })
}
export function getMenusByFirstMenuId(params) {
  return request({
    url: '/info',
    method: 'get',
    params
  })
}

