<template lang="html">
    <div class="app-upload">
        <header id="header" class="mui-bar mui-bar-transparent">
    	    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="outLink"></a>
    	    <h1 class="mui-title"></h1>
    	</header>
        <div class="">
            <input type="file" name="" value="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cltHeight:document.documentElement.clientHeight
        }
    },
    methods:{
        outLink(e) {
			this.$router.back(-1);
		}
    }
}
</script>

<style lang="css" scoped>
.app-upload .mui-bar-transparent{
	background:rgba(0,0,0,0.5);
}
</style>
