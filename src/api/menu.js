import request from '@/utils/request'

export function getFirstMenus(params) {
  return request({
    url: '/api/firstMenus',
    method: 'get',
    params
  })
}
