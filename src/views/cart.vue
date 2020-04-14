<template>
  <div class="cartBd">
    <div class="top">
      <div class="backBtn">
        <img src="../assets/images/backNoBg.png" alt @click="goBack" />
      </div>
      <p>购物车</p>
    </div>

    <div class="noData" v-if="list.length <= 0">
      <div> 
        <img src="../assets/images/noChartsItem.png" alt="" class="no-data-pic">
      </div>
      <div class="desc">购物车快饿瘪了T.T</div>
      <div class="desc-sm">快给我挑点宝贝吧</div>
    </div>
    <div v-else>
      <div class="title">
        <div class="selectAll">
          <div class="selectIcon" @click="chooseAll">
            <div v-if="allSelected">
              <img src="../assets/images/sure.png" />
            </div>
            <div v-else>
              <img src="../assets/images/unsure.png" />
            </div>
            <span>全选</span>
          </div>
        </div>
        <div class="delete" @click="showDeleteModal">删除</div>
      </div>

      <div class="proList" ref="proList">
        <ul v-for="(list,n) in list" :key="n">
          <div class="merchant">{{list[0].merchantName}}</div>
          <li v-for="(item,index) in list" :key="index">
            <div class="liIcon" @click="changeItem(n,index)">
              <img src="../assets/images/sure.png" v-if="item.select" />
              <img src="../assets/images/unsure.png" v-else />
            </div>
            <div class="liContent">
              <div class="clip" @click="changeItem(n,index)">
                <img :src="item.productPic" />
              </div>
              <div class="txt">
                <p class="name">{{item.productName}}</p>
                <div style="font-size:28px; color:#666">{{item.productAttr}}</div>
                <div class="price_btn_warp">
                  <p class="price">￥{{item.price}}</p>
                  <div class="btn">
                    <div class="delBtn" @click="del(n,index)" v-if="item.delBtnState">-</div>
                    <div class="delBtn userNone" v-else>-</div>
                    <div class="buyNum">
                      <div class="liNum">{{item.quantity}}</div>
                    </div>
                    <div class="addBtn" @click="add(n,index)" v-if="item.addBtnState">+</div>
                    <div class="addBtn userNone" v-else>+</div>
                  </div>
                </div>
                <!-- <p class="stock">库存：{{item.stock}}</p> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottomView">
        <div>免运费</div>
        <div class="finalAllPrice">合计:￥{{allPrice}}</div>
        <div class="settle" @click="settleAll">结算</div>
      </div>
    </div>
    <div class="confirm-modal" v-if="showModal">
      <transition name="scale">
        <div v-if="showModal" class="confirm-box">
          <div>
            <p style="padding: 28px">确认删除收藏的商品吗</p>
            <div class="buttons">
              <div @click="hideModal">取消</div>
              <div @click="cancelConfig">确认</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="showLoading" v-if="showLoading">
      <img src="@/assets/images/loadHttp.gif" alt class="showLoading-icon"/>
    </div>
  </div>
</template>

<script>
// import global from "../api/common.js";
export default {
  name: "Cart",
  components: {},
  props: {},
  created() {
    // //console.log("获取数据",this.global)
    this.getCartData();
  },
  data() {
    return {
      globalUrl: this.$global.globalUrl, //获取全局变量
      allSelected: true,
      list: [],
      allPrice: 0,
      clientHeight: 0,
      showModal: false,
      showLoading: false,
    };
  },
  mounted() {
    // this.getAllPrice();
    var that = this;
    setTimeout(function() {
      that.setHeight();
    }, 100);
  },
  methods: {
    setHeight() {
      this.clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
      if(this.$refs.proList){
        this.$refs.proList.style.height = this.clientHeight - 335 + "px"; //输入框页面挤压问题解决
      }
      
    },
    chooseAll() {
      // //console.log("全选")
      if (this.allSelected) {
        this.allSelected = false;
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < this.list[i].length; j++) {
            this.list[i][j].select = false;
          }
        }
      } else {
        this.allSelected = true;
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < this.list[i].length; j++) {
            this.list[i][j].select = true;
          }
        }
      }
      this.getAllPrice();
    },
    changeItem(n, index) {
      if (this.list[n][index].select) {
        this.list[n][index].select = false;
        this.allSelected = false;
      } else {
        this.list[n][index].select = true;
        var j = this.chooseNum(this.list);
        if (j === this.list.length) {
          this.allSelected = true;
        }
      }
      this.getAllPrice();
    },
    chooseNum(arr) {
      var k = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].select) {
          k++;
        }
      }
      return k;
    },
    del(n, i) {
      // //console.log("-----")
      if (this.list[n][i].quantity > 1) {
        this.list[n][i].quantity -= 1;
      }

      this.changeQuantity(
        this.list[n][i].quantity,
        this.list[n][i].id,
        this.list[n][i].productId,
        this.list[n][i].specDetailId
      );
      // this.getAllPrice();
    },
    add(n, i) {
      //console.log("+++++");
      if (this.list[n][i].quantity < this.list[n][i].stock) {
        this.list[n][i].quantity += 1;
        // this.list[n][i].quantity = parseInt(this.list[n][i].quantity);
      }
      //console.log(this.list[n][i].quantity);
      //console.log("增加", this.list[n][i].quantity, this.list[n][i].id);
      this.changeQuantity(
        this.list[n][i].quantity,
        this.list[n][i].id,
        this.list[n][i].productId,
        this.list[n][i].specDetailId
      );
    },
    changeQuantity(num, id, proid, specDetailId) {
      var data = {
        id: id,
        quantity: num,
        productId: proid,
        specDetailId: specDetailId
      };
      this.$post(this.globalUrl + "goods/updateShoppingCartNum.do", data).then(
        res => {
          //console.log("改变数据", res);

          this.getAllPrice();
        }
      );
    },
    getAllPrice() {
      var that = this;
      //console.log(this.list);
      var temp = 0;
      for (var i = 0; i < this.list.length; i++) {
        var thisPrice = 0;
        for (var j = 0; j < this.list[i].length; j++) {
          if (this.list[i][j].select) {
            thisPrice = this.list[i][j].price * this.list[i][j].quantity;
            temp += thisPrice;
            if (parseInt(this.list[i][j].quantity) === 1) {
              this.list[i][j].delBtnState = false;
            } else {
              this.list[i][j].delBtnState = true;
            }
            if (this.list[i][j].quantity >= this.list[i][j].stock) {
              this.list[i][j].addBtnState = false;
            } else {
              this.list[i][j].addBtnState = true;
            }
          }
        }
      }
      this.allPrice = temp.toFixed(2);
      //console.log(this.allPrice);
    },
    getCartData() {
      var that = this;
      var data = {
        pageNum: 1,
        pageSize: 1000
      };
      this.$post(this.globalUrl + "goods/getShoppingCartList.do", data).then(
        res => {
          this.showLoading = false;
          //console.log(res);
          if (res.code != 0) {
            // this.$toastMessage({ message: res.msg, time: 3000 });
          }
          that.list = [];
          var tempList = res.data;
          for (var i in tempList) {
            that.list.push(tempList[i]);
          }
          //console.log(that.list);

          // for(var i in tempList){
          //   tempList = tempList[i]
          // }
          // that.list = tempList;
          that.allSelected = true;
          this.getAllPrice();
        }
      );
    },
    // changeInput(i) {
    //   //console.log(i);
    //   //console.log(this.list[i].quantity, this.list[i].stock);
    //   if (!this.list[i].quantity) {
    //     this.list[i].quantity = 1;
    //   }
    //   if (this.list[i].quantity > this.list[i].stock) {
    //     //console.log("库存已超出");
    //     this.list[i].quantity = this.list[i].stock;
    //   }
    //   this.changeQuantity(
    //     this.list[i].quantity,
    //     this.list[i].id,
    //     this.list[i].productId,
    //     this.list[i].specDetailId
    //   );
    // },
    settleAll() {
      this.$delayFun(() => {
        //console.log("结算结果：", this.list);
        var json = "";
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < this.list[i].length; j++) {
            if (!this.list[i][j].specDetailId) {
              this.list[i][j].specDetailId = 0;
            }
            if (this.list[i][j].select) {
              var temp =
                this.list[i][j].productId +
                ":" +
                this.list[i][j].specDetailId +
                ":" +
                this.list[i][j].quantity +
                ":" +
                this.list[i][j].anchorId +
                ":" +
                this.list[i][j].liveRoomId;
              json = json + "," + temp;
            }
          }
        }
        var newJson = json.substr(1, json.length);
        //console.log("---------", newJson);
        this.$router.push({ path: "/orderSub", query: { list: newJson } });
      }, 500);
    },
    deletePro() {
      var sendStr = "";
      for (var i = 0; i < this.list.length; i++) {
        for (var j = 0; j < this.list[i].length; j++) {
          if (this.list[i][j].select) {
            sendStr = sendStr + this.list[i][j].id + ",";
          }
        }
      }
      sendStr = sendStr.substring(0, sendStr.length - 1);
      this.deleteString(sendStr);
    },
    deleteString(str) {
      var that = this;
      if(str == null || str == ''){
        that.hideModal();
        this.$toastMessage({ message: "至少选择一条", time: 2000 });
      } else {
        var data = {
          ids: str
        };
        this.showLoading = true;
        this.$post(this.globalUrl + "goods/deleteShoppingCart.do", data).then(
          res => {
            if (res.code == "0") {
              this.getCartData();
            } else {
              this.showLoading = false;
            }
            that.hideModal();
            this.$toastMessage({ message: res.msg, time: 2000 });
          }
        );
      }
    },
    goBack() {
      //console.log("返回按钮");
      this.$router.go(-1);
    },
    hideModal() {
      this.showModal = false;
    },
    showDeleteModal() {
      this.showModal = true;
    },
    cancelConfig() {
      var that = this;
      this.showModal = false;
      this.$delayFun(() => {
        that.deletePro();
      }, 500);
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../assets/css/main.css"
.position_center{
  position absolute
  top 0
  left 0
  right 0
}
.noData{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-100%)
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
  .text1{
    top 527px;
  }
  .text2{
    top 587px;
    color #969696
    font-size 24px;
  }

.merchant {
  width: 100%;
  text-align: left;
  background: #fff;
  padding: 30px 0 30px 80px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}

.price_btn_warp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.userNone {
  color: #cccccc;
}

img {
  display: block;
}

.cartBd {
  max-width: 750px;
  margin: 0 auto;
  background: #eee;
  height: auto;
  min-height: 100%;
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
  }

  p {
    text-align: center;
    color: #fff;
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;

  .selectAll {
    .selectIcon {
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }
}

.proList {
  margin-top: 20px;
  overflow-y: scroll;

  ul {
    padding-bottom: 33px;

    li {
      background: #FFFFFF;
      padding: 20px;
      display: flex;
      align-items: center;

      .liIcon {
        min-width: 50px;
      }

      .liContent {
        display: flex;
        align-items: center;
        flex: 1;
        height: 200px;

        .clip {
          width: 200px;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          min-width: 200px;
          border-radius: 10px;

          img {
            width: 100%;
          }
        }

        .txt {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          height: 200px;
          min-width: 260px;
          margin: 0 10px;

          .name {
            font-size: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            width: 435px;
            -webkit-box-orient: vertical;
          }

          .price {
            font-size: 30px;
            color: #f65b09;
          }

          .stock {
            color: #666666;
            font-size: 30px;
          }
        }

        .btn {
          display: flex;
          align-items: center;
          border: 1px solid #999999;
          border-radius: 10px;
          width: 148px;

          >div {
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;

            &.delBtn {
              font-size: 36px;
            }
          }

          .buyNum {
            border-left: 1px solid #999999;
            border-right: 1px solid #999999;
            overflow: hidden;

            .liNum {
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              border: none;
              font-size: 26px;
              outline: none;
            }
          }
        }
      }
    }

    li~li {
    }
  }
}

.bottomView {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  line-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 20px;
  border-top: 1px solid #eee;
  background: #FFFFFF;

  >div {
    width: 33%;

    &.finalAllPrice {
      min-width: 280px;
      color: #ff0000;
    }
  }

  .settle {
    width: 200px;
    background: #fe2045;
    color: #FFFFFF;
  }
}
</style>