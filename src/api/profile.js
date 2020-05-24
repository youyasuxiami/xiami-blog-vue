import request from '@/utils/request'
/**
 * 获取个人信息
 * @param username 用户名
 */
export function info(username) {
  return request({
    url: '/api/profile/info/' + username,
    method: 'get'
  })
}

/**
 * 更新个人信息(参数一定要data，才是以json格式传送数据，不是data就是以字符串拼接的方式)
 * @param data
 */
export function update(data) {
  return request({
    url: '/api/profile/update',
    method: 'post',
    data
  })
}
