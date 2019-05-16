import Vue from 'vue'
import Router from 'vue-router'
import Works from './views/Works.vue'
import Kind from './views/Kind.vue'
import Tabbar from './views/Tabbar.vue'  //index
import Chatroom from './views/Chatroom'
import WorksList from './components/WorksList'
import Youself from './views/Youself'
import Upload from './views/upload';
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Tabbar},
    {path:'/index',component:Tabbar},
    {path:'/upload',component:Upload},
    {path:'/youself/:uid', component:Youself,props:true},
    {path:'/kind/:kid',component:Kind,props:true},
    {path:'/works/:lid', component:Works,props:true},
    {path:'/chatroom',component:Chatroom},
    {path:'/test',component:WorksList}
  ]
})
