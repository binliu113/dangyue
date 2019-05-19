<template lang="html">
    <div class="app-tabbar">
        <nav class="tabbar">
            <ul class="tabbar-bar">
                <li class="tabbar-item" @click="loadHome" :class="type==1 || !type ? 'active' : ' ' ">
                    <span>首页</span>
                </li>
                <li class="tabbar-item" @click="loadHeed" :class="type==2 ? 'active' : ' ' ">
                    <span>关注</span>
                </li>
                <li class="tabbar-item">
                    <div class="item-icon" @click="uploadLink">
                        <span class="mui-icon mui-icon-plusempty"></span>
                    </div>
                </li>
                <li class="tabbar-item" @click="loadMessage" :class="type==3 ? 'active' : ' ' ">
                    <span>消息</span>
                </li>
                <li class="tabbar-item" @click="loadMyself" :class="type==4 ? 'active' : ' ' ">
                    <span>我</span>
                </li>
            </ul>
        </nav>
        <div class="tabbar-content">
            <div class="tabbar-home" v-show="type==1 || !type">
                <my-home></my-home>
            </div>
            <div class="tabbar-heed" v-if="type==2">
                <my-friend></my-friend>
            </div>
            <div class="tabbar-message" v-show="type==3">
                <my-message></my-message>
            </div>
            <div class="tabbar-myself" v-show="type==4">
                <my-myself></my-myself>
            </div>
        </div>
    </div>
</template>

<script>
import myHome from '@/components/Home.vue'
import myFriend from '@/components/Friend.vue'
import myMessage from '@/components/Message.vue'
import myMyself from '@/components/Myself.vue'
export default {
    data(){
        return{
            type:sessionStorage.getItem('tabbarCode')
        }
    },
    methods:{
        uploadLink() {
            if(!sessionStorage.getItem('uid')){
                this.$toast('请先登录')
                return;
            }
            this.$router.push('/upload');
        },
        loadMyself(){
           sessionStorage.setItem('tabbarCode',4);
            this.type=  sessionStorage.getItem('tabbarCode')
        },
        loadMessage(){
            sessionStorage.setItem('tabbarCode',3);
            this.type=  sessionStorage.getItem('tabbarCode')
        },
        loadHeed(){
           sessionStorage.setItem('tabbarCode',2);
            this.type=  sessionStorage.getItem('tabbarCode')
        },
        loadHome(){
            sessionStorage.setItem('tabbarCode',1);
            this.type=  sessionStorage.getItem('tabbarCode')
        }
    },
    components:{
        myHome,
        myFriend,
        myMessage,
        myMyself
    }
}
</script>

<style lang="css" scoped>
    .app-tabbar{
        padding-bottom: 3rem;
    }
    .app-tabbar .tabbar{
        position: fixed;
        width:100%;
        bottom: 0px;
        z-index: 1;
    }
    .app-tabbar .tabbar .tabbar-bar{
        display: flex;
        width:100%;
        margin:0;
        padding: 0;
        background: #000;
        justify-content: space-around;
    }
    .app-tabbar .tabbar .tabbar-bar .tabbar-item{
        padding: .7rem 0;
    }
    .app-tabbar .active{
        color:#fff;
    }
    .app-tabbar .item-icon{
        color: #000;
        background: #fff;
        border-radius: .5rem;
    }
</style>
