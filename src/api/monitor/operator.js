import request from '@/utils/request'

// 用户管理 START **********************
export function getOperatorLogList(params) {
  return request({
    url: "/monitor/operator/getOperatorLogList",
    method: 'get',
    params
  })
}

// 删除日志
export function deleteLog(params) {
  return request({
    url: '/monitor/operator/deleteLog',
    method: 'delete',
    params
  })
}

/**
 * 批量删除日志
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteLogs(params) {
  return request({
    url: '/monitor/operator/deleteLogs',
    method: 'delete',
    params
  })
}

