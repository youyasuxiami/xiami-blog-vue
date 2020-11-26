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



export function addBlog(data) {
  return request({
    url: '/blog/addBlog',
    method: 'post',
    data
  })
}

//更新文章来源
export function changeShareStatement(params) {
  return request({
    url: "/blog/changeShareStatement",
    method: 'put',
    params
  })
}
//更新赞赏
export function changeAppreciation(params) {
  return request({
    url: "/blog/changeAppreciation",
    method: 'put',
    params
  })
}

//更新评论
export function changeCommentabled(params) {
  return request({
    url: "/blog/changeCommentabled",
    method: 'put',
    params
  })
}

export function deleteBlog(params) {
  return request({
    url: '/blog/deleteBlog',
    method: 'delete',
    params
  })
}

export function deleteBlogs(params) {
  return request({
    url: '/blog/deleteBlogs',
    method: 'delete',
    params
  })
}

export function addPhoto(data) {
  return request({
    url: '/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}










