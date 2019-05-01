<template>
	<div class="app-works">
		<mt-header title="个人作品"></mt-header>
			<div class="">
				<div class="video-parent">
				<table></table>
				<ul class="list-unstyled">
					<li>1</li>
					<li>2</li>
					<li>3</li>
				</ul>
				<div class="w-100">
					<video width="100%" height="320" controls loop>
					  <source src="https://nie.v.netease.com/r/video/20170928/d3afc120-48a8-4b35-922d-6109b42e8657.mp4" type="video/mp4">
					  <source src="https://nie.v.netease.com/r/video/20170928/d3afc120-48a8-4b35-922d-6109b42e8657.mp4" type="video/ogg">
					   您的浏览器不支持Video标签。
					</video>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style scoped>
.app-works .video-parent{
	height:auto;
	min-height: 27em;
	position: relative;
}
.app-works .video-parent>ul{
	position: absolute;
	right:0.5em;
	top:10em;
	z-index: 1;
}
.app-works .video-parent>div{
	position: absolute;
	top:5em;
}
</style>