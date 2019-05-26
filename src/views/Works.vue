<template lang="html">
	<div class="app-works" v-if="wDetails">
		<header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="outLink"></a>
			<h1 class="mui-title"></h1>
		</header>
		<div class="works-body" :style="{height:(curHeight)+'px'}" @click="hidenAndPlay">
			<div class="video-box" :style="videobg">
				<div >
					<video :src="host+wDetails.src" class="video" loop></video>
				</div>
				<img src="/icon-img/play.png" alt="" class="video-icon" :style="playStyle">
				<ul class="works-icon">
					<li class="icon-round">
						<img :src="host+wDetails.user_pic" alt="" class="icon-img" @click="userLink($event,wDetails.uid)">
					</li>
					<li class="icon-cell">
						<span class="mui-icon-extra mui-icon-extra-heart-filled icon-item like-style" @click="likeClick" :style="likeStyle" id="anms"></span>
						<p v-text="wDetails.like_num"></p>
					</li>
					<li class="icon-cell" @click="showCmt">
						<span class="mui-icon mui-icon-chatbubble icon-item"></span>
						<p>评论</p>
					</li>
					<li class="icon-cell" @click="showForward">
						<span class="mui-icon mui-icon-redo icon-item"></span>
						<p>转发</p>
					</li>
				</ul>
			</div>
		</div>
		<div>
			<div class="works-comment" :style="cmtStyle">
				<div class="comment">
					<nav class="nav-bar">
						<table></table>
						<h5 class="nav-title">{{cmtCount}}条评论</h5>
						<span class="mui-icon mui-icon-arrowdown nav-icon" @click="hidenAndPlay"></span>
					</nav>
					<ul class="cmt-content">
						<li class="content-item" v-if="cmtList.length>0" v-for="item of cmtList">
							<img :src="host+item.user_img" alt="" class="content-img">
							<div class="width-75">
								<p class="content-name">@{{item.user_name}}</p>
								<span class="z-content" v-text="item.content"></span>
							</div>
						</li>
					</ul>
					<nav class="comt-input">
						<input type="text" class="input-size" v-model="cmtContent">
						<button type="button" class="btn-size" @click="cmtSend">@评论</button>
					</nav>
				</div>
			</div>
		</div>
		<div>
			<div class="works-Forward" :style="forwardStyle">
				<div class="forward-title">分享到</div>
				<ul class="forward-list">
					<li class="fList-item">
						<span class="mui-icon mui-icon-undo undo-bg"></span>
						<p>转发</p>
					</li>
					<li class="fList-item">
						<span class="mui-icon mui-icon-weixin weixin-bg"></span>
						<p>微信</p>
					</li>
					<li class="fList-item">
						<span class="mui-icon mui-icon-pengyouquan pengyouquan-bg"></span>
						<p>朋友圈</p>
					</li>
					<li class="fList-item">
						<span class="mui-icon mui-icon-starhalf starhalf-bg"></span>
						<p>QQ空间</p>
					</li>
				</ul>
				<ul class="forward-list">
					<li class="fList-item">
						<span class="mui-icon mui-icon-compose iconD"></span>
						<p>举报</p>
					</li>
					<li class="fList-item">
						<span class="mui-icon mui-icon-download iconD"></span>
						<p>保存到本地</p>
					</li>
					<li class="fList-item">
						<span class="mui-icon mui-icon-star iconD"></span>
						<p>收藏</p>
					</li>
					<li class="fList-item">
						<span class="mui-icon mui-icon-chatboxes iconD"></span>
						<p>私信好友</p>
					</li>
				</ul>
				<div class="" @click="hidenForward">
					取消
				</div>
			</div>
		</div>
		<div class="works-detail">
			<div class="detail-box">
				<div class="box-left">
					<router-link :to="`/youself/${wDetails.uid}`" class="router-link">
						<img :src="host+wDetails.user_pic" class="user-img"/>
						<span class="uname-text">@用户/ <span v-text="wDetails.user_name">名在这里展示</span></span>
					</router-link>
					<p class="kind-text">@类型 / <span v-text="wDetails.kind"></span></p>
					<p class="title-text">@/ <span v-text="wDetails.title">这里展示s标题的内容</span></p>
				</div>
				<div class="box-right" :style="boxRightStyle">
					<img :src="host+wDetails.user_pic" alt="" class="right-img">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['lid'],
		data(){
			return{
				host: this.host,
				cmtList:[],
				cmtCount:0,
				cmtContent: '',
				wDetails:{},   //接受详情数据对象
				boxRightStyle: {
					transform: true,
					transition: true
				},
				playStyle: {
					opacity: true,
					transform: true
				},
				// setCode: true,
				videobg: {
					hegith: true
				},
				curHeight: document.documentElement.clientHeight,
				cmtStyle: {		//评论样式
					bottom: true
				},
				likeStyle: {	//点赞样式
					color: true,
					opacity: true,
					transform: true
				},
				forwardStyle: {		//分享样式
					bottom: true
				},
				likeCode: true,	//点赞状态
				cmtCode: false,		//评论状态
				forwardCode: false	//分享状态
			}
		},
		created(){
			this.videobg.height = this.curHeight+'px';
			this.loadData();
			this.loadComment();
		},
		methods:{
			cmtSend() {
				if(!this.cmtContent) return;
				var url = this.host+'user/insetcmt?lid='+this.lid+'&content='+this.cmtContent;
				this.axios.get(url,{
					params: {}
				}).then((result)=>{
					this.cmtContent = '';
					if(result.data.code==-2) this.$toast('您未登录');
					if(result.data.code==-1) this.$toast('评论失败');
					if(result.data.code==1){
						this.$toast('评论成功');
						this.loadComment()
					}
				})
			},
			loadComment() {
				var url = this.host+'user/comment?lid='+this.lid
				this.axios.get(url,{
					params: {}
				}).then((result)=>{
					this.cmtList = result.data.data;
					this.cmtCount = result.data.count;
				})
			},
			outLink() {
				this.$router.back(-1);
			},
			//更新like_num;
			updateLike(like) {
				var url = this.host+'worksList/like';
				this.axios.get(url,{
					params: {
						like_num: like,
						lid: this.lid
					}
				}).then((result)=>{
					// console.log(result);
					//返回 1 正确
				})
			},
			//作品初始数据
			loadData() {
				this.$indicator.open('努力呈现中...');
				var url = this.host+'worksList/details';
				this.axios.get(url,{
					params: { lid: this.lid }
				}).then((result)=>{
					this.wDetails = result.data.data[0];
					var time = setTimeout(()=>{
                        this.$indicator.close();
                        clearTimeout(time);
                    })
				})
			},
			//用户详情跳转
			userLink(e,uid) {
				e.stopPropagation();
				this.$router.push('/youself/'+uid)

			},
			//隐藏分享
			hidenForward() {
				this.forwardCode = false;
				this.forwardStyle.bottom = -20+'rem';
			},
			//显示分享
			showForward(e) {
				e.stopPropagation()
				this.forwardCode = true;
				this.setCode = false;
				this.forwardStyle.bottom = 0+'rem';
			},
			//点赞效果
			likeClick(e) {
				e.stopPropagation();
				if(this.likeCode){
					this.likeStyle.color = '#fff';
					this.likeStyle.opacity = .1
					this.likeStyle.transform = 'scale(0)';
					setTimeout(()=>{
							this.likeStyle.color = '#e91e63';
							this.likeStyle.opacity = 1
							this.likeStyle.transform = 'scale(1)';
					},500)
					this.likeCode = false;
					//更新数据库
					this.wDetails.like_num++;
					this.updateLike(this.wDetails.like_num)		//更新
				}else{
					this.likeStyle.opacity = .5;
					this.likeStyle.transform = 'scale(.5)';
					setTimeout(()=>{
						this.likeStyle.opacity = 1;
						this.likeStyle.transform = 'scale(1)';
						this.likeStyle.color = '#fff';
					})
					this.likeCode = true;
					//更新数据库
					this.wDetails.like_num--;
					this.updateLike(this.wDetails.like_num)		//更新
				}
			},
			//显示评论界面
			showCmt(e) {
				e.stopPropagation()
				this.cmtCode = true;
				this.setCode = false;
				this.cmtStyle.bottom = 0+'rem';
			},
			//隐藏评论、分享状态/播放暂停
			hidenAndPlay(e) {
				e.stopPropagation();
				//隐藏评论
				if(this.cmtCode){
					this.cmtCode = false;
					this.setCode = true;
					this.cmtStyle.bottom = -26+'rem';
					return;
				}
				//隐藏分享
				if(this.forwardCode){
					this.forwardCode = false;
					this.setCode = true;
					this.forwardStyle.bottom = -20+'rem';
					return;
				}
				//播放暂\停
				if(!this.cmtCode && !this.forwardCode){
					var video = document.querySelector('video');
					var time = (video.duration)/5
					if(video.paused){
						//播放
						//播放动画1
						this.playStyle.opacity = 0
						this.playStyle.transform = 'scale(1.5)';
						video.play();
						// this.setCode = false;
					}else{
						//暂停
						this.playStyle.opacity = .3;
						this.playStyle.transform = 'scale(1)';
						video.pause();
						// this.setCode = true;
						this.boxRightStyle.transition = 0;
						this.boxRightStyle.transform = 'rotate(0deg)'
					}
				}
			}
		}
	}
</script>
<style scoped>
.app-works{
	position: relative;
	overflow: hidden;
}
.app-works .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-works .mui-bar-transparent h1{
	color: #fff;
}
.app-works .works-body{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.app-works .video-box{
	height: 25rem;
	background: rgba(0,0,0,.5);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
}
.app-works .video{
	width:100%;
}
.app-works .video-icon{
	width: 3.5rem;
	height: 3.5rem;
	margin-top: -1.5rem;
	margin-left: -1.5rem;
	opacity: .3;
	position: absolute;
	top:50%;
	left: 50%;
	transition: .5s;
}
.app-works .works-icon{
	width: 2.4rem;
	height: 13rem;
	padding-left: 0rem;
	margin-bottom: 0rem;
	box-sizing: border-box;
	position: absolute;
	right: 1.1rem;
	bottom: 13rem;
}
.app-works .works-icon .icon-cell{
	margin: 1.2rem 0rem;
	text-align: center;
	border-radius: 50%;
}
.app-works .works-icon .icon-cell p{
	color: #fff;
}
.app-works .works-icon .icon-round{
	width: 3rem;
	height: 3rem;
	border: .1rem solid #e91e63;
	border-radius: 50%;
	box-sizing: border-box;
	position: absolute;
	top: -4rem;
	right: -.5rem;
}
.app-works .works-icon .icon-round .icon-img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.app-works .works-icon .icon-item{
	font-size: 40px;
	color: #fff;
}
.app-works .like-style{
	transition: .5s;
	color: #fff;
	opacity: 1;
	transform:scale(1);
	border-radius: 50%;
}
.app-works .works-comment,
.app-works .works-comment .comment,
.app-works .works-comment .nav-bar{
	border-top-left-radius: .5rem;
	border-top-right-radius: .5rem;
}
.app-works .works-comment{
	width: 100%;
	height: 26rem;
	background: #fff;
	overflow: auto;
	position: absolute;
	transition: .5s;
	bottom: -26rem;
	z-index: 1;
}
.app-works .works-comment .comment{
	position: relative;
}
.app-works .works-comment .nav-bar{
	text-align: center;
	padding: .3rem 0rem;
	background: #fff;
	position:sticky;
	top: 0;
}
.app-works .works-comment .comt-input{
	width: 100%;
	display: flex;
	justify-content: space-between;
	position:fixed;
	bottom: 0;
}
.app-works .works-comment .input-size{
	width: 80%;
	padding: .1rem;
	padding: 0 .5rem;
	margin: 0;
	color: #000;
}
.app-works .works-comment .btn-size{
	width: 20%;
	background: #13b9ce;
}
.app-works .nav-title,
.app-works .nav-icon{
	color: #000;
	font-weight: bold;
}
.app-works .nav-title{
	padding: .1rem 0rem;
	display: inline;
}
.app-works .nav-icon{
	font-size: 20px;
	position: absolute;
	right:1rem;
}
.app-works .cmt-content{
	padding:0;
	margin:0;
	padding-bottom: 2rem;
}
.app-works .cmt-content .content-img{
	width: 3rem;
	height: 3rem;
	margin: 0 .5rem;
	border-radius: 50%;
}
.app-works .cmt-content .content-item{
	display: flex;
	justify-content: flex-start;
	margin-bottom: 1rem;
}
.app-works .cmt-content .width-75{
	width:75%;
}
.app-works .cmt-content .content-name{
	color: #000;
	font-size: 15px;
	margin:0;
}
.app-works .cmt-content .z-content{
	font-size: 14px;
}
.app-works .works-Forward{
	width: 100%;
	height: 20rem;
	padding: 0rem .5rem;
	text-align: center;
	background: #fff;
	position: absolute;
	transition: .5s;
	bottom: -20rem;
	z-index: 1;
}
.app-works .works-Forward,
.app-works .forward-title{
	border-top-right-radius: .5rem;
	border-top-left-radius: .5rem;
}
.app-works .forward-title{
	color: #000;
	font-size: 15px;
	font-weight: bold;
	padding: .5rem 0rem;
}
.app-works .forward-list{
	padding: .5rem 0;
	border-bottom: 1px solid rgba(0,0,0,0.1);
	display: flex;
	justify-content: space-around;
}
.app-works .forward-list .fList-item{
	width: 25%;
	color: #555;
}
.app-works .fList-item .mui-icon{
	padding: .8rem;
	margin-bottom: .5rem;
	border-radius: 50%;
	color: #fff;
	background: rgba(0,0,0,0.5);
}
.app-works .forward-list .undo-bg{
	background: #e3cd13;
}
.app-works .forward-list .weixin-bg{
	background: #20c427;
}
.app-works .forward-list .pengyouquan-bg{
	background: #13a519;
}
.app-works .forward-list .starhalf-bg{
	background: #dede0aeb;
}
.app-works .works-detail{
	height: 10rem;
	width: 100%;
	padding: 1rem;
	background: transparent;
	position: absolute;
	bottom: 0rem;
}
.app-works .works-detail .detail-box{
	height: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	position: relative;
}
.app-works .works-detail .detail-box .box-left{
	width: 60%;
}
.app-works .works-detail .router-link{
	display: inline-block;
	padding: .5rem 0;
}
.app-works .works-detail .user-img{
	width: 2.5rem;
	height: 2.5rem;
	border: .04rem solid #fff;
	border-radius: 50%;
}
.app-works .works-detail .uname-text{
	width: 100%;
	color: #fff;
	padding: 0rem .5rem;
	overflow: hidden;
	white-space:nowrap;
}
.app-works .works-detail .kind-text{
	margin:0;
}
.app-works .works-detail .title-text{
	width: 100%;
	height: 4rem;
	margin: 0;
	overflow: hidden;
	white-space: wrap;
}
.app-works .works-detail .box-right{
	background: #000;
	padding: .7rem;
	border: .04rem solid #fff;
	border-radius: 50%;
	transition: 5s;
	position: absolute;
	right: 0rem;
	bottom: .5rem;
}
.app-works .works-detail .box-right .right-img{
	width: 1.7rem;
	height: 1.7rem;
	border-radius: 50%;
	vertical-align: middle;
}
</style>
