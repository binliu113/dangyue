<template lang="html">
	<div class="app-works">
		<header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">推荐 | 西安</h1>
		</header>
		<div class="works-body" :style="{height:(curHeight)+'px'}" @click="hidenCmt">
			<div class="video-box">
				<video src="http://127.0.0.1:3000/video/food/01.mp4" class="video"></video>
				<img src="/icon-img/play.png" alt="" class="video-icon">
				<ul class="works-icon">
					<li class="icon-round">
						<img src="icon-img/WX.jpg" alt="" class="icon-img">
					</li>
					<li class="icon-cell">
						<span class="mui-icon-extra mui-icon-extra-heart-filled icon-item like-style" @click="likeClick" :style="likeStyle" id="anms"></span>
						<p>11w</p>
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
						<h5 class="nav-title">65 条评论</h5>
						<span class="mui-icon mui-icon-arrowdown nav-icon" @click="hidenCmt"></span>
					</nav>
					<div>
						<div class="" style="text-align: center;">
							<h3>该功能未开放，敬请期待...</h3>
						</div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</div>
			</div>
		</div>
		<div class="">
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
				<div class="">
					取消
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

		},
		methods:{
			showForward(e) {
				e.stopPropagation()
				this.forwardStyle.bottom = 0+'rem';
				this.forwardCode = true;
			},
			//点赞效果
			likeClick() {
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
				}else{
					this.likeStyle.opacity = .5;
					this.likeStyle.transform = 'scale(.5)';
					setTimeout(()=>{
						this.likeStyle.opacity = 1;
						this.likeStyle.transform = 'scale(1)';
						this.likeStyle.color = '#fff';
					})
					this.likeCode = true;
				}
			},
			//显示评论界面
			showCmt(e) {
				e.stopPropagation()
				this.cmtStyle.bottom = 0+'rem';
				this.cmtCode = true;
			},
			//隐藏评论、分享状态
			hidenCmt(e) {
				e.stopPropagation();
				if(this.cmtCode){
					this.cmtStyle.bottom = -20+'rem';
					this.cmtCode = false;
				}
				if(this.forwardCode){
					this.forwardStyle.bottom = -16+'rem';
					this.forwardCode = false;
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
	background: #000;
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
	width: 3rem;
	height: 3rem;
	margin-top: -1.5rem;
	margin-left: -1.5rem;
	opacity: .3;
	position: absolute;
	top:50%;
	left: 50%;
}
.app-works .works-icon{
	width: 2.4rem;
	height: 13rem;
	padding-left: 0rem;
	margin-bottom: 0rem;
	box-sizing: border-box;
	position: absolute;
	right: 1rem;
	bottom: 4rem;
}
.app-works .works-icon .icon-cell{
	margin: .5rem 0rem;
	text-align: center;
	border-radius: 50%;
}
.app-works .works-icon .icon-cell p{
	color: #fff;
}
.app-works .works-icon .icon-round{
	width: 2.5rem;
	height: 2.5rem;
	box-sizing: border-box;
	position: absolute;
	top: -4rem;
	right: -.1rem;
}
.app-works .works-icon .icon-round .icon-img{
	width: 100%;
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
	height: 20rem;
	background: #fff;
	overflow: auto;
	position: absolute;
	transition: .5s;
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
.app-works .works-Forward{
	width: 100%;
	height: 15.5rem;
	padding: 0rem .5rem;
	text-align: center;
	background: #fff;
	position: absolute;
	transition: .5s;
	bottom: -15.5rem;
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
	padding: 0rem 0;
	border-bottom: 1px solid rgba(0,0,0,0.1);
	display: flex;
	justify-content: space-around;
}
.app-works .forward-list .fList-item{
	width: 25%;
	color: #555;
}
.app-works .fList-item .mui-icon{
	padding: .5rem;
	border-radius: 50%;
	color: #fff;
	background: #ddd;
}
.app-works .forward-list .undo-bg{
	background: #000;
}
.app-works .forward-list .weixin-bg{
	background: yellow;
}
.app-works .forward-list .pengyouquan-bg{
	background: yellow;
}
.app-works .forward-list .starhalf-bg{
	background: yellow;
}
</style>
