import request from '@/utils/request'

// 查询服务器详细
export function getRedis() {
  return request({
    url: '/monitor/redis',
    method: 'get'
  })
}




