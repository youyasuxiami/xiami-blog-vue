import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/searchlist',
    method: 'post',
    data: params
  })
}



