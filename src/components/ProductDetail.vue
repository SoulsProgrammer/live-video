<template>
  <div class="product_detail_wrapper" @click.stop="GoShopDetail" v-if="list">
      <div class="sort">{{list.sort}}</div>
      <img :src="list.listImg" alt="" style="width:228px;height:228px;border-radius: 10px;">
      <div class="right">
          <div class="title">{{list.goodsName}}</div>
          <div class="action twoEllipsis">{{list.subTitle}}</div>
          <div class="bottom_warp">
              <div class="jiage">￥{{list.goodsPrice}}</div>
              <!-- <img src="../assets/images/video_play.png" alt="" class="video_play" style="width:52px;height:52px"> -->
              <img src="../assets/images/goShop.png" alt="" class="goShop" style="width:52px;height:52px">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["list"],
  data() {
    return {
      transmit:{
        type:0,
        goodsId:0,
        goodsUrl:""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
      GoShopDetail(){
        this.Statusbar("show")
        this.$emit("gitProgress",this.transmit); //传给父组件商品ID
        
      },
    Statusbar(status){
      var bridge = window["WebViewJavascriptBridge"];
      if (bridge) {
        bridge.callHandler("hideSystemStatusBar", status, function() {});
      }
    },/*状态栏*/
  },
  created() {},
  mounted() {
    this.transmit.type = this.list.type
    this.transmit.goodsId = this.list.goodsId
    //console.log(this.list.goodsUrl)
    this.transmit.goodsUrl = this.list.goodsUrl
    console.log(this.list)
  }
};
</script>
<style lang="stylus" scoped>
    .product_detail_wrapper
        display flex
        flex-direction row
        width 681px
        height 224px
        padding-top 25px
        padding-bottom 25px
        padding -bottom 10px
        border-top 1px solid #828282
        position relative
        .sort
            width 100px;
            height 30px;
            background rgba(0,0,0,0.5)
            position absolute
            top 25px
            left 0
            border-top-left-radius: 10px;
            border-bottom-right-radius: 10px;
            text-align center
            line-height 30px;
            font-size 18px;
            color #ffffff
        .right
            padding 30px
            padding-right 0px
            display flex
            flex-direction column
            felx 1
            height 188px
            justify-content space-between
            width: 423px;
            margin-top: -9px;
            .title
                width 428px
                font-size 30px
                color #000000
                overflow hidden
                white-space nowrap 
                text-overflow ellipsis
                text-align justify
            .action
                width 428px
                font-size 30px
                text-align left
                color #ff2663;
                margin-top -24px
            .bottom_warp
                display flex
                flex-direction row
                .jiage
                    font-size 30px
                    color #ff2663;
                    margin-top 12px
                    width 200px;
                    text-align left 
                .video_play
                    margin-left 200px
                .goShop
                    margin-left 147px
                     

</style>