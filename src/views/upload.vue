<template lang="html">
    <div class="app-upload">
        <header id="header" class="mui-bar mui-bar-transparent">
    	    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="outLink"></a>
    	    <h1 class="mui-title">上传作品</h1>
    	</header>
        <div class="upload-body" :style="pageHeight">
            <textarea name="name" rows="3" maxlength="50" class="text" placeholder="@说说你这一刻的想法" v-model="content"></textarea>
            <div class="upload-content">
                <div class="video-box-bg">
                    <div class="file-box">
                        <input type="file" @change="preview($event)" ref='file' class="file">
                        <div class="super">
                            <span v-if="!fileValue.name">选择要上传视频</span>
                            <span v-text="fileValue.name"></span>
                        </div>
                    </div>
                    <div class="video-box">
                        <video :src="fileSrc" class="video-show"></video>
                    </div>
                </div>
                <!-- <form class="" :action="host+'user/uploadFile' " method="post" enctype="multipart/form-data"> -->
                    <div class="radio-box" :style="heightStyle">
                        <div class="radio-header" @click="showRadio">
                            <span>@类别/ <span>{{kind}}</span></span>
                            <span  :class="downCode ? 'mui-icon mui-icon-forward': 'mui-icon mui-icon-arrowdown' "></span>
                        </div>
                        <mt-radio
                          align='right'
                          v-model="value"
                          :options="['美食', '景点', '文化', '玩乐', '酒店', '购物']">
                        </mt-radio>
                    </div>


            </div>
            <button type="button" @click="submit" class="btom-btn">开始上传</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            host: this.host,
            fileSrc:'',
            value:'',
            content:'',
            pageHeight: {height: true},
            fileValue:'',   //文件值
            kind: '请选择类别',
            heightStyle:{
                height: true,
                overflow: true
            },
            downCode: true
        }
    },
    created() {
        this.pageHeight.height = document.documentElement.clientHeight+'px';
    },
    watch:{
        value(){
            this.kind = this.value
            this.downCode = true;
            this.heightStyle.height = 2.21+ 'rem';
        }
    },
    methods:{
        showRadio() {
            if(this.downCode){
                this.downCode = false;
                this.heightStyle.height = 20+ 'rem';
                return;
            }else{
                this.downCode = true;
                this.heightStyle.height = 2.21+ 'rem';
                return;
            }
        },
        submit() {
            if(!this.fileValue){
                this.$toast('请选择要上传的作品');
                return;
            }
            if(this.kind=='请选择类别'){
                this.$toast('请选择类别');
                return;
            }
            var url = this.host+'user/uploadFile';
            var params = new FormData();
            params.append('myvideo',this.fileValue);
            params.append('title',this.content);
            params.append('kind',this.value);
            this.axios.post(url,params).then((result)=>{
                if(result.data.code==1){
                    this.$indicator.open('加载中...');
                    this.$toast('上传成功')
                    var time = setTimeout(()=>{
                        this.$indicator.close();
                        clearTimeout(time);
                    })
                    this.$router.back(0);
                }else{
                    this.$toast('上传失败')
                }
            })
        },
        preview(e) {
            if(!this.$refs.file.files[0]){
                return;
            }
            var index = this.$refs.file.files[0].type.indexOf('video')
            var size  = this.$refs.file.files[0].size;
            if(index==-1){
                this.$toast('请上传正确格式')
                return;
            }
            if( (size/1024/1024) > 50 ){
                this.$toast('视频大小超过50M')
                return;
            }
            var newsrc=this.getObjectURL(this.$refs.file.files[0]);
            console.log(newsrc)
            this.fileSrc = newsrc
            this.fileValue = this.$refs.file.files[0];
        },
        getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
        },
        outLink(e) {
            sessionStorage.setItem('tabbarCode',1);
			this.$router.back(-1);
		}
    }
}
</script>

<style lang="css" scoped>
.app-upload .mui-bar-transparent{
	background:rgba(0,0,0,0.5);
    border-bottom: 1px solid #ffc107;
}
.app-upload .mui-bar-transparent h1{
    color: #fff;
}
.app-upload .upload-body{
    padding-top:44px;
    overflow: hidden;
}
.app-upload .text{
    color: #fff;
    background:rgba(0,0,0,0.5);
    width: 100%;
    height: 5.5rem;
    margin:0;
}
.app-upload .upload-content{
    /* background: #09f; */
    position: relative;
}
.app-upload .video-box-bg{
    width: 100%;
    height: 8rem;
    background: #fff;
    padding: 0 .5rem;
    padding-bottom: .5rem;
}
.app-upload .video-box{
    margin-top: 2rem;
    width: 5rem;
    height: 5rem;
    border: 1px solid #000;
}
.app-upload .video-show{
    width: 100%;
    height: 100%;
    background: #000;
}
.app-upload .file-box{
    padding-top: .1rem;
    background: #fff;
    position: relative;
}
.app-upload .file-box,
.app-upload .file{
    width: 100%;
}
.app-upload .file{
    font-size: 0px;
    height: 7rem;
    position: absolute;
}
.app-upload .super{
    font-size: 15px;
    line-height: 1.8rem;
    background-color: #fff;
    position: absolute;
    top:0rem;
}

.app-upload .radio-box{
    overflow: hidden;
    position: relative;
    height: 2.21rem;
    transition: .5s;
}
.app-upload .radio-header{
    width: 100%;
    background: rgba(0,0,0,0.5);
    border-bottom: 1px solid #000;
    padding: .3rem 1.5rem;
    display: flex;
    justify-content: space-between;
}
.app-upload .mint-radiolist{
    width: 100%;
    position: absolute;
    right: 0rem;
    top: 1.7rem;
}
.app-upload .btom-btn{
    width: 100%;
    height: 2.5rem;
    color:#fff;
    font-size: 18px;
    background: rgba(0,0,0,0.5);
    border:0rem;
    border-radius: .5rem;
    position: fixed;
    bottom: .3rem;
}
</style>
