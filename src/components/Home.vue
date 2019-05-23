<template lang="html">
    <div class="app-home">
    	<header id="header" class="mui-bar mui-bar-transparent">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">首页</h1>
        </header>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/1">
                        <div class="icon-box bg-f">
                            <span class="mui-icon-extra mui-icon-extra-cate fontColor"></span>
                        </div>
                        <div class="mui-media-body">美食</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/2">
                        <div class="icon-box bg-j">
                            <span class="mui-icon-extra mui-icon-extra-holiday fontColor"></span>
                        </div>
                        <div class="mui-media-body">景点</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/3">
                        <div class="icon-box bg-w">
                            <span class="mui-icon mui-icon-star fontColor"></span>
                        </div>
                        <div class="mui-media-body">文化</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/4">
                        <div class="icon-box bg-p">
                            <span class="mui-icon-extra mui-icon-extra-cold fontColor"></span>
                        </div>
                        <div class="mui-media-body">玩乐</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/5">
                        <div class="icon-box bg-d">
                            <span class="mui-icon-extra mui-icon-extra-hotel fontColor"></span>
                        </div>
                        <div class="mui-media-body">酒店</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/6">
                        <div class="icon-box bg-g">
                            <span class="mui-icon-extra mui-icon-extra-cart fontColor"></span>
                        </div>
                        <div class="mui-media-body">购物</div></router-link></li>
            </ul>
            <div class="app-worksList" v-if="worksList.length>0">
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
        								<router-link :to="`/youself/${cell.uid}`">
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
        	</div>
        </mt-loadmore>
    </div>
</template>
<script>
export default{
	data(){
	 	return{
            host: this.host,
            worksList: [],
            pno:0,
            move:true,
            allLoaded: false
	 	}
	},
    created(){
        //第一次加载动画
         this.$indicator.open('加载中...');
         this.loading();
         var time = setTimeout(()=>{
             this.$indicator.close();
             clearTimeout(time);
         },100)
         this.stateBottom();
    },
    methods:{
        loadBottom() {
            this.loading()
            this.allLoaded = true
        },
        stateBottom() {
            let that = this;
            window.onscroll = ()=>{
                // scrollTop 滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                // windowHeight 可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                // scrollHeight 滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                // 滚动条到底部的条件
                if(scrollTop + windowHeight == scrollHeight){
                // 加载数据
                    this.allLoaded = false;
                }
            }
        },
        loading(){
            if(this.move==false){
                this.$toast('已经到底了-_-');
                this.allLoaded = true
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
.app-home .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-home .mui-title{color:#fff;}
.app-home .mui-table-view{
    background:transparent;
    padding-top:2rem;
    border: 0;
    /* position: absolute; */
}
.app-home .mui-table-view .mui-table-view-cell{
    width: 33.33333%;
    border:0;
}
.app-home .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body,.mui-bar-tab span,header h1{
    color:#999;
}
.app-home .mui-grid-view.mui-grid-9 .mui-media .icon-box{
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bg-f{ background: #e42566; }
.bg-j{ background: #41c146; }
.bg-w{ background: #2196f3; }
.bg-p{ background: #9c27b0; }
.bg-d{ background: #1a517e; }
.bg-g{ background: #f40; }
.app-home .mui-grid-view.mui-grid-9 .mui-media .fontColor{
    font-size: 30px;
    color: #fff;
}
.app-home .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3.mui-active{
    background:transparent;
}
.app-home .mui-table-view span{
    border-radius:5px;
}
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
