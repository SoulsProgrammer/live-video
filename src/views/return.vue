<template>
  <div class="return_warp">
    <div class="head">
      <img src="../assets/images/backNoBg.png" alt class="backBtn" @click.stop="goblack" />
      <div class="head_text">退货</div>
    </div>
    <div class="main_content" v-if="dom">
      <div class="noData" v-if="returnAll.length<=0">
        <img src="@/assets/images/noRefund.png" alt="" class="no-data-pic">
        <div class="desc">您暂时没有退款订单</div>
        <div class="desc-sm">您的眼光真棒呢</div>
      </div>
       
      <div class="main_scroll">
        <div class="box" v-for="(item,index) in returnAll" :key="index">
          <div class="warp_top">
            <div class="product_warp">
              <img src="../assets/images/dianpu.png" alt class="product_tu" />
              <div class="product_title">{{item.merchantName}}</div>
            </div>
            <div class="right_warp">
              <img src="../assets/images/qian.png" alt class="qian_tu" />
              <div class="tuikuan_text">退货</div>
            </div>
          </div>
          <div class="warp_midde" v-for="(list,index) in item.orderProductList" :key="index">
            <div class="img_warp">
              <img :src="list.productPic" alt />
            </div>
            <div class="midde_right">
              <div class="detail_right_title">{{list.productName}}</div>
              <div class="detail_type">{{list.specName}}</div>
              <div class="price_warp">
                <div class="price">￥{{list.productPrice}}</div>
                <div class="num">X{{list.productQuantity}}</div>
              </div>
            </div>
          </div>
          <div class="warp_bottom">
            <div class="return_status" v-if="(item.status==0)||(item.status==4)">退款中</div>
            <div class="return_status" v-else-if="item.status==1">同意退款</div>
            <div class="return_status" v-else-if="item.status==2">退款成功</div>
            <div class="return_status" v-else>拒签退款</div>
            <div class="total_price">
              退款金额
              <div style="color:#fc5802;font-size:30px;margin:0 0 0 10px;">￥{{item.refundPrice}}</div>
            </div>
          </div>
          <div class="detail_btn" @click="examineDetail(item.id)">查看详情</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      returnAll: Object,
      dom: false
    };
  },
  computed: {},
  watch: {
   
  },
  methods: {
    goblack() {
      if(this.$route.query.from=="ReturnDetail"){
        this.$router.push({
          name:'Order',
          query: {
            from: 'Return'
          }
          })
      }else if(this.$route.query.from=="My"){
         this.$router.push({
          name:'My',
         
          })
      }
      else {
        this.$router.go(-1)
      }
      
    },
    getReturnAll() {
      var data = {
        status: -1,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$post(this.$global.globalUrl + "orderRefund/list.do", data).then(
        res => {
          this.returnAll = res.data;
          this.dom = true;
        }
      );
    },
    examineDetail(orderRefundIdData) {
      this.$router.push({
        path: "/returnDetail",
        query: { orderRefundId: orderRefundIdData }
      });
    }
  },
  created() {
    this.getReturnAll();
    
  },
  mounted() {},
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
.noData{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-100%);
      .no-data-pic {
      width: 150px;
      margin: 0 auto;
    }
    .desc {
      margin-top: 40px;
    }
    .desc-sm {
      color: #929292;
      font-size: 24px;
      margin-top:25px;
    }
  }
.return_warp {
  background: #f5f5f5;

  .main_content {
    .main_scroll {
      background: #f5f5f5;
    }
  }

  .head {
    position: relative;
    width: 750px;
    height: 100px;
    background: #fe2045;
    z-index: 1000;
    color: #fff;  
    .backBtn {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 24px;
      margin: auto;
    }

    .head_text {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 200px;
      height: 50px;
    }
  }

  .main_content {
    display: flex;
    flex-direction: column;

    .box {
      display: flex;
      flex-direction: column;
      width: 650px;
      margin: 30px 30px 30px 30px;
      padding: 20px;
      background: #ffffff;
      border-radius: 20px;
      color: #161616;
      font-size: 28px;

      .warp_top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .product_warp {
          display: flex;
          flex-direction: row;

          .product_tu {
            width: 45px;
            height: 45px;
          }

          .product_title {
            margin-left: 15px;
          }
        }

        .right_warp {
          display: flex;
          flex-direction: row;

          .qian_tu {
            width: 35px;
            height: 35px;
            margin-top: 2px;
            margin-right: 10px;
          }
        }
      }

      .warp_midde {
        display: flex;
        flex-direction: row;

        .img_warp {
          width: 180px;
          height: 180px;
          overflow: hidden;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          min-width: 200px;
          border-radius: 10px;
          margin-top: 30px;

          img {
            width: 180px;
          }
        }

        .midde_right {
          display: flex;
          flex-direction: column;
          width: 450px;
          font-size: 28px;
          color: #000513;
          text-align: left;
          margin-top: 21px;

          .detail_right_title {
            font-size: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            width: 423px;
            -webkit-box-orient: vertical;
            height: 69px;
            margin-left: 23px;
            text-align: justify;
          }

          .detail_type {
            color: #959595;
            margin: 23px 0 0 23px;
          }

          .price_warp {
            display: flex;
            flex-direction: row;
            margin: 23px 0 0 23px;

            .num {
              margin-left: 15px;
            }
          }
        }
      }

      .warp_bottom {
        height: 85px;
        background: #fafafa;
        width: 649px;
        margin-top: 30px;
        border-radius: 10px;
        display: flex;
        flex-direction: row;

        .return_status {
          margin: 20px 0 0 80px;
          color: #fc5802;
        }

        .total_price {
          display: flex;
          flex-direction: row;
          margin: 20px 0 0 80px;
        }
      }

      .detail_btn {
        width: 166px;
        height: 62px;
        border-radius: 30px;
        border: 2px solid #fc5802;
        margin-top: 23px;
        margin-left: 480px;
        color: #fc5802;
        text-align: center;
        line-height: 62px;
      }
    }
  }
}
</style>