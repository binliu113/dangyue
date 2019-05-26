<template lang="html">
    <div class="app-chatroom">
        <header id="header" class="mui-bar mui-bar-transparent">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="outLink"></a>
            <h1 class="mui-title">聊天室 | <span v-text="msgArr[0].user_num" v-if="msgArr.length>0"></span>人在线</h1>
        </header>
        <div class="chat-body" :style="{height:(curHeight-45)+'px'}">
            <div class="chat-box" v-for="(item,i) of msgArr">
                <ul class="chat-user">
                    <li class="user-img-box" :class="item.uid==user_id? 'right' : 'left' ">
                        <img :src="host+item.user_img" alt="" class="user-img">
                    </li>
                    <li class="user-name" :class="item.uid==user_id? 'right' : 'left' ">
                        <h4 v-text="item.user_name"></h4>
                    </li>
                </ul>
                <div class="chat-content">
                    <div class="content-msg" v-text="item.msg">吃饭、睡觉打豆豆瘦瘦高高规划设计开会时国际化是对方可根据</div>
                </div>
            </div>
        </div>
        <div class="send-box">
            <ul class="send-parent">
                <li class="input-box">
                    <input type="text" name="" value="" class="send-input" v-model="msg">
                </li>
                <li class="btn-box">
                    <button class="send-btn" @click="sendData">发送</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            host: this.host,
            curHeight: document.documentElement.clientHeight,
            msg:'',
            msgArr:[],
            socket:null,
            arr:'',
            user_name:sessionStorage.getItem('user_name'),
            user_img:sessionStorage.getItem('user_img'),
            user_id: sessionStorage.getItem('uid')
        }
    },
    created(){
        //载入连接
        this.acceptData()
    },
    updated(){
        var ele = document.querySelector('.chat-body')
        ele.scrollTop = ele.scrollHeight
    },
    methods:{
        outLink(){
            this.socket.close();   //断开ws服务器
            this.$router.back(-1);
        },
        sendData(){
            var msg = this.user_id+','+this.msg+","+this.user_name+','+this.user_img;
            this.socket.send(msg);
            this.msg="";
        },
        acceptData(){  //接受数据
            this.socket = new WebSocket(`${this.ws}`);   //连接ws服务器&接收
            this.socket.onmessage = (e)=>{
                this.obj = JSON.parse(e.data)//获取服务器发来的数据,并且转换为对象
                this.msgArr.push(this.obj); //将单条记录的对象push进数组

            }
        }
    }
}
</script>

<style lang="css" scoped>
.mui-title{
    color: #fff;
}
.app-chatroom .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-chatroom .chat-body{
    overflow: scroll;
    padding-top:4rem;
    padding-left:1rem;
    padding-right:1rem;
}
.app-chatroom .chat-body .chat-box{
    padding-top:1rem;
    margin-bottom: 1rem;
}
.app-chatroom .chat-body .chat-box::after{
    content: " ";
    display: block;
    line-height: 0;
    height: 0;
    visibility: hidden;
}
.app-chatroom .chat-user{
    padding:0;
    margin: 0;
    display: flex;
    vertical-align: top;
    position: relative;
}
.app-chatroom .chat-user .user-img-box{
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
}
.app-chatroom .chat-user li.user-name{
    position: absolute;
}
.app-chatroom .chat-user li.user-img-box.right{
    right: 0rem;
}
.app-chatroom .chat-user li.user-name.right{
    right: .5rem;
    top:-1.4rem;
}
.app-chatroom .chat-user li.user-img-box.left{
    left: 0rem;
}
.app-chatroom .chat-user li.user-name.left{
    left: .5rem;
    top:-1.4rem;
}
.app-chatroom .chat-user .user-img-box .user-img{
    width:100%;
    height: 100%;
    border-radius: .5rem;
}
.app-chatroom .chat-user .user-name h4{
    color: #999;
    font-size:16px;
}
.app-chatroom .chat-body .chat-content{
    color: #000;
    padding: 0rem 3rem;
}
.app-chatroom .chat-body .chat-content .content-msg{
    padding:.7rem;
    background: #fff;
    border-radius: .2rem;
}
.app-chatroom .send-box{
    width: 100%;
    height: 2.5rem;
    background-color: transparent;
    position: fixed;
    bottom: 0;
    background: #000;
}
.app-chatroom .send-box .send-parent{
    padding:0rem 0rem;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
}
.app-chatroom .send-box .send-parent .input-box{
    width:75%;
    height: 100%;
}
.app-chatroom .send-box .send-parent .send-input{
    width:100%;
    height: 100%;
    margin: 0;
    padding: .5rem;
    color: #000;
    background-color: #fff;
}
.app-chatroom .send-box .send-parent .btn-box{
    width: 25%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
}
.app-chatroom .send-box .send-parent .send-btn{
    width: 90%;
    height: 100%;
    background-color: #007bff;
    outLink:none;
    font-size: 18px;
    color:#fff;
}
.app-chatroom .send-box .send-parent .send-btn:hover{
    background-color: #009bff;
}
</style>
