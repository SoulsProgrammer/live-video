<template>
  <div class="ReturnDetail_warp" ref="ReturnDetail_warp" v-if="dom">
    <div class="head">
      <img src="../assets/images/backNoBg.png" alt class="backBtn" @click.stop="goblack" />
      <div class="head_text">退款详情</div>
    </div>
    <div class="main_content" v-if="status==0" ref="main_content">
      <div>
        <div class="title">
          <div class="title_text">请等待商家处理</div>
          <div class="time">{{returnDetail.createTime}}</div>
        </div>
        <div class="dec">你已成功发起退款申请，请耐心等待商家处理</div>
        <div class="tishi">
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">商家同意，系统将退款给您</div>
          </div>
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">如果商家拒绝，您可以修改退款申请后再次发起，商家会重新处理</div>
          </div>
          <div class="againBtn" @click="agaginApply">修改申请</div>
        </div>
        <div class="detail_warp">
          <div class="detail_title">退款信息</div>
          <div class="detail" v-for="(item,index) in returnDetail.orderProductList" :key="index">
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
          <div class="cause">退款原因：{{returnDetail.refundDesc}}</div>
          <div class="return_price">退款金额：{{returnDetail.refundPrice}}</div>
        </div>
      </div>
    </div>
    <!--等待商家处理-->
    <div class="main_content" v-if="(status==2)" ref="main_content">
      <div>
        <div class="title">
          <div class="title_text">退款成功</div>
          <div class="time">{{returnDetail.createTime}}</div>
        </div>
        <div class="dec">商家同意退款，交易支持退款</div>
        <div class="return_price_tishi">
          <div class="AllPrice_text">退款总金额</div>
          <div class="AllPrice">￥{{returnDetail.refundPrice}}</div>
        </div>
        <div class="detail_warp">
          <div class="detail_title">退款信息</div>
          <div class="detail" v-for="(item,index) in returnDetail.orderProductList" :key="index">
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
          <div class="cause">退款原因：{{returnDetail.refundDesc}}</div>
        </div>
      </div>
    </div>
    <!--未发货发货商家同意-->
    <div class="main_content" v-if="(status==1)" ref="main_content">
      <div>
        <div class="title">
          <div class="title_text">请退货并填写物流信息</div>
          <div class="time">{{returnDetail.createTime}}</div>
        </div>
        <div class="dec">商家已同意退货申请，请尽早退货</div>
        <div class="merchant_detail">
          <img src="../assets/images/receiveGood.png" alt class="receiveGood" />
          <div class="merchant_warp">
            <div class="top_warp">
              <div class="merchant_person">收货人：{{returnDetail.mchName}}</div>
              <div class="number">{{returnDetail.mchMobile}}</div>
            </div>
            <div class="address">{{returnDetail.mchAddress}}</div>
          </div>
        </div>
        <div class="logistics_detail">
          <div class="logistics_order_num">
            <div class="logistics_title">物流单号：</div>
            <input type="text" placeholder="请填写物流单号" class="input input1" v-model="input1" />
          </div>
          <div class="logistics_order_num">
            <div class="logistics_title">物流公司：</div>
            <input type="text" placeholder="请填写物流公司" class="input input2" v-model="input2" />
          </div>
          <div class="logistics_order_num">
            <div class="logistics_title">联系电话：</div>
            <input type="number" placeholder="请填写联系电话" class="input input3" v-model="input3" />
          </div>
        </div>
        <div class="tishi">
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物</div>
          </div>
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">请填写真实退货物流信息，否则退货申请将关闭</div>
          </div>
        </div>
        <div class="detail_warp">
          <div class="detail_title">退款信息</div>
          <div class="detail" v-for="(item,index) in returnDetail.orderProductList" :key="index">
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
          <div class="cause">退款原因：{{returnDetail.refundDesc}}</div>
        </div>
        <div class="bottom_space"></div>
      </div>
    </div>
    <!--已发货商家同意-->
    <div class="main_content" v-if="status==4" ref="main_content">
      <div>
        <div class="title">
          <div class="title_text">退货中</div>
          <div class="time">{{returnDetail.createTime}}</div>
        </div>
        <div class="dec">商家收到商品后，将退款</div>
        <div class="merchant_detail">
          <img src="../assets/images/receiveGood.png" alt class="receiveGood" />
          <div class="merchant_warp">
            <div class="top_warp">
              <div class="merchant_person">收货人：{{returnDetail.mchName}}</div>
              <div class="number">{{returnDetail.mchMobile}}</div>
            </div>
            <div class="address">{{returnDetail.mchAddress}}</div>
          </div>
        </div>
        <div class="logistics_detail">
          <div class="logistics_order_num">
            <div class="logistics_title">物流单号：{{returnDetail.userExpressNo}}</div>
          </div>
          <div class="logistics_order_num">
            <div class="logistics_title">物流公司：{{returnDetail.userExpress}}</div>
          </div>
          <div class="logistics_order_num">
            <div class="logistics_title">联系电话：{{returnDetail.userMobile}}</div>
          </div>
        </div>
        <div class="tishi">
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物</div>
          </div>
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">请填写真实退货物流信息，否则退货申请将关闭</div>
          </div>
        </div>
        <div class="detail_warp">
          <div class="detail_title">退款信息</div>
          <div class="detail" v-for="(item,index) in returnDetail.orderProductList" :key="index">
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
          <div class="cause">退款原因：{{returnDetail.refundDesc}}</div>
        </div>
        <div class="bottom_space"></div>
      </div>
    </div>
    <!--客户已发货-->
    <div class="main_content" v-if="status==3" ref="main_content">
      <div>
        <div class="title">
          <div class="title_text">退款失败</div>
          <div class="time">{{returnDetail.createTime}}</div>
        </div>
        <div class="dec">商家拒绝退款</div>
        <div class="tishi">
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">商家同意，系统将退款给您</div>
          </div>
          <div class="tishi_warp">
            <img src="../assets/images/dian.png" alt class="dian" />
            <div class="tishi_text">如果商家拒绝，您可以修改退款申请后再次发起，商家会重新处理</div>
          </div>
          <div class="againBtn" @click="agaginApply">修改申请</div>
        </div>
        <div class="return_price_tishi">
          <div class="AllPrice_text">退款总金额</div>
          <div class="AllPrice">￥{{returnDetail.refundPrice}}</div>
        </div>
        <div class="detail_warp">
          <div class="detail_title">退款信息</div>
          <div class="detail" v-for="(item,index) in returnDetail.orderProductList" :key="index">
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
          <div class="cause">退款原因：{{returnDetail.refundDesc}}</div>
        </div>
      </div>
    </div>
    <!--商家拒绝-->
    <div class="submit_btn" @click="submitBtn" v-if="status==1">提交</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dom: false,
      returnDetail: Object,
      status: 0,
      input1: "",
      input2: "",
      input3: "",
      isSend: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    goblack() {
      if (this.$route.query.from == "order") {
        this.$router.replace({
          path: "/order"
        });
      } else {
        this.$router.replace({
          path: "/return",
          query: { from: "ReturnDetail" }
        });
      }
    },
    setHeight() {
      var clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度
      this.$refs.ReturnDetail_warp.style.height = clientHeight + "px"; //设置页面高度
      this.$refs.main_content.style.height = clientHeight - 102 + "px";
      //console.log("aaa");
    },
    getReturnDetail() {
      if (this.$route.query.orderRefundId) {
        var data = {
          orderRefundId: this.$route.query.orderRefundId
        };
      } else if (this.$route.query.orderId) {
        var data = {
          orderId: this.$route.query.orderId
        };
      }

      this.$post(this.$global.globalUrl + "orderRefund/detail.do", data).then(
        res => {
          //console.log(res);
          this.returnDetail = res.data.orderRefund;
          this.status = res.data.orderRefund.status;
          this.isSend = res.data.orderRefund.isSend;
          this.dom = true;
          var that = this;
          var TimeOut1;
          TimeOut1 = setTimeout(function() {
            that.setHeight();
          }, 100);
        }
      );
    },
    agaginApply() {
      this.$router.push({
        path: "/returnApply",
        query: { orderId: this.returnDetail.orderId, id: this.returnDetail.id }
      });
    },
    isPhoneNum(str) {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
        str
      );
    },
    submitBtn() {
      if (this.input1 == "") {
        this.$toastMessage({ message: "请填写物流单号", time: 2000 });
        return;
      }
      if (this.input2 == "") {
        this.$toastMessage({ message: "请填写物流公司", time: 2000 });
        return;
      }
      if (this.input3 == "") {
        this.$toastMessage({ message: "请填写手机号", time: 2000 });
        return;
      }
      if (!this.isPhoneNum(this.input3)) {
        this.$toastMessage({ message: "请填写正确手机号", time: 2000 });
        return;
      }
      var data = {
        id: this.returnDetail.id,
        userExpress: this.input2,
        userExpressNo: this.input1,
        userMobile: this.input3
      };
      this.$post(this.$global.globalUrl + "orderRefund/update.do", data).then(
        res => {
          if (res.code == 0) {
            this.$toastMessage({ message: "提交成功", time: 2000 });
          }
        }
      );
    }
  },
  created() {
    this.getReturnDetail();
  },
  mounted() {
    // this.setHeight();
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
.bottom_space {
  width: 750px;
  height: 100px;
}

.ReturnDetail_warp {
  width: 750px;
  background: #f5f5f5;
  color: #1e1f21;
  overflow: hidden;

  .head {
    position: relative;
    width: 750px;
    height: 100px;
    background: #fe2045;
    z-index: 1000;

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
      color: #ffffff;
    }
  }

  .main_content {
    display: flex;
    flex-direction: column;
    text-align: left;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-top: -2px;

    .title {
      display: flex;
      flex-direction: column;
      width: 750px;
      height: 212px;
      background: #ff003c;
      color: #f7fefd;
      font-size: 28px;

      .title_text {
        margin-top: 54px;
        margin-left: 54px;
      }

      .time {
        margin-left: 54px;
        margin-top: 20px;
      }
    }

    .dec {
      font-size: 26px;
      color: #868886;
      height: 90px;
      width: 730px;
      background: #ffffff;
      line-height: 90px;
      padding: 0 0 0 20px;
      margin-bottom: 2px;
    }

    .tishi {
      width: 750px;
      height: 266px;
      background: #ffffff;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      font-size: 26px;
      color: #868886;
      position: relative;

      .return_explain {
        margin: 30px 0 0 60px;
        font-size: 28px;
        color: #666666;
      }

      .tishi_warp {
        display: flex;
        flex-direction: row;
        margin: 30px 0 0 20px;

        .dian {
          width: 40px;
          height: 40px;
        }

        .tishi_text {
          width: 600px;
        }
      }

      .againBtn {
        position: absolute;
        width: 162px;
        height: 61px;
        border-radius: 5px;
        border: 2px solid #ed0007;
        bottom: 20px;
        right: 20px;
        color: #ed0007;
        text-align: center;
        line-height: 61px;
        font-size: 29px;
      }
    }

    .return_price_tishi {
      width: 690px;
      height: 100px;
      background: #ffffff;
      margin-bottom: 2px;
      font-size: 28px;
      color: #1e1f21;
      padding: 0 30px 0 30px;
      justify-content: space-between;
      display: flex;
      flex-direction: row;

      .AllPrice_text {
        margin-top: 30px;
      }

      .AllPrice {
        margin-top: 30px;
        color: #fb023b;
      }
    }

    .merchant_detail {
      width: 690px;
      padding: 0 30px 30px 30px;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      font-size: 28px;
      color: #666666;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 2px;

      .receiveGood {
        width: 40px;
        height: 40px;
        margin-top: 84px;
      }

      .merchant_warp {
        display: flex;
        flex-direction: column;
        width: 627px;
        font-size: 28px;
        color: #666666;

        .top_warp {
          margin-top: 30px;
          display: flex;
          flex-direction: row;
          width: 627px;
          justify-content: space-between;
        }

        .address {
          margin-top: 20px;
        }
      }
    }

    .logistics_detail {
      width: 750px;
      display: flex;
      font-size: 28px;
      color: #666666;
      flex-direction: column;
      background: #ffffff;
      margin-top: 30px;

      .logistics_order_num {
        width: 750px;
        display: flex;
        flex-direction: row;
        border-bottom: 2px solid #f5f5f5;

        .logistics_title {
          margin: 30px 0 30px 30px;
        }

        .input {
          width: 500px;
          height: 58px;
          margin-top: 20px;
          border: none;
          inset-inline: none;
          outline: none;
          font-size: 26px;
          color: #666666;
        }
      }
    }

    .detail_warp {
      background: #ffffff;
      font-size: 28px;
      color: #1e1f21;
      display: flex;
      flex-direction: column;

      .detail_title {
        margin: 30px 0 30px 30px;
      }

      .detail {
        width: 750px;
        height: 208px;
        display: flex;
        flex-direction: row;
        background: #f6f6f6;

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
            color: #898989;
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
              color: #898989;
            }
          }
        }
      }

      .cause {
        margin-left: 30px;
        color: #898989;
        font-size: 26px;
        height: 80px;
        line-height: 80px;
      }

      .return_price {
        margin-left: 30px;
        color: #898989;
        font-size: 26px;
        margin-bottom: 30px;
      }
    }
  }

  .submit_btn {
    width: 750px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    background: #ff003c;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #ffffff;
  }
}
</style>