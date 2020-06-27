import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
export function getInfo() {
  return request({
    url: '/info',
    method: 'get',
    // ,
    // params: { access_token: token }
  })
}

export function logout(token) {
  return request({
    url: '/logout',
    method: 'post',
    params: {token}

  })
}


