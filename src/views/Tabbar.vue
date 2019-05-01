<template lang="html">
    <div class="app-tabbar">
        <nav class="tabbar">
            <ul class="tabbar-bar">
                <li class="tabbar-item" @click="loadHome" :class="type==1 ? 'active' : ' ' ">
                    <span>首页</span>
                </li>
                <li class="tabbar-item" @click="loadHeed" :class="type==2 ? 'active' : ' ' ">
                    <span>关注</span>
                </li>
                <li>
                    <span class="mui-icon mui-icon-plusempty"></span>
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
            <div class="tabbar-home" v-if="type===1">
                <my-home></my-home>
            </div>
            <div class="tabbar-heed" v-if="type===2">
                <h1>这是关注页</h1>
            </div>
            <div class="tabbar-message" v-if="type===3">
                <h1>这是消息页</h1>
            </div>
            <div class="tabbar-myself" v-if="type===4">
                <h1>我的页面</h1>
            </div>
        </div>
    </div>
</template>

<script>
import myHome from '@/components/Home.vue'
export default {
    data(){
        return{
            type:1
        }
    },
    methods:{
        loadMyself(){
            this.type=4

        },
        loadMessage(){
            this.type=3
        },
        loadHeed(){
            this.type=2
        },
        loadHome(){
            this.type=1
        }
    },
    components:{
        myHome
    }
}
</script>

<style lang="css" scoped>
    .app-tabbar .tabbar{
        position: fixed;
        width:100%;
        bottom: 0px;
        z-index: 1;
    }
    .app-tabbar .tabbar>.tabbar-bar{
        display: flex;
        width:100%;
        margin:0;padding:0.7rem 0;
        background: #000;
        justify-content: space-around;
    }
    .app-tabbar .active{
        color:#fff;
    }
</style>
