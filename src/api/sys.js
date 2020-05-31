import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sys/user/searchlist',
    method: 'post',
    data: params
  })
}



