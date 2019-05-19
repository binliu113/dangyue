<template lang="html">
	<div class="app-food">
		<header id="header" class="mui-bar mui-bar-transparent">
	    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="outLink"></a>
	    <h1 class="mui-title" v-text="header"></h1>
    	</header>
	    <mt-swipe :auto="4000" :show-indicators="false">
	    	<mt-swipe-item v-for="(cell,i) of imgs" :key="i">
	    		<img :src="host+cell.pic">
	    	</mt-swipe-item>
	    </mt-swipe>
      <div class="food-list">
          <div>
              <p class="mt-3">热门推荐</p>
          </div>
          <ul class="list-unstyled">
              <li class="mt-2 list-item" v-for="(cell,i) of rmds" :key="i">
                  <a href="javascript:;" class="d-block">
                      <img :src="host+cell.pic" alt="" class="float-left">
                      <div class="of-h">
                          <h5 class="m-0 mb-1" v-text="cell.title"></h5>
                          <p class="m-0" v-text="cell.score"></p>
                          <p class="m-0" v-text="cell.address"></p>
                      </div>
                  </a>
              </li>
          </ul>
      </div>
      	<div class="food-footr">
            <div>
                <p>热门视频</p>
            </div>
			<!-- <div class="food-works d-flex flex-wrap"> -->
			<div class="app-list d-flex flex-wrap row">
				<div class="col-6">
					<div class="item" v-for="(cell,i) of list" :kye="i" v-if="i%2==0">
						<div @click="toWorks(cell.lid)">
							<video :src="host+cell.src" width="100%" class="bg-video"></video>
						</div>
						<div class="">
							<p class="m-0" v-text="cell.title"></p>
							<ul class="d-flex justify-content-between list-unstyled w-100 mt-2 mb-0">
								<li>
									<router-link :to="`/works/${cell.uid}`">
										<img :src="host+cell.user_pic">
										<span class="name-text" v-text="cell.user_name" ></span>
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
					<div class="item" v-for="(cell,i) of list" :kye="i" v-if="i%2!==0">
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
      	</div>
	</div>
</template>
<script>
export default{
	props:['kid'],
	data(){
		return{
		host: this.host,
    	rmds:0,
      	imgs:0,
      	list:0,
		header:''
		}
	},
  	created(){
  		this.loadKind();
  	},
  	methods:{
		outLink(e) {
			this.$router.back(-1);
		},
	    loadKind(){
	      var url = `${this.host}kind`;
	      this.axios.get(url,{
	          params:{
				kid:this.kid
			  }
	      }).then(res=>{
				this.imgs = res.data.img;
				this.rmds = res.data.rmd;
				this.list = res.data.data;
				if(this.rmds[0].kid==1) this.header = '美食';
				if(this.rmds[0].kid==2) this.header = '景点';
				if(this.rmds[0].kid==3) this.header = '文化';
				if(this.rmds[0].kid==4) this.header = '玩乐';
				if(this.rmds[0].kid==5) this.header = '酒店';
				if(this.rmds[0].kid==6) this.header = '购物';
	      	})
	    }
	},
}
</script>
<style scoped>
.app-food a{
	color:#fff;
}
.app-food header,.app-food .mint-swipe,.app-food .food-list,.app-food .food-footr>div:first-child{
    padding:0 0.5rem;
}
.app-food .food-list div:first-child p,.app-food .food-footr div:first-child p{
    border-bottom: 1px solid rgba(0,0,0,0.1);
}
.app-food .mui-bar-transparent{
	background:rgba(0,0,0,0.5);
}
.app-food header>h1{
	color:#fff;
}
.app-food .mint-swipe{
	padding-top:3rem;
	height: 10rem;
}
.app-food .mint-swipe img{
    width:100%;
    height:100%;
}
.app-food .media-list .list-item{
    height:1rem;
}
.app-food .food-list img.float-left{
        width: 6rem;
        height: 4rem;
        margin-right: .5rem;
        border-radius: .5rem;
}
.app-food .of-h{
    overflow: hidden;
    height: 4rem;
}
.app-food .of-h h5{
    color:#fff;
    font-size:16px;
}
.app-food .app-list{
	width:100%;
	box-sizing: border-box;
	margin:0;
}
.app-food .col-6 .item{
	width: 100%;
	padding: .2rem;
	margin-bottom: .2rem;
	border: .01rem solid rgba(0, 0, 0, 1);
}
.app-food .col-6:nth-child(1){
	padding-left: .2rem;
	padding-right: 0;
}
.app-food .col-6:nth-child(2){
	padding-left: .2rem;
	padding-right: .2rem;
}
.app-food p{
	word-wrap: break-word;
}
.app-food .food-works .item .bg-video{
	background:#000;
}
.app-food .item ul img{
	width:1.5rem;
	height:1.5rem;
	border-radius: 100%;
}
.app-food div.app-list a{
	height: 2rem;
	text-decoration: none;
	color:#fff;
	display: inline-block;
	position: relative;
}
.app-food div.app-list a .name-text{
	width: 5rem;
	display: inline-block;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	position: absolute;
}
.app-food .item .mui-icon-extra{font-size:16px;}
</style>
