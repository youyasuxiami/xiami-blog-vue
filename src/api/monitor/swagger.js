import request from '@/utils/request'

// 查询服务器详细
export function getApiInfo() {
  return request({
    url: '/monitor/apiInfo',
    method: 'get'
  })
}




