<template lang="html">
    <div class="app-youself">
        <header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="outLink"></a>
			<h1 class="mui-title"></h1>
		</header>
        <div class="login-show">
            <div class="bg-box">
                <img :src="host+user.user_img" class="bg-img">
            </div>
            <div class="my-details">
                <div class="img-box">
                    <img :src="host+user.user_img" class="my-img">
                    <div class="btn-box">
                        <a href="javascript:;">
                            <span class="lbtn" @click="addFriend">添加好友</span>
                        </a>
                    </div>
                </div>
                <!-- 用户信息 -->
                <div class="details-user">
                    <h4 class="user-name" v-text="user.user_name"></h4>
                    <p class="user-title">@当悦号：{{user.phone}}</p>
                </div>
                <div class="icon-box">
                    <p v-text="user.signature">这个人很懒什么都没留下</p>
                    <span class="icon-item">西安</span>
                    <span class="icon-item">小哥哥</span>
                    <span class="icon-item">喜欢女,爱好女</span>
                </div>
                <div class="group">
                    <span class="group-item"><strong v-text="count">0</strong>获赞</span>
                    <span class="group-item"><strong>0</strong>关注</span>
                    <span class="group-item"><strong>0</strong>粉丝</span>
                </div>
                <ul class="list-navbar">
                    <li class="list-item" :class="navCode==true ? 'active': ' ' " @click="showWorks">
                        <span class="item-child">他的作品</span>
                    </li>
                    <li class="list-item" :class="navCode==false ? 'active': ' ' " @click="showLike">
                        <span class="item-child">他的收藏</span>
                    </li>
                </ul>
            </div>
            <div class="list-content">
                <div class="list-works" v-show="navCode">
                    <div class="works-list">
                        <!-- 作品类表 -->
                        <div class="works-item" v-for="item of list" v-if="list.length>0">
                            <router-link :to="'/works/'+item.lid" class="works-link">
                                <video :src="host+item.src" class="link-icon">
                                </video>
                            </router-link>
                            <div class="works-icon">
                                <span class="mui-icon-extra mui-icon-extra-heart-filled"></span>
                                <span>{{item.like_num}}赞</span>
                            </div>
                        </div>
                        <div class="works-hiden" v-if="list.length==0">
                            暂无作品...
                        </div>
                    </div>
                </div>
                <div class="list-keep" v-show="!navCode">
                    <div class="works-hiden">
                        暂无收藏...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['uid'],
    data(){
        return{
            host: this.host,
            navCode: true,      //navbar控制
            user:{},
            count:0,
            list:[],
        }
    },
    created(){
      var url = this.host+'user/details';
      this.axios.get(url,{
          params:{
              uid:this.uid
          }
      }).then(result=>{
            this.$indicator.open('加载中...');
            var user = result.data.user;
            this.user = result.data.user;
            this.count = result.data.count;
            this.list = result.data.data;
            var time = setTimeout(()=>{
                this.$indicator.close();
                clearTimeout(time);
            })
      })
    },
    methods:{
        outLink() {
            this.$router.back(-1);
        },
        addFriend() {
            var url  = this.host+'user/add';
            this.axios.get(url,{
                params: {
                    user_id:this.uid
                }
            }).then((result)=>{
                if(result.data.code==1){
                    this.$toast('添加成功')
                }else if(result.data.code==-1){
                    this.$toast('未能添加成功')
                }else if(result.data.code==-2){
                    this.$toast('您还未登录')
                }else if(result.data.code==-3){
                    this.$toast('该用户已是您的好友')
                }
            })
        },
        showWorks() {
            this.navCode = true;
        },
        showLike() {
            this.navCode = false;
        }
    }
}
</script>

<style lang="css" scoped>
/* 提示样式 */
/* .app-youself .Toast{
    width: 100%;
    color: #fff;
    text-align: center;
    background-image: linear-gradient(91deg, rgb(2, 0, 49) 0px, rgb(109, 51, 83) 140%);
    justify-content: center;
    flex-direction: column;
    display: flex;
    position: fixed;
    top: 0;
}
.app-youself .toast-box{
    padding-top: 1rem;
    margin: 0 auto;
    width: 10rem;
    background: rgba(0, 0, 0, .5);
    border-radius: .5rem;
    display: inline-block;
} */
/* 主样式 */
.app-youself .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-youself .bg-box{
    width: 100%;
    height: 12rem;
    border-bottom: .1rem solid rgba(0, 0, 0, .5);
}
.app-youself .bg-box .bg-img{
    width: 100%;
    height:100%;
}
.app-youself .my-details{
    background: rgba(0, 0, 0, .5);
    padding: 0rem 1rem;
    padding-top: 6rem;
    position: relative;
}
.app-youself .my-details .img-box{
    width: 100%;
    height: 7rem;
    position: absolute;
    top: -1.5rem;
}
.app-youself .my-details .my-img{
    width: 7rem;
    height: 100%;
    border: .2rem solid rgba(0, 0, 0, .5);
    border-radius: 50%;
}
.app-youself .my-details .btn-box{
    display: inline-block;
    position: absolute;
    top: 2.3rem;
    right: 4rem;
}
.app-youself .my-details .lbtn{
    font-size: 17px;
    color: #fff;
    background: #e91e63;
    border-radius: .0rem;
    padding: .5rem 1.5rem;
}
.app-youself .my-details .details-user{
    border-bottom: .05rem solid rgba(102,102,102,.5);
    margin-bottom: .5rem;
}
.app-youself .my-details .user-name{
    color: #fff;
    margin: .5rem 0;
}
.app-youself .my-details .user-title{
    font-size: 10px;
    color: #fff;
}
.app-youself .my-details .icon-box .icon-item{
    font-size: 10px;
    margin: 0 .2rem;
    padding: .3rem .5rem;
    border-radius: .2rem;
    background: rgba(102,102,102,.5);
}
.app-youself .my-details .group{
    margin: 1rem 0;
}
.app-youself .my-details .group-item{
    margin: .5rem;
    color: #fff;
    font-size: 16px;
}
.app-youself .list-navbar{
    padding: 0;
    margin-bottom: 0;
    list-style: none;
    display: flex;
    justify-content: center;
}
.app-youself .list-item{
    padding: .5rem;
}
.app-youself .list-item.active{
    color: #fff;
    border-bottom: 1px solid #ffc107;
}
.app-youself .list-content{
    margin-top: .1rem;
}
.app-youself  .list-content .works-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.app-youself .list-content .works-list .works-item{
    width: 49.5%;
    height: 12rem;
    background: #000;
    margin-bottom: .1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.app-youself .works-hiden{
    width: 100%;
    height: 5rem;
    text-align: center;
    padding: 1.5rem;
}
.app-youself .list-content .works-list .works-link,.list-content .works-list .works-link .link-icon{
    width: 100%;
    display: block;
}
.app-youself .list-content .works-list .works-icon{
    color: #fff;
    font-size: 16px;
    position: absolute;
    left: .5rem;
    bottom: .5rem;
}
</style>
