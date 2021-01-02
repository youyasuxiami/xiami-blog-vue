import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}

// export function getInfo(token) {
export function getInfo(params) {
  return request({
    url: '/info',
    method: 'get',
    params
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

export function getPublicKey() {
  return request({
    url: '/getPublicKey',
    method: 'get',
  })
}


export function getCaptcha(params) {
  return request({
    url: '/captcha.jpg',
    method: 'get',
    params
  })
}



