<template lang="html">
    <div class="app-upload">
        <header id="header" class="mui-bar mui-bar-transparent">
    	    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="outLink"></a>
    	    <h1 class="mui-title">上传作品</h1>
    	</header>
        <div class="upload-body" :style="pageHeight">
            <textarea name="name" rows="3" maxlength="50" class="text" placeholder="@说说你这一刻的想法"></textarea>
            <div class="upload-content">
                <form class="" :action="host+'user/uploadFile' " method="post" enctype="multipart/form-data">
                    <input type="file" name="myvideo" id="d1" @change="preview($event)">
                    <label><input type="radio" name="kind" value="美食" checked>美食</label>
                    <label><input type="radio" name="kind" value="景点" >景点</label>
                    <label><input type="radio" name="kind" value="文化" >文化</label>
                    <label><input type="radio" name="kind" value="玩乐" >玩乐</label>
                    <label><input type="radio" name="kind" value="酒店" >酒店</label>
                    <label><input type="radio" name="kind" value="购物" >购物</label>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            host: this.host,
            fileContent:'',
            pageHeight: {height: true}
        }
    },
    watch: {
    },
    created() {
        this.pageHeight.height = document.documentElement.clientHeight+'px';
    },
    methods:{
        test(e) {
            console.log(e.target.files[0]);
        },
        outLink(e) {
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
}
.app-upload .upload-content{
    /* background: #09f; */
}

</style>
