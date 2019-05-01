<template>
	<div class="add-login">
		<mt-header title="USER LOGIN"></mt-header>
		<form action="#">
			用户名：<input type="text" v-model="uname" placeholder="请输入用户名">
			密码：<input type="password" v-model="upwd" placeholder="请输入密码">
			<input type="button" value="登录" @click="login">
		</form>
	</div>
</template>
<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return{
				uname:'',
				upwd:'',
			}
		},
		methods:{
			login(){
				var nreg = /^\w{3,8}$/
				if(!nreg.test(this.uname)){
					Toast('用户名格式不正确');
					return;
				}
				var preg = /^\d{3,8}$/
				if(!preg.test(this.upwd)){
					Toast('密码格式不正确')
					return;
				}
				var url = this.host+'user/login?uname='+this.uname+'&upwd='+this.upwd;
				this.axios.get(url,{
					params:{ }
				}).then(res=>{
					if(res.data.code==1){
						Toast('登录成功')
					}else{
						Toast('登录失败')
					}
				})
			}
		}
	}
</script>
<style>

</style>
