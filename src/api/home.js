import request from '@/utils/request'

/**
 * 获得本月新增用户数和今日在线数
 * @returns {AxiosPromise}
 */
export function getAddNumAndOnlineNum() {
  return request({
    url: "/home/getNumAndOnlineNum",
    method: 'get',
  })
}

/**
 * 获得所有文章类别和对应的文章数
 * @returns {AxiosPromise}
 */
export function getBlogTypeAndNum() {
  return request({
    url: "/home/getBlogTypeAndNum",
    method: 'get',
  })
}

/**
 * 获得所有文章标签和对应的文章数
 * @param params
 * @returns {AxiosPromise}
 */
export function getBlogTagAndNum() {
  return request({
    url: "/home/getBlogTagAndNum",
    method: 'get',
  })
}

/**
 * 获得热门类别和对应的文章数
 * @param params
 * @returns {AxiosPromise}
 */
export function getHotBlogTypeAndNum() {
  return request({
    url: "/home/getHotBlogTypeAndNum",
    method: 'get',
  })
}

/**
 * 获得操作日志列表数据
 * @returns {AxiosPromise}
 */
export function getOperLogList() {
  return request({
    url: "/home/getOperLogList",
    method: 'get',
  })
}

/**
 * 获得最受欢迎十大作者和对应的文章数
 * @returns {AxiosPromise}
 */
export function getHotAuthorAndNum() {
  return request({
    url: "/home/getHotAuthorAndNum",
    method: 'get',
  })
}




export function getList(params) {
  return request({
    url: "/blog/getBlogs",
    method: 'get',
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








