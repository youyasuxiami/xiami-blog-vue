import request from '@/utils/request'

export function getTags(params) {
  return request({
    url: '/tag/getTags',
    method: 'get',
    params
  })
}
export function getList(params) {
  return request({
    url: "/tag/getTagList",
    method: 'get',
    params
  })
}


export function addTag(data) {
  return request({
    url: '/tag/addTag',
    method: 'post',
    data
  })
}

export function deleteTag(params) {
  return request({
    url: '/tag/deleteTag',
    method: 'delete',
    params
  })
}

export function deleteTags(params) {
  return request({
    url: '/tag/deleteTags',
    method: 'delete',
    params
  })
}

/**
 * 获取一个博客所拥有的的标签
 * @param params
 * @returns {AxiosPromise}
 */
export function getCheckedTags(params) {
  return request({
    url: '/tag/getCheckedTags',
    method: 'get',
    params
  })
}

