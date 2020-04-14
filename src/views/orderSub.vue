<template>
  <div class="pages">
    <div class="head">
      <img src="../assets/images/backNoBg.png" alt @click="back" />
      填写订单
    </div>
    <div class="address">
      <div v-if="address" class="info">
        <div>
          <span>{{address.name}}</span>
          <span>{{address.phoneNumber}}</span>
        </div>
        <div>收货地址：{{address.province}} {{address.city}} {{address.region}} {{address.detailAddress}}</div>
      </div>
      <div v-if="!address" @click="toAddress" class="info">
        <div>当前没有收货地址</div>
      </div>
      <div @click="toAddress">选择地址 ></div>
    </div>
    <div class="goodsList">
      <div class="goods" v-for="(item,index) in productList" :key="index">
        <div class="clip">
          <img :src="item.pic" alt />
        </div>
        <div class="goodsInfo">
          <div class="name">{{item.name}}</div>
          <div class="product">{{item.useSpec == '01'?item.specDetail.showName:item.specName}}</div>
          <div>
            <span class="price">¥{{item.useSpec == '01'?item.specDetail.price:item.price}}</span>
            <span>x{{item.productNum}}</span>
          </div>
        </div>
      </div>
      <div class="wrap4" @click="RedpackShow">
        <div class="huod">红包</div>
        <img src="../assets/images/hongbao.jpg" alt class="hongbao" />
        <div class="hongbao_text" ref="hongbaotext" v-if="RedPack.length>0">有红包可用</div>
        <div class="hongbao_text" ref="hongbaotext" v-if="RedPack.length<=0">暂无红包</div>
        <div class="shuoming" ref="shuoming">红包省钱卡，开卡本单立减</div>
        <img src="../assets/images/xiaojiantou.png" alt class="xiaojiantou" />
      </div>
    </div>
    <div class="orderNote">
      <span>订单备注：</span>
      <textarea name id cols="20" rows="10" maxlength="100" v-model="note"></textarea>
    </div>
    <!-- <div class="orderPrice">
			<div>
				商品金额<span>¥ {{}}</span>
			</div>
			<div>
				运费<span>¥ 0.01</span>
			</div>
    </div>-->
    <div class="orderBtn">
      <span>
        合计：
        <span>¥ {{nowTotalPrice}}</span>
      </span>
      <div @click="toBuy">提交订单</div>
    </div>
    <transition name="fade" @click="hideModal">
      <div v-if="showModal" class="modal">
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
    <div v-if="showModal||redPackShow" class="mask" @click="hideModal"></div>
    <transition name="fade">
      <div class="parameter" v-if="redPackShow">
        <div class="modal" style="width:750px; height:961px; padding-left:0;padding-right:0;">
          <div class="parameter_title">可用红包</div>
          <div class="parameter_detail_warp">
            <div class="no-data">
              <img src="@/assets/images/noRedPack.png" alt="" class="no-data-pic">
              <div class="no-data-desc">暂无红包可用哦</div>
            </div>

            <div class="scrol_warp" v-if="RedPack.length>0">
              <div
                class="box"
                v-for="(item,index) in RedPack"
                :key="index"
                @click.stop="selecteCause(index)"
              >
                <div class="left">
                  ￥
                  <div class="price">{{item.packetNum}}</div>
                </div>
                <div class="right">
                  <div class="title">惠生活购物红包</div>
                  <ul class="ul">
                    <li>有效天数：{{item.days}}</li>
                    <li>领取时间：{{item.startTime}}</li>
                  </ul>
                  <div class="circled" v-if="item.select=='true'">
                    <img src="../assets/images/right.png" alt class="right_dui" />
                  </div>
                  <div class="circle" v-else></div>
                </div>
              </div>
            </div>
          </div>
          <div class="parameter_btn" @click.stop="RedBtn">确定</div>
        </div>
      </div>
      <!--参数弹出框-->
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      redPrice: 0,
      urpIds: 0,
      redPackShow: false,
      global: this.$global,
      address: "",
      productList: [],
      isShowCheck: false,
      totalPrice: "",
      nowTotalPrice: "",
      productIds: "",
      note: "",
      RedPack: [],
      showModal: false,
      orderNo: "", // 订单编号
      payNo: "", //支付单号
      payType: 1 //1支付宝 2微信 3和包
    };
  },
  components: {},
  methods: {
    RedBtn() {
      this.redPackShow = false;
    },
    selecteCause(index) {
      for (var i = 0; i < this.RedPack.length; i++) {
        this.RedPack[i].select = "false";
      }
      this.RedPack[index].select = "true";
      this.$forceUpdate();
      this.$refs.shuoming.innerHTML = this.RedPack[index].packetNum;
      this.$refs.hongbaotext.innerHTML = "已使用红包立减";
      this.$refs.hongbaotext.style.color = "#000000";
      this.urpIds = this.RedPack[index].id;
      this.redPrice = this.RedPack[index].packetNum;
      this.nowTotalPrice = this.totalPrice - this.redPrice;
      //console.log(this.urpIds);
    },
    back() {
      this.$router.go(-1);
    },
    toBuy() {
      var that = this;
      this.$delayFun(() => {
        //console.log("自定义防止多次点击提交");
        if (!that.address) {
          console.log("请选择收货地址");
          this.$toastMessage({message:"请选择收货地址",time: 2000})
          return;
        }
        var arr = that.productIds.split(",");
        //console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].split(":");
          arr[i].splice(3, 0, String(that.productList[i].merchantId));
          //console.log(arr[i]);
          arr[i] = arr[i].join(":");
        }
        var params = {
          addressId: that.address.id,
          productIds: arr.join(","),
          urpIds: this.urpIds
        };
        if (that.note != "") {
          params.note = that.note;
        }
        this.$post(that.global.globalUrl + "order/submitOrder.do", params).then(
          res => {
            //console.log(res);
            if (res.code == 0) {
              that.showModal = true;
              that.orderNo = res.data.orderNos;
            } else if (res.code != 0) {
              this.$toastMessage({ message: res.msg, time: 3000 });
            }
          }
        );
      }, 500);
    },
    toPay() {
      var that = this;
      ////console.log(that.orderNo)

      this.$delayFun(() => {
        //console.log("自定义防止多次点击提交");
        var params = {
          orderSns: that.orderNo,
          payType: that.payType
        };
        if (that.payType == 1) {
          //console.log("打钱给支付宝");
          this.$post(that.global.globalUrl + "pay/createPay.do", params).then(
            res => {
              //console.log(res);
              if (res.code != 0) {
                this.$toastMessage({ message: res.msg, time: 3000 });
              } else {
                this.$zfbPay(res.data);
                this.$router.replace({
                  name: "checkPayment",
                  params: {
                    orderSn: this.orderNo
                  }
                });
              }
            }
          );
        } else if (that.payType == 2) {
          //console.log("打钱给微信");
          this.$post(that.global.globalUrl + "pay/createPay.do", params).then(
            res => {

              if (res.code != 0) {
                this.$toastMessage({ message: res.msg, time: 3000 });
              } else {
                this.$wxPay(res.data);
                this.$router.replace({
                  name: "checkPayment",
                  params: {
                    orderSn: this.orderNo
                  }
                });
              }
            }
          );
        } else if (that.payType == 3) {
          //console.log("打钱给和包");
          this.$post(that.global.globalUrl + "pay/createPay.do", params).then(
            res => {
              //console.log(res);
              if (res.code != 0) {
                this.$toastMessage({ message: res.msg, time: 3000 });
              } else {
                //console.log(res);
                ////console.log(params.username)
                this.$hbPay(res.data, params.username);
                this.$router.replace({
                  name: "checkPayment",
                  params: {
                    orderSn: this.orderNo
                  }
                });
              }
            }
          );
        }
        setTimeout(() => {}, 500);
      }, 500);
    },
    RedpackShow() {
      this.redPackShow = true;
      this.showModal = false;
    },
    changePayType(e) {
      this.payType = e;
      //console.log(this.payType);
    },
    toAddress() {
      this.$router.push({ path: "/address", query: { from: "order" } });
    },
    hideModal() {
      this.redPackShow = false;
      this.showModal = false;
    },
    chooseAdd(e) {
      //console.log(e);
    },
    getUserDefaultAddress() {
      var that = this;
      var params = {
        timestamp: Date.parse(new Date()) / 1000
      };
      this.$post(
        that.global.globalUrl + "userAddress/getUserDefaultAddress.do",
        params
      ).then(res => {
        if (res.code != 0) {
          this.$toastMessage({ message: res.msg, time: 3000 });
        }
        //console.log(res);

        that.address = res.data;
      });
    },
    preSubOrder() {
      var that = this;
      //console.log(that.productIds);
      var params = {
        productIds: that.productIds,
        timestamp: Date.parse(new Date()) / 1000
      };
      this.$post(that.global.globalUrl + "order/preSubOrder.do", params).then(
        res => {
          if (res.code != 0) {
            this.$toastMessage({ message: res.msg, time: 3000 });
          }
          //console.log(res);
          that.productList = res.data.productList;
          that.totalPrice = res.data.totalPrice;
          that.nowTotalPrice = res.data.totalPrice;
          that.RedPack = res.data.userRedPacketList;
          //console.log(that.RedPack);
        }
      );
    }
  },
  created() {
    this.address = this.global.addressChoose;
    if (this.$route.query.list) {
      this.productIds = this.$route.query.list;
    } else {
      this.productIds = this.$route.query.productIds;
    }
    //console.log(this.$route.query.list);
    //console.log(this.$route.query.productIds);
    this.getUserDefaultAddress(); //获取默认收货地址
    this.preSubOrder(this.$route.query.productIds); //获取待提交订单
  }
};
</script>

<style lang="stylus" scoped>
.circled {
  position: absolute;
  right: 26px;
  top: 0px;
  bottom: 0px;
  width: 42px;
  height: 42px;
  margin: auto;
  border-radius: 40px;
  background: #ff003c;
  margin: auto;

  .right_dui {
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
  top: 0px;
  bottom: 0px;
  margin: auto;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid #8d8d8d;
}

.scrol_warp {
  background: #f5f5f5;

  .box {
    width: 750px;
    border-radius: 5px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    margin: 20px 0px;
    position: relative;
    border-radius: 10px;

    .left {
      align-items: center;
      display: flex;
      flex-direction: row;
      color: #f94359;
      font-weight: bold;
      width: 158px;
      justify-content: center;

      .price {
        font-size: 50px;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin: 30px 30px;

      .title {
        font-weight: bold;
      }

      .ul {
        margin-left: 26px;
        margin-top: 26px;

        >li {
          font-size: 24px;
          color: #b5b5b5;
        }
      }
    }
  }
}

.scrol_warp {
  background: #f5f5f5;

  .box {
    width: 750px;
    border-radius: 5px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    margin: 20px 0px;
    position: relative;
    border-radius: 10px;

    .left {
      align-items: center;
      display: flex;
      flex-direction: row;
      color: #f94359;
      font-weight: bold;
      width: 158px;
      justify-content: center;

      .price {
        font-size: 50px;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin: 30px 30px;

      .title {
        font-weight: bold;
      }

      .ul {
        margin-left: 26px;
        margin-top: 26px;

        >li {
          font-size: 24px;
          color: #b5b5b5;
        }
      }
    }
  }
}

.parameter {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10000;
}

.parameter .modal {
  padding-left: 30px;
  padding-right: 30px;
  width: 690px;
}

.parameter_title {
  height: 150px;
  line-height: 150px;
  font-size: 35px;
  font-weight: 510;
  border-bottom: 2px solid #f5f5f5;
}

.parameter_detail_warp {
  display: flex;
  flex-direction: column;
  height: 672px;
  overflow-Y: scroll;

  .parameter_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 0 30px 0;
    border-bottom: 1px solid #e5e5e5;

    .parameter_name {
      width: 150px;
      font-size: 30px;
    }

    .parameter_content {
      width: 500px;
      color: #5d5d5d;
      text-align: left;
      font-size: 28px;
    }
  }
  .no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
  .no-data-desc {
    margin-top: 40px;
    text-align: center;
  }
}

.parameter_btn {
  background-color: #fe2045;
  text-align: center;
  border-radius: 50px;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  width: 690px;
  height: 88px;
  line-height: 88px;
  color: #ffffff;
}

.wrap4 {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  padding-top: 40px;
  padding-bottom: 30px;
  background: #ffffff;
  position: relative;

  .huod {
    font-size: 24px;
    margin-left: 10px;
    color: #858585;
  }

  .hongbao {
    width: 21px;
    height: 25px;
    margin-left: 50px;
    margin-top: 5px;
  }

  .hongbao_text {
    font-size: 24px;
    color: #ff0000;
    margin-left: 5px;
  }

  .shuoming {
    font-size: 24px;
    margin-left: 5px;
  }

  .xiaojiantou {
    width: 19px;
    height: 28px;
    position: absolute;
    right: 25px;
    top: 44px;
  }
}

.clip {
  width: 200px;
  height: 200px;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-width: 200px;
  border-radius: 10px;
  margin-right: 20px;
}

.pages {
  background: #f5f5f5;
  min-height: calc(100%);
  height: auto;
  padding-bottom: 150px;
}

.head {
  text-align: center;
  position: relative;
  height: 92px;
  width: 750px;
  line-height: 92px;
  font-weight: 500;
  font-size: 32px;
  background: #fe2045;
  color: #fff;

  img {
    position: absolute;
    top: 32px;
    left: 20px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  transform: translateY(1000px);
  opacity: 1;
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 750px;
  z-index: 998;
  background: rgba(0, 0, 0, 0.2);
}

.modal {
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
  // display flex
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

.address {
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  padding: 30px;
  color: #666;

  >div:last-child {
    white-space: nowrap;
    font-size: 28px;
    margin-left: 20px;
  }

  span {
    font-size: 34px;
    color: #000000;
    font-weight: 500;
    margin-right: 30px;
  }

  .info {
    height: 100px;
    font-size: 28px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    div:last-child {
      font-size: 26px;
    }
  }
}

.goodsList {
  margin-top: 20px;

  .goods~.goods {
    border-top: 1px solid #ccc;
  }
}

.goods {
  padding: 20px;
  background: #fff;
  display: flex;

  img {
    width: 200px;
  }

  .goodsInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    height: 180px;
    margin: 10px 0;
    width: 480px;

    .product {
      font-size: 26px;
      font-weight: 400;
      line-height: 32px;
      padding: 10px;
      text-indent: 0;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-indent: 10px;
      font-size: 32px;
    }

    .name {
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      color: #000;
    }
  }
}

.orderPrice {
  padding: 30px;
  background: #fff;
  margin-top: 20px;
  margin-bottom: 140px;

  div {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 32px;
  }

  span {
    color: #f02037;
  }

  div~div {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 20px;
  }
}

.orderBtn {
  height: 60px;
  background: #fff;
  line-height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  border-top: 1px solid #ccc;

  span {
    span {
      color: #f02037;
      font-weight: bold;
    }
  }

  div {
    width: 200px;
    color: #fff;
    height: 60px;
    border-radius: 30px;
    line-height: 60px;
    font-size: 30px;
    background: #fe2045;
  }
}

.orderNote {
  padding: 20px 30px;
  background: #fff;
  margin-top: 20px;
  text-align: left;

  span {
    font-size: 30px;
  }

  textarea, textarea:focus {
    text-indent: 2em;
    margin-top: 10px;
    width: 690px;
    border: 1px solid #000;
    border-radius: 5px;
    height: 120px;
    font-size: 24px;
    color: #888;
    outline: none;
  }
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

.payBtn {
  width: 200px;
  color: #fff;
  margin: 50px auto 0;
  height: 60px;
  border-radius: 10px;
  line-height: 60px;
  font-size: 32px;
  background: #fe2045;
}
</style>
