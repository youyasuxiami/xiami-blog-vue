import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
    // ,
    // params: { access_token: token }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    params: {token}

  })
}

export function getList(params) {
  return request({
    url: '/api/profile/users',
    method: 'get',
    params
  })
}

export function fetchList(query) {
  return request({
    url: '/api/profile/users',
    method: 'get',
    params: query
  })
}

