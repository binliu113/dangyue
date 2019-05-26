import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/mint-ui.common.js'
import './lib/mui/css/icons-extra.css'
import './lib/mui/css/mui.css'
import MintUi from 'mint-ui' //导入mint ui 所有组件
import Vuex from 'vuex'
//axios  key允许跨域
axios.defaults.withCredentials = true
//post上传文件
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=utf-8';
Vue.prototype.axios = axios     //将axios添加至原型对象
Vue.config.productionTip = false
Vue.use(MintUi)  //引用mint ui
Vue.use(Vuex)    //引用vuex
//保存地址http://192.168.0.103:8080/
Vue.prototype.host = "http://192.168.0.103:3000/";
Vue.prototype.ws = "ws://192.168.0.103:3001/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
