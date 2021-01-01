import request from '@/utils/request'

export function getList(params) {
  return request({
    url: "/comment/getComments",
    method: 'get',
    params
  })
}

export function updateCommentStatus(params) {
  return request({
    url: '/comment/updateCommentStatus',
    method: 'post',
    params
  })
}

/**
 * 获得举报信息列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getCommentReportList(params) {
  return request({
    url: "/comment/getCommentReportList",
    method: 'get',
    params
  })
}

/**
 * 更新进展状态
 * @param data
 * @returns {AxiosPromise}
 */
export function updateProgressStatusName(params) {
  return request({
    url: '/comment/updateProgressStatusName',
    method: 'post',
    params
  })
}


















