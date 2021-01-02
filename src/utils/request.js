import axios from 'axios'
import { MessageBox, Message} from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, //允许后台的cookie传递到前端
  timeout: 20000 //超时时间
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {//原来显示
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['authorization'] = getToken()

      // config.headers['authorization'] = 'Bearer ' + getToken()//原来显示
    }//原来显示
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 20000) {
      // if (document.getElementsByClassName('el-message').length === 0) {
        if (res.code === 401) {
          MessageBox.confirm('登录信息已过期，需要重新登录', 'Confirm logout', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        else if (res.code === 426) {
          Message({
            message: res.message,
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(error)
        }
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
