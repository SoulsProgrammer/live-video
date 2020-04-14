<template>
  <div class="chat-wrapper">
    我是聊天页面
    {{this.kefuId}}

        <iframe id="iframe" ref="iframe" :src="kefuLink" frameborder="0" class="kefuIframe"></iframe>
    
  </div>
</template>

<script>
export default {
  name: "chat",
  computed:{
      kefuLink(){
         
          return  `https://living.appcoo.com/h5/mall-service/chat.html?kefuId=${this.kefuId}&kefuName=${this.kefuName}&myUserId=${this.myUserId}&myUserName=${this.myUserName}`
      }
  },
  props: {
    kefuId: {
        type:String
    },
    kefuName: {
         type:String
    },
    myUserId: {
         type:String
    },
    myUserName: {
         type:String
    }
  },
  mounted() {

  }
};
</script>

<style lang="stylus">
</style>