import request from '@/utils/request'

// 用户管理 START **********************
export function getJobList(params) {
  return request({
    url: "/monitor/job/getJobList",
    method: 'get',
    params
  })
}
export function addUpdateJob(data) {
  return request({
    url: '/monitor/job/addUpdateJob',
    method: 'post',
    data
  })
}

export function updateUserStatus(params) {
  return request({
    url: '/user/updateUserStatus',
    method: 'post',
    params
  })
}

export function deleteJob(params) {
  return request({
    url: '/monitor/job/deleteJob',
    method: 'delete',
    params
  })
}

/**
 * 批量删除用户
 * @param params
 * @returns {AxiosPromise}
 */
export function deleteJobs(params) {
  return request({
    url: '/monitor/job/deleteJobs',
    method: 'delete',
    params
  })
}

/**
 * 开启定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function startJob(data) {
  return request({
    url: '/monitor/job/startJob',
    method: 'post',
    data
  })
}

/**
 * 暂停定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function stopJob(data) {
  return request({
    url: '/monitor/job/stopJob',
    method: 'post',
    data
  })
}

/**
 * 恢复定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function resumeJob(data) {
  return request({
    url: '/monitor/job/resumeJob',
    method: 'post',
    data
  })
}


