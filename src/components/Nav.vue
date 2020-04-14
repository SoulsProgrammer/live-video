<template>
  <div class="nav_warp">
    <div class="nav">
      <div class="nav_top">
        <!-- <div class="nav_title">惠生活直播</div> -->
        <img src="../assets/images/backNoBg.png" alt="" class="close_nav" @click="exitApp()">
        <img src="../assets/images/logo.png" alt="" class="nav_title">
      </div>
      <div class="nav-center">
        <div class="type">
          <span @click="SelectedQ('follow')">关注</span>
          <!-- <img src="../assets/images/select.png" alt class="select" v-show="Follow" /> -->
          <div class="select" v-show="choosed=='follow'"></div>

        </div>
        <div class="type">
          <span @click="SelectedQ('delicacy')">精选</span>
          <!-- <img src="../assets/images/select.png" alt class="select" v-show="Selected" /> -->
          <div class="select" v-show="choosed=='delicacy'"></div>
        </div>
        <div class="type">
          
          <span @click="SelectedQ('my')">我的</span>
          <!-- <img src="../assets/images/select.png" alt class="select" v-show="My" /> -->
          <div class="select" v-show="choosed=='my'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props:{
    choosed:{
      type: String
    }
  },
  data() {
    return {
      My: false,
      Selected: false,
      Follow: false,
    };
  },
  computed: {},
  watch: {
  },
  methods: {
    SelectedQ(select){
      this.$emit('changeSelect',select)
    },
    // SelectedQ(select) {
    //   if(select=='my'){
    //     this.$router.push({ path: "/my" })
    //     this.My=true
    //     this.Selected=false
    //     this.Follow = false
    //   }else if(select=='delicacy'){
    //     if(this.Selected==true){
    //       return
    //     }else{
    //       this.$router.push({ path: "/" });
    //       this.My=false
    //       this.Selected=true
    //       this.Follow = false
    //     }
    //   }else if(select=='follow'){
    //     if(this.Follow==true){
    //       return
    //     }else{
    //       this.$router.push({ path: "/follow" });
    //       this.My=false
    //       this.Selected=false
    //       this.Follow = true
    //     }
        
    //   }
    // },
    exitApp() {
      var bridge = window["WebViewJavascriptBridge"];
      if (bridge) {
        bridge.callHandler("exitApp", "", function() {});
      }
    },
    
  },
  created() {
  },
  mounted() {
    var that = this
    setTimeout(function(){
      //console.log(that.$store.state.select)
      
      that.SelectedQ(that.$store.state.select)
    },200)
    
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}
};
</script>
<style lang='stylus' scoped>
.nav 
  position: absolute;
  left: 0;
  top: 0;
  width: 750px;
  background-color: #fe2045;
  display: flex;
  flex-direction column
  height: 174px;
  z-index 11
  .nav_top
    display flex
    width 100%;
    flex-direction row
    justify-content space-between
    .nav_title
      color: #fff;
      font-size: 35px;
      margin-top: 28px;
      margin-bottom: 10px;
      margin-right: 237px;
      width: 266px;
    .close_nav
      width: 54px;
      height: 39px;
      margin-left: 24px;
      margin-top: 32px;
  .nav-center 
    width: 320px;
    height: 89px;
    display: flex;
    justify-content: space-around;
    margin-left 220px;
    .type 
      font-size: 30px;
      color: #ffffff;
      height: 80px;
      line-height: 80px;
      position: relative;
      .select 
        position: absolute;
        top: 70px;
        left: -1px;
        width: 62px;
        height: 5px;
        background: #fff;
      
    
  

</style>