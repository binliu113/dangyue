import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Works from './views/Works.vue'
import Kind from './views/Kind.vue'
import Tabbar from './views/Tabbar.vue'  //index 1
import Friend from './views/Friend.vue'  //index 2
import Message from './views/Message.vue'   //index3
import Myself from './views/Myself.vue'     //index4
import Chatroom from './views/Chatroom'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Tabbar},
    {path:'/index',component:Tabbar},
    {path:'/login',component:Login},
    {path:'/kind/:kid',component:Kind,props:true},
    {path:'/works/:userId', component:Works,props:true},
    {path:'/friend',component:Friend},
    {path:'/chatroom',component:Chatroom},
    {path:'/message',component:Message},
    {path:'/myself',component:Myself}
  ]
})
