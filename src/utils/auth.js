import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { path: '/', domain: process.env.VUE_APP_DOMAIN, expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey, { path: '/', domain: process.env.VUE_APP_DOMAIN })
}
