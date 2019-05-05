<template>
	<div class="app-works">
		<header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">推荐 | 西安</h1>
		</header>
		<div class="works-body" :style="{height:(curHeight-50)+'px'}">
			<div class="video-box">
				<video src="http://127.0.0.1:3000/video/01.mp4" controls class="video"></video>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				curHeight:document.documentElement.clientHeight
			}
		},
		methods:{
			// beforMount(){
			// 	var h = document.documentElement.clientHeight
			// 	// this.curHeight = h - heigth
			// 	console.log(this.curHeight);
			// }
		},
		watch:{

		}
	}
</script>
<style scoped>
.app-works .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-works .mui-bar-transparent h1{
	color: #fff;
}
.app-works .video-box{
	padding: 5rem 0;
	height: 25rem;
	background: #000;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.app-works .video{
	width:100%;
}
.app-works .works-body{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
