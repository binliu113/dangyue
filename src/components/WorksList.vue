<template lang="html">
	<div class="app-worksList">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
			<div class="app-list d-flex flex-wrap row">
			<div class="col-6">
				<div class="item" v-for="(cell,i) of worksList" :kye="i" v-if="i%2==0">
					<div @click="toWorks(cell.lid)">
						<video :src="host+cell.src" width="100%" class="bg-video"></video>
					</div>
					<div class="">
						<p class="m-0" v-text="cell.title"></p>
						<ul class="d-flex justify-content-between list-unstyled w-100 mt-2 mb-0">
							<li>
								<router-link :to="`/works/${cell.uid}`">
									<img :src="host+cell.user_pic">
									<span class="name-text" v-text="cell.user_name"></span>
								</router-link>
							</li>
							<li>
								<a><span class="mui-icon-extra mui-icon-extra-heart-filled"></span></a>
								<span v-text="cell.like_num">12</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="item" v-for="(cell,i) of worksList" :kye="i" v-if="i%2!==0">
					<div @click="toWorks(cell.lid)">
						<video :src="host+cell.src" width="100%" class="bg-video"></video>
					</div>
					<div class="">
						<p class="m-0" v-text="cell.title"></p>
						<ul class="d-flex justify-content-between list-unstyled w-100 mt-2 mb-0">
							<li>
								<router-link :to="`/works/${cell.uid}`">
									<img :src="host+cell.user_pic">
									<span class="name-text" v-text="cell.user_name"></span>
								</router-link>
							</li>
							<li>
								<a><span class="mui-icon-extra mui-icon-extra-heart-filled"></span></a>
								<span v-text="cell.like_num">12</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		</mt-loadmore>
		<!-- <mt-button type="primary" size="large" @click="loading">加载更多</mt-button> -->
	</div>
</template>
<script>
	export default{
		data(){
			return{
				host: this.host,
				worksList:'',
				pno:1,
				move:true,
				allLoaded: false
			}
		},
		created(){
			this.$indicator.open('加载中...');
			this.loadData();
			var time = setTimeout(()=>{
                this.$indicator.close();
                clearTimeout(time);
            },100)
		},
		methods:{
			loadBottom() {
				console.log(2);
				this.allLoaded = false;// 若数据已全部获取完毕
				this.$refs.loadmore.onBottomLoaded();
			},
			// bottomMethod() {
			// 	this.$refs.loadmore.onBottomLoaded();
			// },
			loadData() {
				var url = this.host+'worksList?pno='+this.pno;
				this.axios.get(url,{
					params:{}
				}).then(res=>{
					this.worksList=res.data.data;
				})
			},
			loading(){
				if(this.move==false){
					this.$toast('已经到底了-_-');
					return;
				}
				this.pno++;
				var url = this.host+'worksList?pno='+this.pno;
				this.axios.get(url,{
					params:{}
				}).then(res=>{
					var rows = this.worksList.concat(res.data.data);
					this.worksList=rows;
					if(this.pno==res.data.pageCount){
						this.move=false;
					}
				})
			},
			toWorks(e){
				this.$router.push(`/works/${e}`)
			}
		}
	}
</script>
<style scoped>
.app-worksList .mint-header{
	position: fixed;
	background:rgba(0,0,0,0.4);
	width:100%;
}
.app-worksList .app-list{
	width:100%;
	box-sizing: border-box;
	margin:0;
}
.app-worksList .col-6 .item{
	width: 100%;
	padding: .2rem;
	margin-bottom: .2rem;
	border: .01rem solid rgba(0, 0, 0, 1);
}
.app-worksList .col-6:nth-child(1){
	padding-left: .2rem;
	padding-right: 0;
}
.app-worksList .col-6:nth-child(2){
	padding-left: .2rem;
	padding-right: .2rem;
}
.app-worksList p{
	word-wrap: break-word;
}
.app-worksList .item .bg-video{
	background:#000;
}
.app-worksList .item ul img{
	width:1.5rem;
	height: 1.5rem;
	border-radius: 100%;
}
.app-worksList div.app-list a{
	height: 2rem;
	text-decoration: none;
	color:#fff;
	display: inline-block;
	position: relative;
}
.app-worksList div.app-list a .name-text{
	width: 5rem;
	display: inline-block;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	position: absolute;
}
.app-worksList .item .mui-icon-extra{font-size:16px;}
</style>
