<template>
  <div class="order" ref="order">
    <div class="top">
      <div class="backBtn">
        <img src="../assets/images/backNoBg.png" alt @click="goBack" />
      </div>
      <p>订单中心</p>
    </div>
    <div class="mainBd">
      <div class="tabTop">
        <div
          class="tabli"
          v-for="(item,index) in tabList"
          :key="index"
          :style="{width:tabliWidth}"
          :class="sid == index?'on':''"
          @click="change(index)"
        >{{item}}</div>
      </div>
      <div class="tabBody" ref="tabBody">
        <div class="main_content" ref="main_content" style=" margin-top: 2px;">
          <ul class="orderList" v-if="orderList.length>=0">
            <li v-for="(orderItem,index) in orderList" :key="index">
              <div class="merchantNameList">
                <img
                  src="../assets/images/merchantName.png"
                  alt
                  style="width:40px; height:40px;margin-top: 30px;"
                />
                <div class="merchantName">{{orderItem.merchantName}}</div>
              </div>
              <div class="liTop">
                <div class="time">{{orderItem.createTime}}</div>
                <div class="state" v-if="orderItem.status == 0">待支付</div>
                <div class="state" v-else-if="orderItem.status == 1">待发货</div>
                <div class="state" v-else-if="orderItem.status == 2">待收货</div>
                <div class="state" v-else-if="orderItem.status == 3">已完成</div>
                <div class="state" v-else-if="orderItem.status == 4">已取消</div>
              </div>
              <div v-for="(item,index) in  orderItem.orderProductList" :key="index">
                <div class="liBody">
                  <div class="proImg">
                    <img :src="item.productPic" />
                  </div>
                  <div class="ProName_warp">
                    <div class="proName" v-if="item.productName">{{item.productName}}</div>
                    <div class="specName" v-if="item.specName">{{item.specName}}</div>
                  </div>
                  <div class="liPrice">
                    <p>￥ {{item.realAmount}}</p>
                    <p>x {{item.productQuantity}}</p>
                  </div>
                </div>
                <div class="orderMsg">
                  <!-- <p>实付款:￥{{item.productPrice*item.productQuantity}}</p>
                  <p>共{{orderItem.orderProductList[0].productQuantity}}件商品</p>-->
                </div>
              </div>

              <div class="detail">
                <div class="allThisLiPrice">
                  <div>合计:￥{{orderItem.totalAmount}}</div>
                  <!-- <div>(含运费￥10)</div> -->
                </div>
                <p
                  style="border:1px solid #555;color:#555"
                  class="dingdan"
                  @click="cancle(orderItem.id,orderItem.userId,index)"
                  v-if="(orderItem.status==0)||
                                (orderItem.status==4)||(orderItem.status==3)"
                >删除订单</p>
                <p
                  v-if="orderItem.status == 2"
                  style="border:1px solid #555;color:#555"
                  @click="goExpress"
                >物流详情</p>
                <p
                  v-if="((orderItem.status == 2)||(orderItem.status == 1))&&((orderItem.refundStatus==0)||(orderItem.refundStatus==3))"
                  style="border:1px solid #555;color:#555"
                  @click.stop="ReturnApply(orderItem.orderProductList)"
                >退货</p>
                <p
                  v-if="((orderItem.status == 2)||(orderItem.status == 1))&&(orderItem.refundStatus==1)"
                  style="border:1px solid #555;color:#555"
                >退货中</p>
                <p @click="toOrderDetail(index)">订单详情</p>
              </div>
            </li>
          </ul>
          <div v-if="orderList.length<=0">
            <div class="order_img_bg position_center">
              <img src="../assets/images/noOrder.png" alt class="order_icon position_center" />
            </div>
            <div class="order_text1 position_center">您还没有相关的订单</div>
            <div class="order_text2 position_center">可以去看看有哪些想买的</div>
          </div>
        </div>
        <!-- <p @click="toOrderDetail(index)">订单详情</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Order",
  components: {},
  props: {},
  computed: {
    tabliWidth() {
      return 100 / this.tabList.length + "%";
    }
  },
  data() {
    return {
      globalUrl: this.$global.globalUrl, //获取全局变量
      tabList: ["全部", "待支付", "待发货", "待收货", "已完成"],
      sid: 0,
      orderList: [],
      pageNum: 1,
      pageSize: 10,
      getDataId: -1,
      isHttp: true
    };
  },
  watch: {
    srcoll: function(e) {}
  },
  created() {
    console.log("传参", this.$route.query);
    console.log("查看store信息", this.$store.state.orderState);
    this.getData(this.getDataId);
  },
  mounted() {
    window.addEventListener("scroll", this.menu, true);
    this.orderList = [];
    this.setHeight();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.menu, true);
  },
  methods: {
    setHeight() {
      var clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
      this.$refs.order.style.height = clientHeight + "px"; //输入框页面挤压问题解决
      this.$refs.main_content.style.height = clientHeight - 207 + "px";
    },
    ReturnApply(item) {
      console.log(item);
      this.$router.push({
        path: "/returnApply",
        query: {
          orderId: item[0].orderId
        }
      });
    },
    goExpress() {
      this.$router.push({ path: "express" });
    },
    getData(id) {
      console.log("获取参数", id);
      var that = this;
      var data = {
        orderStatus: id,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$post(this.globalUrl + "order/getOrderInfoList.do", data).then(
        res => {
          console.log(res);
          if (res.code != 0) {
            this.$toastMessage({ message: res.msg, time: 3000 });
          }
          if (res.data.length == 0) {
            this.isHttp = false;
          } else {
            for (var i = 0; i < res.data.length; i++) {
              this.orderList.push(res.data[i]);
            }
          }

          // this.orderList = [...this.orderList, ...res.data]
        }
      );
    },
    goBack() {
      this.$router.go(-1)
    },
    change(i) {
      this.$delayFun(() => {
        this.sid = i;
        console.log("点击的参数", i);
        if (i == 0) {
          console.log("获取全部的订单");
          this.isHttp = true;
          this.pageNum = 1;
          this.getData(-1);
          this.getDataId = -1;
        } else if (i == 1) {
          console.log("获取待支付的订单");
          this.isHttp = true;
          this.pageNum = 1;
          this.getData(0);
          this.getDataId = 0;
        } else if (i == 2) {
          console.log("获取待发货的订单");
          this.isHttp = true;
          this.pageNum = 1;
          this.getData(1);
          this.getDataId = 1;
        } else if (i == 3) {
          console.log("获取待收货的订单");
          this.isHttp = true;
          this.pageNum = 1;
          this.getData(2);
          this.getDataId = 2;
        } else if (i == 4) {
          console.log("获取已完成的订单");
          this.isHttp = true;
          this.pageNum = 1;
          this.getData(3);
          this.getDataId = 3;
        }
        this.orderList = [];
      }, 500);
    },
    toOrderDetail(i) {
      var that = this;
      this.$delayFun(() => {
        // console.log("自定义防止多次点击提交",i,that.orderList[i]);
        this.$router.push({
          path: "/orderDetail",
          query: { sid: that.orderList[i].id, state: that.orderList[i].status }
        });
      }, 500);
    },
    menu() {
      // console.log("66666666666666")
      var that = this;
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      this.scroll = scrollTop;
      //滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight - 1) {
        //写后台加载数据的函数
        if (this.isHttp) {
          this.pageNum = this.pageNum + 1;
          this.getData(this.getDataId);
        }
      }
    },
    cancle(id, userId, index) {
      console.log(index);
      var params = {
        orderInfoIds: id,
        userId: userId
      };
      this.$post(this.globalUrl + "order/deleteOrderInfo.do", params).then(
        res => {
          if (res.code == 0) {
            this.orderList.splice(index, 1);
          }
        }
      );
    }
  }
};
</script>
<style scoped lang="stylus">
.position_center {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

.order_img_bg {
  top: 396px;
  width: 150px;
  height: 150px;
  border-radius: 150px;
  background: -webkit-linear-gradient(top, #eb9e61 0%, #e4774b 100%);
}

.noData {
  width: 100%;
  height: 700px;
  position: absolute;
  top: 104px;
  left: 0;
}

.order_icon {
  top: 0;
  bottom: 0;
  width: 102px;
}

.order_text1 {
  top: 580px;
  color: #313131;
}

.order_text2 {
  top: 644px;
  color: #929292;
  font-size: 24px;
}

.dingdan {
  margin-left: 50px;
}

.ProName_warp {
  display: flex;
  flex-direction: column;
}

.merchantNameList {
  display: flex;
  flex-direction: row;
}

.merchantName {
  margin-top: 30px;
  text-align: left;
  font-size: 30px;
  margin-left: 10px;
}

.tabBody {
  overflow: hidden;

  .main_content {
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

img {
  display: block;
  max-width: 100%;
}

.order {
  max-width: 750px;
  margin: 0 auto;
  background: #eee;
  height: auto;
  overflow: hidden;
}

.top {
  height: 100px;
  line-height: 100px;
  background: #fe2045;
  overflow: hidden;

  .backBtn {
    position: fixed;
    left: 24px;
    top: 32px;
    width: 58px;
  }

  p {
    text-align: center;
    color: #fff;
  }
}

.tabTop {
  background: #FFFFFF;
  display: flex;

  .tabli {
    padding: 20px 0;

    &.on {
      color: #e85d36;
      border-bottom: 4px solid #e85d36;
    }
  }
}

.orderList {
  li {
    background: #FFFFFF;
    margin-top: 20px;
    padding: 0 20px;
    font-size: 28px;

    .orderMsg {
      display: flex;
      flex-direction: row-reverse;

      p {
        margin-right: 20px;
      }
    }

    .liTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #999;

      .time {
        color: #666666;
      }

      .state {
        color: #e85d36;
      }
    }

    .orderMsg {
      border-bottom: 1px solid #999;
      padding-bottom: 20px;
    }

    .liBody {
      display: flex;
      padding: 20px 0;

      &.liBodyArr {
        flex-wrap: wrap;
        border-bottom: none;

        .proImg {
          min-width: 20%;
          max-width: 160px;
          margin: 6px;
          max-height: 160px;
        }
      }

      .proImg {
        width: 200px;
        height: 200px;
        overflow: hidden;
      }

      .proName {
        font-size: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        width: 348px;
        -webkit-box-orient: vertical;
        height: 69px;
        margin-left: 23px;
        text-align: justify;
      }

      .specName {
        text-align: left;
        height: 69px;
        margin-left: 23px;
        margin-top: 20px;
        color: #666;
      }

      .liPrice {
        flex: 1;
        text-align: right;
      }
    }

    .detail {
      padding: 20px 0;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .allThisLiPrice {
        width: 221px;
        text-align: left;

        > div {
          display: inline-block;
        }
      }

      p {
        color: #e85d36;
        border: 1px solid #e85d36;
        width: 100px;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 21px;
        text-align: center;
        margin-left: 24px;
      }
    }
  }
}
</style>