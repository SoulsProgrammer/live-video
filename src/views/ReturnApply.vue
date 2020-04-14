<template>
  <div class="ReturnApply_Warp" v-if="dom">
    <div class="head">
      <img src="../assets/images/backNoBg.png" alt class="backBtn" @click.stop="goblack" />
      <div class="head_text">申请退款</div>
    </div>
    <div class="main_content" ref="mainContent">
      <div class="detail" v-for="(item,index) in orderDetail.orderProductList" :key="index">
        <div class="img_warp">
          <img :src="item.productPic" alt class />
        </div>
        <div class="detail_text_warp">
          <div class="detail_text">{{item.productName}}</div>
          <div class="xinghao">{{item.specName}}</div>
          <div class="price_warp">
            <div class="price">￥{{item.productPrice}}</div>
            <div class="num">x{{item.productQuantity}}</div>
          </div>
        </div>
      </div>
      <div class="return_cause">
        <div class="text">退款原因</div>
        <div class="select" @click.stop="selected">
          <span class="select_text">{{causeENd}}</span>
          <img src="../assets/images/my_arrow.jpg" alt class="arrow" />
        </div>
      </div>
      <div class="return_money">
        <div class="top">
          <div class="top_text">退款金额:</div>
          <div class="top_money">
            <span style="font-size:30px;">￥</span>
            {{orderDetail.totalAmount}}
          </div>
        </div>
        <div class="explain">不可修改，最多￥{{orderDetail.totalAmount}}，含发货邮费￥0.00</div>
      </div>
    </div>
    <div class="submit" @click.stop="submit">提交</div>
    <div class="mode" v-if="selectedCause" @click.stop="closeCause"></div>
    <div class="select_cause" v-if="selectedCause">
      <div class="title">退款原因</div>
      <li v-for="(item,index) in returnCause" :key="index" @click.stop="selecteCause(index)">
        <div class="li_text">{{item.text}}</div>
        <div class="circled" v-if="item.selected">
          <img src="../assets/images/right.png" alt class="right" />
        </div>
        <div class="circle" v-else></div>
      </li>
      <div class="btn" @click.stop="closeCause">关闭</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      orderId: Number,
      orderDetail: Object,
      dom: false,
      selectedCause: false,
      returnCause: [
        { text: "订单信息拍错（规格/尺码/颜色等）", selected: false },
        { text: "我不想要", selected: false },
        { text: "地址/电话信息填写错误", selected: false },
        { text: "没用/少用优惠", selected: false },
        { text: "缺货", selected: false }
      ],
      causeENd: "请选择",
      orderRefundId: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    goblack() {
      this.$router.replace({
        path: "/order"
      });
    },
    setHeight() {
      var clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度
      this.$refs.mainContent.style.height = clientHeight - 203 + "px"; //设置页面高度
    },
    getGoodDetail() {
      // var id =this.$route.query.id
      var id = this.$route.query.id == undefined ? 0 : this.$route.query.id;
      //console.log(id);
      var that = this;
      var data = {
        orderId: this.orderId,
        orderRefundId: id
      };
      this.$post(
        this.$global.globalUrl + "orderRefund/getOrderInfo.do",
        data
      ).then(res => {
        if (res.code == 0) {
          this.orderDetail = res.data.orderInfo;
          this.orderRefundId = res.data.orderRefund.id;
          this.dom = true; /*数据获取后dom加载 */
          var Timeout;
          var that = this;
          Timeout = setTimeout(() => {
            that.setHeight();
            clearTimeout(Timeout);
          }, 100); /*dom显示完成后延迟设置高度 */
          //console.log(this.orderDetail);
        }
      });
    },
    closeCause() {
      this.selectedCause = false;
    },
    selected() {
      this.selectedCause = true;
    },
    selecteCause(index) {
      for (var i = 0; i < this.returnCause.length; i++) {
        this.returnCause[i].selected = false;
      }
      this.returnCause[index].selected = true;
      this.causeENd = this.returnCause[index].text;
    },
    submit() {
      var causeENd = this.causeENd == "请选择" ? "无" : this.causeENd;
      var data = {
        orderId: this.orderId,
        refundDesc: causeENd,
        orderRefundId: this.orderRefundId
      };
      this.$post(
        this.$global.globalUrl + "orderRefund/applyRefund.do",
        data
      ).then(res => {
        //console.log(res);
        this.$router.replace({
          path: "/returnDetail",
          // query:{"orderRefundId":0}
          query: { orderRefundId: res.data.orderRefundId }
        });
      });
    }
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.getGoodDetail();
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
.ReturnApply_Warp {
  background: #f5f5f5;

  .mode {
    width: 750px;
    height: 1334px;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
  }

  .select_cause {
    width: 725px;
    height: 740px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding-left: 25px;

    .title {
      height: 129px;
      line-height: 129px;
      text-align: center;
      width: 725px;
      color: #14191b;
    }

    li {
      list-style: none;
      width: 725px;
      height: 100px;
      border-bottom: 1px solid #8d8d8d;
      line-height: 100px;
      text-align: left;
      position: relative;

      .circled {
        position: absolute;
        right: 27px;
        top: 27px;
        width: 42px;
        height: 42px;
        border-radius: 40px;
        background: #ff003c;

        .right {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
          width: 24px;
        }
      }

      .circle {
        position: absolute;
        right: 27px;
        top: 27px;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        border: 2px solid #8d8d8d;
      }
    }

    #end_li {
      border: none;
    }

    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 750px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      color: #fdffff;
      background: #ff003c;
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
      width: 58px;
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
    width: 750px;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    .detail {
      width: 750px;
      height: 208px;
      display: flex;
      flex-direction: row;
      background: #ffffff;
      margin-bottom: 30px;

      .img_warp {
        width: 160px;
        height: 160px;
        overflow: hidden;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        min-width: 200px;
        border-radius: 10px;
        margin: 24px 0 0 24px;

        img {
          width: 160px;
        }
      }

      .detail_text_warp {
        width: 494px;
        display: flex;
        flex-direction: column;
        padding: 16px;
        justify-content: space-between;

        .detail_text {
          width: 494px;
          font-size: 26px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          max-height: 77px;
          text-align: justify;
        }

        .xinghao {
          text-align: left;
          color: #666;
          font-size: 26px;
        }

        .price_warp {
          display: flex;
          flex-direction: row;
          font-size: 28px;

          .price {
            font-size: 28px;
            color: #f65b09;
          }

          .num {
            margin-left: 20px;
            color: #666;
          }
        }
      }
    }

    .return_cause {
      width: 750px;
      display: flex;
      flex-direction: row;
      height: 163px;
      background: #ffffff;
      justify-content: space-between;
      margin-bottom: 30px;

      .text {
        margin-top: 20px;
        margin-left: 30px;
        letter-spacing: 3px;
        color: #464a4b;
        font-size: 28px;
      }

      .select {
        margin-top: 20px;
        margin-right: 30px;
        color: #a0a0a0;
        display: flex;
        flex-direction: row;

        .select_text {
          font-size: 28px;
          margin-right: 30px;
        }

        .arrow {
          width: 24px;
          height: 29px;
          margin-top: 5px;
        }
      }
    }

    .return_money {
      width: 750px;
      height: 163px;
      display: flex;
      flex-direction: column;
      text-align: left;
      background: #ffffff;
      justify-content: space-around;

      .top {
        margin-left: 30px;
        display: flex;
        flex-direction: row;
        color: #484c4d;
        font-size: 28px;

        .top_money {
          color: #f7023d;
          margin-left: 10px;
        }
      }

      .explain {
        margin-left: 30px;
        color: #a7a7a7;
        font-size: 26px;
      }
    }
  }

  .submit {
    width: 750px;
    height: 100px;
    background: #ff003c;
    text-align: center;
    line-height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #ffffff;
  }
}
</style>