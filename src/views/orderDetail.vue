<template>
  <div class="orderDetail">
    <div class="top">
      <div class="backBtn">
        <img src="../assets/images/backNoBg.png" alt @click="goBack" />
      </div>
      <p>订单详情</p>
    </div>

    <div class="state">
      <p v-if="stateIndex == 0">
        <img src="@/assets/images/cargo.png" alt srcset class="cargo_img" />
        待支付
      </p>
      <p v-else-if="stateIndex == 1">
        <img src="@/assets/images/cargo.png" alt srcset class="cargo_img" />待发货
      </p>
      <p v-else-if="stateIndex == 2">
        <img src="@/assets/images/cargo.png" alt srcset class="cargo_img" />待收货
      </p>
      <p v-else-if="stateIndex == 3">
        <img src="@/assets/images/cargo.png" alt srcset class="cargo_img" />已完成
      </p>
      <p v-else>已取消</p>
    </div>

    <div class="detailBody">
      <div class="listPro">
        <ul>
          <li v-for="(item,index) in detailMsg.orderProductList" :key="index">
            <div class="leftImg clip">
              <img :src="item.productPic" />
            </div>
            <div class="rightDetail">
              <div class="proName">{{item.productName}}</div>
              <div class="specJson">{{item.specName}}</div>
              <!-- <div class="specJson">XS,柠檬奶油</div> -->
              <div class="proConfig">
                <div class="price red">￥ {{item.productPrice}}</div>
                <div class="proNum">x {{item.productQuantity}}</div>
              </div>
              <div class="contact-kefu" @click="chat(item.serviceUser)">
                <img src="@/assets/images/kefu.png" alt class="kefu_icon" />
                <span class="icon_desc">联系卖家</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="orderMsg">
        <div class="orderNo">
          订单编号：
          <span id="orderNo" style="padding-top:5px">{{detailMsg.orderSn}}</span>
          <span
            class="copyOrderBtn"
            data-clipboard-action="copy"
            data-clipboard-target="#orderNo"
            @click="copyOrderNo"
          >复制</span>
        </div>
        <div class="creatTime">
          创建时间：
          <span style="padding-top:5px">{{detailMsg.createTime}}</span>
        </div>
        <div class="deliverySn" v-if="detailMsg.deliverySn">
          物流单号：
          <span>{{detailMsg.deliverySn}}</span>
        </div>
        <div class="deliverySn" v-if="detailMsg.deliverySn">
          物流公司：
          <span>{{detailMsg.deliveryCompany}}</span>
        </div>
        <div class="orderPrice">
          <p>商品金额</p>
          <p>￥ {{detailMsg.totalAmount}}</p>
        </div>
        <div class="finalPrice">合计：￥ {{detailMsg.totalAmount}}</div>
      </div>
    </div>

    <div class="bottomBtns" v-if="stateIndex != 3 && stateIndex != 1 && stateIndex != 4">
      <div class="cancelOrder" v-if="stateIndex == 0" @click="Modal(1)">取消订单</div>
      <div class="payNow" @click="toBuy" v-if="stateIndex == 0">立即支付</div>
      <div class="sureGet payNow" v-if="stateIndex == 2" @click="Modal(2)">确认收货</div>
      <!-- <div class="sureGet" v-if="stateIndex == 2" @click="checkLogis">查看物流</div> -->
    </div>
    <transition name="fade">
      <div class="modal-wrapper" v-if="showModal">
        <div v-if="showModal" class="modal">
          <div>
            <p v-if="modalType == 1">确认取消订单吗</p>
            <p v-else-if="modalType == 2">确认收货吗</p>
            <div class="buttons">
              <div @click="hideModal">关闭</div>
              <div @click="cancelConfig">确认</div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showPayModal" class="modalPay">
        <div class="payTitle">支付方式</div>
        <div class="payMode">
          <div class="aliPay" @click="changePayType(1)">
            <img class="payImg" src="../assets/images/aliPayIcon.png" />
            <div class="payName">支付宝支付</div>
            <div class="setDefault" :style="payType == 1?'background:#e63027':''">
              <div></div>
            </div>
          </div>
          <div class="tenPay" @click="changePayType(2)">
            <img class="payImg" src="../assets/images/wxPayIcon.png" />
            <div class="payName">微信支付</div>
            <div class="setDefault" :style="payType == 2?'background:#e63027':''">
              <div></div>
            </div>
          </div>
          <div class="hbPay" @click="changePayType(3)">
            <img class="payImg" src="../assets/images/hbPayIcon.png" />
            <div class="payName">和包支付</div>
            <div class="setDefault" :style="payType == 3?'background:#e63027':''">
              <div></div>
            </div>
          </div>
        </div>

        <div class="payBtn" @click="toPay">支付</div>
      </div>
    </transition>
    <div v-if="showPayModal" class="mask" @click="hideModal"></div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "OrderDetail",
  components: {},
  props: {},
  data() {
    return {
      globalUrl: this.$global.globalUrl, //获取全局变量
      list: [
        {
          productName: "商品一",
          price: 10,
          stock: 5
        },
        {
          productName: "商品二",
          price: 20,
          stock: 9
        }
      ],
      detailMsg: {},
      stateIndex: 0,
      orderId: 0,
      payType: 1, //1支付宝 2微信 3和包
      showModal: false,
      modalType: 0,
      showPayModal: false,
      orderSn: ""
    };
  },
  watch: {},
  created() {
    //console.log("创建完成");
    //console.log(
    //   "传参id",
    //   this.$route.query.sid,
    //   "状态参数",
    //   this.$route.query.state
    // );
    this.orderId = this.$route.query.sid;

    this.getDetailMsg(this.$route.query.sid);
    this.stateIndex = this.$route.query.state;
  },
  mounted() {
    //console.log("挂载完成");
  },

  methods: {
    hideModal() {
      this.showModal = false;
      this.showPayModal = false;
    },
    Modal(e) {
      this.showModal = true;
      this.modalType = e;
    },
    goBack() {
      //console.log("返回按钮");
      this.$router.go(-1);
    },
    checkOrderStatus() {
      // 检查订单
    },
    sureGet() {
      //console.log("确认收货", this.stateIndex, this.orderId);
      var that = this;
      var data = {
        id: this.orderId,
        status: 3
      };
      this.$post(this.globalUrl + "order/updateOrderInfo.do", data).then(
        res => {
          //console.log(res);
          if (res.code == 0) {
            this.$toastMessage({ message: res.msg, time: 3000 });
            this.$router.go(-1);
          } else {
            this.$toastMessage({ message: res.msg, time: 3000 });
          }
        }
      );
    },
    //一键复制订单号
    copyOrderNo() {
      let clipboard = new Clipboard(".copyOrderBtn");
      clipboard.on("success", () => {
        this.$toastMessage({ message: "复制成功", time: 2000 });
      });
      clipboard.on("error", () => {
        this.$toastMessage({ message: "复制失败,未知错误", time: 2000 });
      });
    },
    //联系卖家
    chat(kefuInfo) {
      if (kefuInfo !== null) {
        let kefuId = kefuInfo.id;
        let nickName = kefuInfo.nickname || "客服";
        let myUserId = kefuInfo.userId;
        let myUserName = localStorage.getItem("userName");
        // this.$router.push({
        //   name: "chat",
        //   params: {
        //     kefuId: kefuId,
        //     kefuName: nickName,
        //     myUserId: myUserId,
        //     myUserName: myUserName
        //   }
        // });
        //测试连接，上线时要更改
        window.location.href = `https://living.appcoo.com/h5/mall-service/chat.html?kefuId=${kefuId}&kefuName=${nickName}&myUserId=${myUserId}&myUserName=${myUserName}`;
      } else {
        this.$toastMessage({ message: "暂时无在线客服", time: 2000 });
      }
    },
    cancelConfig() {
      var that = this;
      this.$delayFun(() => {
        that.showModal = true;
        if (that.modalType == 1) {
          that.cancelOrder();
        } else {
          that.sureGet();
        }
      }, 500);
    },
    cancelOrder() {
      var that = this;

      //console.log("取消订单", this.stateIndex, this.orderId);
      var data = {
        id: this.orderId,
        status: 4
      };
      this.$post(this.globalUrl + "order/updateOrderInfo.do", data).then(
        res => {
          //console.log(res);
          if (res.code == 0) {
            this.$toastMessage({ message: res.msg, time: 3000 });
            this.$router.go(-1);
          } else {
            this.$toastMessage({ message: res.msg, time: 3000 });
          }
        }
      );
    },
    changePayType(e) {
      this.payType = e;
      //console.log(this.payType);
    },
    toBuy() {
      var that = this;
      this.$delayFun(() => {
        //console.log("自定义防止多次点击提交");
        this.showPayModal = true;
      }, 500);
    },
    toPay() {
      var that = this;
      this.$delayFun(() => {
        //console.log("自定义防止多次点击提交");
        var params = {
          orderSns: that.detailMsg.orderSn,
          payType: that.payType,
          timestamp: Date.parse(new Date()) / 1000
        };

        if (that.payType == 1) {
          //console.log("打钱给支付宝");
          this.$router.replace({
            name: "checkPayment",
            params: {
              orderSn: this.detailMsg.orderSn
            },
            query: {
              orderSnss: this.detailMsg.orderSn
            }
          });
          this.$post(this.globalUrl + "pay/createPay.do", params).then(res => {
            //console.log(res);
            if (res.code != 0) {
              this.$toastMessage({ message: res.msg, time: 3000 });
            } else {
              this.$zfbPay(res.data);
            }
          });
        } else if (that.payType == 2) {
          this.$router.replace({
            name: "checkPayment",
            params: {
              orderSn: this.detailMsg.orderSn
            },
            query: {
              orderSnss: this.detailMsg.orderSn
            }
          });
          //console.log("打钱给微信");
          this.$post(this.globalUrl + "pay/createPay.do", params).then(res => {
            //console.log(res);
            this.$wxPay(res.data);
          });
        } else if (that.payType == 3) {
          this.$router.replace({
            name: "checkPayment",
            params: {
              orderSn: this.detailMsg.orderSn
            },
            query: {
              orderSnss: this.detailMsg.orderSn
            }
          });
          //console.log("打钱给和包");
          this.$post(this.globalUrl + "pay/createPay.do", params).then(res => {
            //console.log(res);
            if (res.code != 0) {
              this.$toastMessage({ message: res.msg, time: 3000 });
            } else {
              //console.log(res);
              this.$hbPay(res.data, params.username);
            }
          });
        }
      }, 500);
    },
    checkLogis() {
      //console.log("查看物流");
    },
    getDetailMsg(id) {
      var that = this;
      var data = {
        orderId: id
      };
      this.$post(this.globalUrl + "order/getOrderInfo.do", data).then(res => {
        //console.log(res);
        that.detailMsg = res.data;
        console.log(that.detailMsg);
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  transform: translateY(100%);
  opacity: 1;
}

.orderNo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.creatTime {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 750px;
  z-index: 998;
  background: rgba(0, 0, 0, 0.2);
}

.payBtn {
  width: 200px;
  color: #fff;
  margin: 50px auto 0;
  height: 60px;
  border-radius: 10px;
  line-height: 60px;
  font-size: 32px;
  background: linear-gradient(to top right, #6195ef, #357df5, #1669f3);
}

.setDefault {
  position: relative;
  height: 40px;
  width: 40px;
  background: #999;
  border-radius: 50%;
  margin-right: 40px;

  div {
    position: absolute;
    top: 11px;
    left: 11px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
  }
}

.modalPay {
  width: 750px;
  height: 560px;
  margin: 0 auto;
  background: #fff;
  border-radius: 30px 30px 0 0;
  border: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  z-index: 999;
  overflow-y: auto;
  overflow: hidden;
}

.payTitle {
  margin: 30px;
  font-size: 36px;
  font-size: 500;
}

.payMode {
  .aliPay, .tenPay, .hbPay {
    font-size: 30px;
    text-align: left;
    margin: 30px 0 0 60px;
    display: flex;
    align-items: center;
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #dcdcdc;
  }

  .payImg {
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }

  .payName {
    flex: 1;
  }
}

.modal-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);

  .modal {
    padding: 30px 50px;
    width: 300px;
    height: 200px;
    margin: 0 auto;
    background: #fefefe;
    border-radius: 10px;
    border: 1px solid #ccc;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    overflow-y: auto;
    overflow: hidden;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;

    >div {
      border: 1px solid #EEEEEE;
      border-radius: 10px;
      height: 60px;
      padding: 10px 20px;
      line-height: 60px;
      width: 25%;
    }
  }
}

.state {
  margin-bottom: 20px;
  background: #FFFFFF;
  padding: 20px;
  text-align: left;
  background: #fff;

  p {
    color: #fe2045;
    display: flex;
    align-items: center;
  }

  .cargo_img {
    margin-right: 10px;
  }
}

.red {
  color: #FF0000;
}

img {
  display: block;
  max-width: 100%;
}

.orderDetail {
  max-width: 750px;
  margin: 0 auto;
  background: #eee;
  height: auto;
  min-height: 100%;
}

.top {
  height: 100px;
  line-height: 100px;
  background: #fe2045;
  overflow: hidden;
  color: #fff;

  .backBtn {
    position: fixed;
    left: 24px;
    top: 32px;
  }

  p {
    text-align: center;
  }
}

.listPro {
  background: #FFFFFF;

  ul {
    li~li {
      border-top: 1px solid #999;
    }

    li {
      padding: 20px 0;
      margin: 0 20px;
      display: flex;

      .clip {
        width: 200px;
        height: 200px;
        overflow: hidden;
        display: flex;
        align-items: center;

        img {
          width: 100%;
        }
      }

      .rightDetail {
        flex: 1;
        padding: 10px 40px 10px 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .proName {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 426px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-box-pack: left;
          -webkit-box-align: left;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          font-size: 28px;
        }

        .specJson {
          font-size: 28px;
          color: #666;
          text-align: left;
        }

        .proConfig {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}

.orderMsg {
  margin-top: 20px;
  text-align: left;
  background: #FFFFFF;
  padding: 20px;
  font-size: 28px;

  >div {
    display: flex;
    margin: 10px 0;

    >span {
      color: #666666;
    }

    .copyOrderBtn {
      border: 1px solid #666;
      border-radius: 5px;
      padding: 0 20px;
      margin-left: auto;
    }
  }

  .orderPrice {
    justify-content: space-between;
  }

  .finalPrice {
    flex-direction: row-reverse;
  }
}

.contact-kefu {
  padding: 10px 0;
  display: flex;
}

.kefu_icon {
  width: 35px;
  height: 35px;
  margin-top: 5px;
  margin-right: 10px;
}

.bottomBtns {
  position: fixed;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-top: 1px solid #eee;

  >div {
    width: 160px;
    border: 1px solid #666;
    padding: 10px;
    border-radius: 10px;
    margin-right: 20px;
  }

  .payNow {
    color: #FF0000;
    border: 1px solid #FF0000;
  }
}

.detailBody {
  padding-bottom: 100px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;

  >div {
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    height: 100px;
    line-height: 100px;
    width: 50%;
  }

  >div:active {
    background: #eee;
  }
}

.modal p {
  line-height: 100px;
}
</style>
