import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {getTypeValue,formatDate,selectDictLabel} from "@/utils/dictionary";

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(mavonEditor)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
// 全局方法挂载
Vue.prototype.getTypeValue = getTypeValue
Vue.prototype.formatDate = formatDate
Vue.prototype.selectDictLabel = selectDictLabel

/**
 * 管道：时间格式化
 */
Vue.filter("FormatDate", function(date, fmt) {
  return formatDate(date, fmt);
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})




