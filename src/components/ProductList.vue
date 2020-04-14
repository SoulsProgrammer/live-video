<template>
  <div>
    <div class="wrappera" v-if="productshow">
      <div class="productNum">全部宝贝{{this.goodsCount}}件</div>
      <div class="product_warp" ref="product_warp" @scroll="scrollevent">
          <div v-for="(list,index) in GoodList" :key="index">
            <product-detail :list="list"  @gitProgress="gitProgresss"></product-detail>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDetail from '@/components/ProductDetail.vue'
export default {
  components: {
      ProductDetail
  },
  props:["list"], /*list 直播间id*/
  data() {
    return {
      productshow:false,
      start:0,
      end:4,
      GoodList:[],
      scrollfalse:false,
      goodsCount:Number
    };
  },
  watch: {},
  computed: {},
  methods: {
    getRoomGoodList(){
      var params={
        start:this.start,
        end:this.end,
        liveRoomId:this.list
      }
      this.$post(this.$global.globalUrl+"live/product/list.do",params).then(res=>{
        if(res.code=="0"){
          this.start+=5
          this.end+=5
          this.goodsCount =res.data.goodsCount
          for(var i=0;i<res.data.liveRoomGoodsList.length;i++){
            this.GoodList.push(res.data.liveRoomGoodsList[i])
          }
          this.productshow=true
        }else{
          this.scrollfalse = true
        }
      })
    },/*获取直播间商品 */
    scrollevent(e){
      var scrollTop = e.srcElement.scrollTop
      var clientHeight = e.srcElement.clientHeight
      var scrollHeight = e.srcElement.scrollHeight
      if((Math.ceil(scrollTop+clientHeight)==scrollHeight)&&(!this.scrollfalse)){
        this.getRoomGoodList()
      }

    },
    gitProgresss(transmit){
      this.$emit("gitPlayProgress",transmit); //传给父组件商品ID
    }
  },
  created() {
    
  },
  mounted() {
    this.getRoomGoodList()
  }
};
</script>
<style lang="stylus" scoped>

.wrappera
    background #ffffff
    width 690px
    height 866px
    border-top-left-radius 30px
    border-top-right-radius 30px
    display flex
    flex-direction column
    padding 30px
    transform:scale(0.9);
    .productNum
        color #828282
        font-size 32px
        text-align left
        height 67px
    .product_warp
        height 799px;
        overflow-y scroll
        overflow -x hidden
</style>