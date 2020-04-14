<template>
  <div style>
    <img src="../assets/images/shopBg.jpg" alt class="shopBg" v-if="show" />
    <div class="shop_wrapper" v-else>
      <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in imgList" :key="index" style="height:750px">
            <img class="headImg" :src="item" alt />
          </swiper-slide>
          <!-- <swiper-slide><img src="../assets/images/product_img1.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="../assets/images/product_img1.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/images/product_img1.jpg" alt=""></swiper-slide>-->
          <!-- Optional controls -->
          <!-- <div class="swiper-paginationa" slot="pagination"></div> -->
        </swiper>
        <!-- <div class="pagination_bg"></div> -->
        <img src="../assets/images/backBg.png" alt class="fanhui" @click="black" />

        <img src="../assets/images/shareBg.png" alt class="share_img" @click="share" />

        <!-- <img src="../assets/images/shopcar2.png" alt class="shopcar2" @click="openCar" /> -->
        <!-- <img src="../assets/images/more.png" alt class="more" @click="openOrder" /> -->
      </div>
      <div class="main_warp">
        <div class="main">
          <div class="jiage">
            ¥
            <span>{{goodsInfo.price}}</span>
            <span class="oriPrice">¥{{goodsInfo.originalPrice}}</span>
          </div>
          <div class="wrap1">
            <div class="detail">{{goodsInfo.name}}</div>
            <!-- <img src="../assets/images/share2.png" alt="" class="share2"> -->
          </div>
          <!-- <div class="wrap2">
            <div class="left box">
              <img src="../assets/images/dianzan.png" alt="">
              <span>5962</span>
            </div>
            <div class="box">
              <img src="../assets/images/liwu.png" alt="">
              <span>送给TA</span>
            </div>
            <div class="right box">
              <img src="../assets/images/bangwoxuan.png" alt="">
              <span>帮我选</span>
            </div>
          </div>-->
          <div class="wrap3">
            <div class="fashuo">发货</div>
            <div class="dizhi">
              <!-- <img src="../assets/images/zuobiao.png" alt="" class="zuobiao" style="width:17px;height:24px"> -->
              <!-- <div class="dizhidetail">湖北武汉</div> -->
              <div class="kuaidi">快递：</div>
              <div class="yunfei">免运费</div>
            </div>
            <div class="xiaoliang">月销{{goodsInfo.sale}}</div>
          </div>
          <div class="wrap4" @click="redPack_show">
            <div class="huod">红包</div>
            <img src="../assets/images/hongbao.jpg" alt class="hongbao" />
            <div class="hongbao_text" ref="hongbaotext" v-if="RedPack.length>0">有红包可用</div>
            <div class="hongbao_text" ref="hongbaotext" v-if="RedPack.length<=0">暂无红包可用</div>
            <div class="shuoming" ref="shuoming">红包省钱卡，开卡本单立减</div>
            <img src="../assets/images/xiaojiantou.png" alt class="xiaojiantou" />
          </div>
          <div class="wrap5">
            <div class="fuwu">库存</div>
            <div class="fuwu_detail">{{goodsInfo.stock}}件</div>
            <!-- <img src="../assets/images/xiaojiantou.png" alt="" class="xiaojiantou2"> -->
          </div>

          <div class="wrap3" @click.stop="select" v-if="selectType!=null">
            <div class="fashuo">选择</div>
            <div class="dizhi">
              <div class="kuaidi">
                <span v-if="!selected">选择</span>
                <span v-else>已选择</span>
                <span v-for="(item,index) in selectType" :key="index">
                  <span style="padding:5px;" v-if="!selected">{{item.specName}}</span>
                </span>
                <span v-for="(item,index) in selectArr" :key="index+'selectArr'">
                  <span style="padding:5px;" v-if="item!=''">{{'"'+item+'"'}}</span>
                </span>
              </div>
              <div class="yunfei"></div>
              <img src="../assets/images/xiaojiantou.png" alt class="xiaojiantou2" />
            </div>
          </div>
          <div class="wrap5" @click.stop="Parameter">
            <div class="fuwu">参数</div>
            <div class="fuwu_detail">品牌 品名...</div>
            <img src="../assets/images/xiaojiantou.png" alt class="xiaojiantou2" />
          </div>
          <div class="proDetail">
            <span class="baobei">
              <span style="color:#d6d6d6">————</span> 宝贝详情
              <span style="color:#d6d6d6">————</span>
            </span>
            <!-- <img src="../assets/images/product_img1.jpg" alt=""> -->
          </div>
          <p id="detail_warp" v-html="msg"></p>
        </div>
      </div>
      <div class="bottom">
        <!-- <div class="dianpu">
          <img src="../assets/images/dianpu.png" alt class="dianpu_img" />
          <span class="dianpu_text">店铺</span>
        </div>-->
        <div class="kefu" @click="contactKefu">
          <img src="../assets/images/kefu.png" alt class="kefu_img" />
          <span class="kefu_text">客服</span>
        </div>
        <div class="cart" @click="openCar">
          <img src="../assets/images/cart_icon.png" alt class="cart_img" />
          <span class="cart_text">购物车</span>
        </div>

        <div class="shoucang" @click="collect">
          <img v-if="!isCollect" src="../assets/images/coll_icon01.png" alt class="shoucang_img" />
          <img v-else src="../assets/images/coll_icon02.png" alt class="shoucang_img" />
          <span class="shoucang_text">收藏</span>
        </div>

        <img src="../assets/images/addcar.png" alt class="addcar_img" @click="addCar" />
        <img src="../assets/images/nowshop.png" alt class="nowshop_img" @click="toBuy" />
      </div>
      <transition name="fade">
        <div v-if="showModal" class="modal">
          <div style="overflow-y: auto;height: 1100px;">
            <div class="proSelected">
              <div class="clip">
                <img :src="goodsInfo.pic" alt />
              </div>
              <div class="info">
                <div>
                  <span>¥</span>
                  <span class="price">{{price}}</span>
                </div>
                <div class="proNum">库存 {{stock}}</div>
                <div class="selected" style="color:#555;" v-if="selected">
                  已选:
                  <span v-for="(item,index) in selectArr" :key="index">
                    <span
                      style="padding:5px; color:#555;"
                      v-if="item!=''&&item!=undefined"
                    >{{'"'+item+'"'}}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="wrap wrap-sku">
              <div class="product-box">
                <div class="product-content">
                  <div
                    class="product-delcom"
                    v-for="(ProductItem,n) in simulatedDATA.specifications"
                    :key="n"
                  >
                    <div class="proName">{{ProductItem.name}}</div>
                    <ul class="product-footerlist clearfix">
                      <li
                        v-for="(oItem,index) in ProductItem.item"
                        :key="index"
                        v-on:click="specificationBtn(oItem.name,n,$event,index)"
                        窗口
                        v-bind:class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']"
                      >{{oItem.name}}</li>
                    </ul>
                  </div>
                  <!-- <p v-if="price" class="price"></p> -->
                </div>
                <div class="goodsNum">
                  数量
                  <div>
                    <span :class="goodsNum == 1?'setGoodsNum':''" @click="setGoodsNum(0)">-</span>
                    <input @input="input" v-model="goodsNum" type="number" />
                    <span :class="goodsNum<stock?'':'goodsNumStatus'" @click="setGoodsNum(1)">+</span>
                  </div>
                </div>
                <div class="total-price">
                  <span class="desc">总价</span>
                  <span class="price-num">¥{{goodsNum*price}}</span>
                </div>
                <div class="product-footer" @click="carOrBuy">
                  <a href="javascript:" rel="external nofollow">确认</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div v-if="showModal||showParameter||shareShow||redPackShow" class="mask" @click="hideModal"></div>
      <transition name="fade">
        <div class="parameter" v-if="showParameter">
          <div class="modal">
            <div class="parameter_title">产品参数</div>
            <div class="parameter_detail_warp">
              <div>
                <div
                  class="parameter_item"
                  v-for="(item,index) in goodsInfo.paramList"
                  :key="index"
                >
                  <div class="parameter_name">{{item.paramName}}</div>
                  <div class="parameter_content">{{item.paramValue}}</div>
                </div>
              </div>
            </div>
            <div class="parameter_btn" @click.stop="parameterBtn">确定</div>
          </div>
        </div>
        <!--参数弹出框-->
      </transition>
      <transition name="share">
        <div class="share_box" v-if="shareShow">
          <div class="share_item">
            <img src="../assets/images/wx.png" alt class="wx" @click.stop="shareWx" />
            <span class="wx_name">好友</span>
          </div>
          <div class="share_item">
            <img src="../assets/images/fridend.png" alt class="wx" @click.stop="pengyouquan" />
            <span class="wx_name">朋友圈</span>
          </div>
          <div class="cancle_share" @click.stop="cancle_share">取消</div>
        </div>
      </transition>
      <transition name="fade">
        <div class="parameter" v-if="redPackShow">
          <div class="modal" style="width:750px;padding-left:0;padding-right:0;">
            <div class="parameter_title">可用红包</div>
            <div class="parameter_detail_warp" style="justify-content: center">
              <div class="red-pack-con">
                <img
                  src="@/assets/images/noRedPack.png"
                  alt
                  v-if="RedPack.length<=0"
                  class="no-red-pack"
                />
                <div class="desc">暂无红包可用哦</div>
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
      <live-Video-min
        v-if="!minVideoHide"
        @minVideoHide="minVideoHideEvent"
        :list="minVideoList"
        @minPlayProgres="minPlayProgres"
      ></live-Video-min>
    </div>
  </div>
</template>

<script>
import LiveVideoMin from "@/components/LiveVideoMin.vue";
import global from "../api/common.js";
export default {
  components: {
    LiveVideoMin
  },
  props: {},
  data() {
    return {
      shareShow: false,
      redPackShow: false,
      msg: "",
      goodsId: 55,
      goodsInfo: "",
      pid: "",
      imgList: [], //头部轮播图
      global: this.global,
      simulatedDATA: {
        //模拟后台返回的数据 多规格
        difference: [
          // { //所有的规格可能情况都在这个数组里
          //   "id": "19",
          //   "price": "200.00",
          //   "stock": "0",
          //   "difference": "100,白色"
          // }
        ],
        specifications: [
          // { //这里是要被渲染字段
          //   "name": "尺寸",
          //   "item": [
          //     {
          //       "name": "100",
          //     },
          //     {
          //       "name": "200",
          //     }
          //   ]
          // }
        ]
      },
      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
      price: "0", //选中规格的价钱
      stock: "0", //选中规格的库存
      originalPrice: "0",
      weight: "0",
      widthOutPro: false,
      showModal: false,
      current: 1,
      orderType: 0,
      goodsNum: 1,
      kefuList: [],
      minVideoHide: false,
      PlayProgres: Number, //小视频当前播放时间
      swiperOption: {
        // 参数选项,显示小点
        watchSlidesProgress: true,
        slidesPerView: "auto",
        centeredSlides: true,
        //循环
        loop: true,
        //每张播放时长3秒，自动播放
        autoplay: {
          disableOnInteraction: false,
          delay: 2500
        },
        //滑动速度
        speed: 1000,
        pagination: {
          el: ".swiper-paginationa",
          type: "fraction"
        }

        // delay:1000
      },
      isCollect: false,
      minVideoList: {},
      isCollect: Boolean,
      beforeUrl: "",
      anchorId: Number,
      selectType: [],
      selected: false,
      showParameter: false,
      price_difference: "",
      RedPack: [],
      show: true,
      pic:""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //console.log(from.path);
      //console.log(vm.$store.state.routePath);
      if (from.path == "/ProductsSelected") {
        vm.$store.dispatch("chaneRoutePathASY", "/ProductsSelected");
      }
      if (from.path == "/follow") {
        vm.$store.dispatch("chaneRoutePathASY", "/follow");
      }
      if (from.path == "/followDetail") {
        vm.$store.dispatch("chaneRoutePathASY", "/followDetail");
      }
    }); /*获取上一级路由 */
  },
  watch: {
    stock() {
      this.goodsNum = 1;
    }
  },
  computed: {},
  methods: {
    selecteCause(index) {
      for (var i = 0; i < this.RedPack.length; i++) {
        this.RedPack[i].select = "false";
      }
      this.RedPack[index].select = "true";
      this.$forceUpdate();
      this.$refs.shuoming.innerHTML = this.RedPack[index].packetNum;
      this.$refs.hongbaotext.innerHTML = "已使用红包立减";
      this.$refs.hongbaotext.style.color = "#000000";
    },
    redPack_show() {
      this.redPackShow = true;
    },
    parameterBtn() {
      this.showParameter = false;
    } /*参数确定按钮 */,
    RedBtn() {
      this.redPackShow = false;
    },
    Parameter() {
      this.showParameter = true;
    } /*参数显示 */,
    addCar() {
      this.orderType = 0;
      this.showModal = true;
    },

    toBuy() {
      this.orderType = 1;
      this.showModal = true;
    },
    carOrBuy() {
      var that = this;
      //console.log(that.stock);
      this.$delayFun(() => {
        if (this.orderType == 2) {
          this.showModal = false;
          return;
        }
        // //console.log(this.simulatedDATA.specifications.length==0)
        if (
          parseInt(that.stock) == that.goodsInfo.stock &&
          that.simulatedDATA.specifications.length != 0
        ) {
          this.$toastMessage({ message: "添加失败！请选择规格！", time: 3000 });
          //console.log("添加失败！请选择规格！");
          return false;
        }
        //console.log("自定义防止多次点击提交");
        if (this.orderType == 1) {
          this.$router.push({
            path: "/orderSub",
            query: {
              productIds:
                this.goodsInfo.id +
                ":" +
                this.pid +
                ":" +
                this.goodsNum +
                ":" +
                this.anchorId +
                ":" +
                this.$route.query.RoomId
            }
          });
        } else {
          var params = {
            productId: that.goodsInfo.id,
            quantity: that.goodsNum,
            //price: that.price,
            productName: that.goodsInfo.name,
            productPic: that.goodsInfo.pic,
            specDetailId: that.pid,
            merchantId: that.goodsInfo.merchantId,
            liveRoomId: this.$route.query.RoomId,
            anchorId: that.anchorId,
            timestamp: Date.parse(new Date()) / 1000
          };
          this.$post(
            this.$global.globalUrl + "goods/saveShoppingCart.do",
            params
          ).then(res => {
            //console.log(res);
            this.$toastMessage({ message: "商品添加成功", time: 3000 });
            that.showModal = false;
            // this.$router.push({path:'/cart'})
            // //console.log(res.msg)
          });
        }
      }, 500);
    },
    setGoodsNum(e) {
      if (e && this.goodsNum < this.stock) {
        this.goodsNum = parseInt(this.goodsNum) + 1;
      } else if (!e && this.goodsNum > 1) {
        this.goodsNum = parseInt(this.goodsNum) - 1;
      }
    },
    openCar() {
      //console.log("打开购物车");
      this.$router.push({ path: "/cart" });
    },
    share() {
      this.shareShow = true;
    },
    shareShowed() {
      this.shareShow = true;
    },
    cancle_share() {
      this.shareShow = false;
    },
    shareWx() {
      var bridge = window["WebViewJavascriptBridge"];
      var jsonObj = {
        url: "https://living.appcoo.com/live/share/index.html",
        title: "惠直播，惠购物",
        flag: 0,
        subFlag: 0,
        description: "移动惠直播开播",
        imgUrl: this.pic
      };
      if (bridge) {
        bridge.callHandler("shareWebpage", JSON.stringify(jsonObj));
      }
    },
    pengyouquan() {
      var bridge = window["WebViewJavascriptBridge"];
      var jsonObj = {
        url: "https://living.appcoo.com/live/share/index.html",
        title: "惠直播，惠购物",
        flag: 0,
        subFlag: 1,
        description: "移动惠直播开播",
        imgUrl: this.pic
      };
      if (bridge) {
        bridge.callHandler("shareWebpage", JSON.stringify(jsonObj));
      }
    },
    //收藏/取消收藏
    collect() {
      let status;
      console.log(this.isCollect)
      if (!this.isCollect) {
        status = 1;
      } else {
        status = 2;
      }
      var params = {
        productId: this.$route.query.goodId,
        timestamp: Date.parse(new Date()) / 1000,
        liveRoomId: this.$route.query.RoomId,
        status: status
      };
      var that = this;
      this.$post(that.$global.globalUrl + "collect/save.do", params).then(
        res => {
          this.$toastMessage({ message: res.msg, time: 3000 });
          if (res.code == 0) {
            this.isCollect = !this.isCollect;
            that.getGoodsInfo();
          }
        }
      );
    },
    input(e) {
      //console.log(e.target.value);
      // this.goodsNum = e.target.value.replace(/[^\d]/g,'');
      if (e.target.value > this.stock) {
        this.goodsNum = parseInt(this.stock);
      }
    },
    hideModal() {
      this.showModal = false;
      this.showParameter = false;
      this.shareShow = false;
      this.redPackShow = false;
    },
    black() {
      var RoomId = this.$route.query.RoomId;
      var anchorId = this.$route.query.anchorId;
      var playStatus = this.$route.query.playStatus;
      //console.log(this.$route.query);
      //console.log("anchorId" + this.anchorId);
      this.beforeUrl = this.$store.state.routePath;
      if (this.beforeUrl == "/followDetail") {
        this.$router.push({
          path: this.beforeUrl,
          query: {
            videoShow: true,
            RoomId: RoomId,
            transitionName: true,
            PlayProgres: this.PlayProgres,
            anchorId: anchorId,
            playStatus: playStatus
          }
        });
      } else if (this.beforeUrl == "") {
        this.$router.go(-1);
      } else {
        this.$router.push({
          path: this.beforeUrl,
          query: {
            videoShow: true,
            RoomId: RoomId,
            transitionName: true,
            PlayProgres: this.PlayProgres,
            anchorId: anchorId,
            playStatus: playStatus
          }
        });
      }
    },
    minVideoHideEvent() {
      this.minVideoHide = true;
    },
    getGoodsInfo() {
      this.goodsId = this.$route.query.goodId;
      //console.log(this.goodsId);
      var that = this;
      //console.log(global.globalUrl);
      var params = {
        productId: that.goodsId,
        timestamp: Date.parse(new Date()) / 1000,
        liveRoomId: this.$route.query.RoomId
      };
      this.$post(global.globalUrl + "goods/getProductDetail.do", params).then(
        res => {
          //console.log(res);
          var that = this;
          var TimeOut5
         TimeOut5 =  setTimeout(function() {
           clearTimeout(TimeOut5)
            that.show = false;
          }, 500);
          this.pic = res.data.product.pic
          this.selectType = res.data.product.specList; /*获取选择类型 */
          this.RedPack = res.data.userRedPacketList;
          this.anchorId = res.data.anchorId;
          that.imgList = res.data.product.albumPics.split(",");
          that.goodsInfo = res.data.product;
          this.stock = this.goodsInfo.stock;
          this.kefuList = res.data.sysUserList;
          if (res.data.maxprice == res.data.minprice) {
            this.price_difference = res.data.maxprice;
            this.price = this.price_difference;
          } else {
            this.price_difference = res.data.minprice + "-" + res.data.maxprice;
            this.price = this.price_difference;
          }
          that.isCollect = res.data.isCollect;
          this.msg = res.data.product.detailDesc;
          this.msg = this.htmlDecodeByRegExp(this.msg);
          if (res.data.product.useSpecFlag == "0") {
            that.price = res.data.product.price; //选中规格的价钱
            that.stock = res.data.product.stock; //选中规格的库存
            that.originalPrice = res.data.product.originalPrice;
            that.weight = res.data.product.weight;
            that.pid = 0;
            that.widthOutPro = true;
            return false;
          }
          var arr = [];
          for (var i = 0; i < res.data.product.specList.length; i++) {
            var obj = {};
            var arr2 = [];
            var list = res.data.product.specList[i].specItemList;
            for (var j = 0; j < list.length; j++) {
              var obj2 = {};
              obj2.name = list[j].specItemName;
              arr2.push(obj2);
            }
            obj.name = res.data.product.specList[i].specName;
            obj.item = arr2;
            arr.push(obj);
          }
          that.simulatedDATA.difference = res.data.product.specDetailList;
          that.simulatedDATA.specifications = arr;
          for (var i in that.simulatedDATA.difference) {
            that.shopItemInfo[that.simulatedDATA.difference[i].showName] =
              that.simulatedDATA.difference[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
          }
          that.checkItem();
        }
      );
    },
    //联系客服
    contactKefu() {
      let kefuInfo = this.kefuList[0];

      if (this.kefuList[0]) {
        let kefuInfo = this.kefuList[0];
        let kefuId = kefuInfo.id;
        let nickName = kefuInfo.nickname || "客服";
        let myUserId = kefuInfo.userId;
        let myUserName = localStorage.getItem("userName");
        //测试连接，上线时要更改
        // https://living.appcoo.com/h5/mall-service/chat.html
        //
        window.location.href = `https://living.appcoo.com/h5/mall-service/chat.html?kefuId=${kefuId}&kefuName=${nickName}&myUserId=${myUserId}&myUserName=${myUserName}`;
      } else {
        this.$toastMessage({ message: "暂时无在线客服", time: 2000 });
      }
    },
    specificationBtn: function(item, n, event, index) {
      var self = this;
      if (self.selectArr[n] != item) {
        self.selectArr[n] = item;
        self.subIndex[n] = index;
      } else {
        self.price = self.price_difference; //选中规格的价钱
        self.stock = self.goodsInfo.stock; //选中规格的库存
        self.originalPrice = 0;
        self.weight = 0;

        self.selectArr[n] = "";
        self.subIndex[n] = -999; //去掉选中的颜色
      }
      self.$forceUpdate();
      self.checkItem();
      self.isSelected(self.selectArr);
    },
    isSelected(select) {
      this.selected = false;
      for (var i = 0; i < select.length; i++) {
        if (select[i] != "") {
          this.selected = true;
          return;
        }
      }
    } /*判断是否有选择 */,
    checkItem: function() {
      var self = this;
      var option = self.simulatedDATA.specifications;
      var result = []; //定义数组储存被选中的值
      for (var i in option) {
        result[i] = self.selectArr[i] ? self.selectArr[i] : "";
      }
      for (var i in option) {
        var last = result[i]; //把选中的值存放到字符串last去
        for (var k in option[i].item) {
          result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
          option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
        }
        result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时被覆盖
      }
      if (this.shopItemInfo[result]) {
        //console.log(this.shopItemInfo[result]);
        this.price = this.shopItemInfo[result].price || "";
        this.stock = this.shopItemInfo[result].stock || "";
        this.pid = this.shopItemInfo[result].id || "";
        this.originalPrice = this.shopItemInfo[result].originalPrice || "";
        this.weight = this.shopItemInfo[result].weight || "";
      }
      self.$forceUpdate(); //重绘
    },
    isMay: function(result) {
      for (var i in result) {
        if (result[i] == "") {
          return true; //如果数组里有为空的值，那直接返回true
        }
      }
      return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
    },
    getQuery() {
      this.minVideoList.hlsUrl = decodeURIComponent(this.$route.query.hlsUrl);
      this.minVideoList.PlayProgres = this.$route.query.PlayProgres;
      this.minVideoList.playStatus = this.$route.query.playStatus;
      this.minVideoHide = this.$route.query.minVideoHide;
    }, //获取路由参数处理
    minPlayProgres(CurrentTime) {
      this.PlayProgres = CurrentTime;
    }, //获取小视频播放时间
    htmlDecodeByRegExp: function(str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&quot;/g, '"');
      s = s.replace(/'/g, "'");
      s = s.replace(/"/g, '"');
      return s;
    } /*正则转义商品图文html */,
    select() {
      this.showModal = true;
      this.orderType = 2;
    }
  },
  created() {
    this.getGoodsInfo();
    this.getQuery();
  },

  mounted() {
    this.$nextTick(() => {
      //console.log(this.beforeUrl);
    });
  }
};
</script>
<style lang="stylus" scoped>
.shopBg {
  width: 750px;
  position: absolute;
  bottom: 0;
  left: 0;
}

#detail_warp {
  width: 750px;

  img {
    width: 750px;
    max-width: 750px;
  }
}

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

.setGoodsNum, .goodsNumStatus {
  color: #ccc;
}

.share-enter-active {
  transition: all 0.3s;
}

.share-leave-active {
  transition: all 0.3s;
}

.share-enter, .share-leave-to {
  transform: translateY(400px);
  opacity: 1;
}

.share_box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 650px;
  height: 300px;
  padding: 50px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  z-index: 10;
  background: #f3f3f3;
  display: flex;
  flex-direction: rows;
  z-index: 1000;

  .share_item {
    display: flex;
    flex-direction: column;
    margin-left: 147px;
    height: 162px;

    .wx {
      width: 116px;
      height: 116px;
    }

    .wx_name {
      font-size: 28px;
      margin-top: 10px;
      width: 116px;
      text-align: center;
    }
  }

  .cancle_share {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 88px;
    background: #fff;
    text-align: center;
    line-height: 88px;
  }
}

body, html {
  widht: 100%;
  height: 100%;
}

body.position-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  transform: translateY(1200px);
  opacity: 1;
}

.mask {
  width: 100%;
  position: fixed;
  height: calc(100%);
  width: 750px;
  z-index: 998;
  background: rgba(0, 0, 0, 0.2);
}

.modal {
  width: 750px;
  height: 1100px;
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

.shop_wrapper {
  width: 750px;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  overflow-x: hidden;
  overflow-y: scroll;
}

.swiper {
  position: relative;
}

.pagination_bg {
  position: absolute;
  top: 620px;
  left: 325px;
  z-index: 80;
  width: 100px;
  height: 50px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
}

.swiper-pagination-fraction {
  position: absolute;
  top: 624px;
  z-index: 100;
  color: #fff;
}

.fanhui {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.share_img {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.shopcar2 {
  position: absolute;
  top: 20px;
  right: 107px;
  z-index: 100;
}

.more {
  position: absolute;
  top: 20px;
  right: 34px;
  z-index: 100;
}

.main {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 750px;
  overflow-x: hidden;

  .jiage {
    padding-top: 24px;
    padding-left: 20px;
    color: #ff2663;
    width: 730px;
    background: #ffffff;

    span {
      font-size: 50px;
    }
  }

  .wrap1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    background: #ffffff;

    .detail {
      margin-top: 10px;
      font-weight: bold;
      font-size: 28px;
    }
  }

  .wrap2 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 30px;
    padding-bottom: 30px;
    background: #ffffff;

    .box {
      display: flex;
      flex-direction: row;

      span {
        line-height: 31px;
        font-size: 24px;
        margin-left: 10px;
        color: #858585;
      }
    }
  }

  .wrap3 {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    height: 80px;
    width: 710px;
    line-height: 80px;
    background: #ffffff;
    position: relative;

    .fashuo {
      font-size: 24px;
      margin-left: 10px;
      color: #858585;
      font-size: 24px;
    }

    .dizhi {
      display: flex;
      flex-direction: row;
      font-size: 24px;
      margin-left: 50px;

      .dizhidetail {
        margin-left: 10px;
      }

      .kuaidi {
        // margin-left 35px
      }
    }

    .xiaoliang {
      position: absolute;
      right: 40px;
      color: #858585;
      font-size: 24px;
    }

    .xiaojiantou2 {
      width: 19px;
      height: 28px;
      position: absolute;
      right: 40px;
      top: 36px;
    }
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

  .wrap5 {
    background: #ffffff;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    height: 80px;
    width: 710px;
    line-height: 80px;
    position: relative;

    .fuwu {
      font-size: 24px;
      margin-left: 10px;
      color: #858585;
    }

    .fuwu_detail {
      font-size: 24px;
      margin-left: 50px;
    }

    .xiaojiantou2 {
      width: 19px;
      height: 28px;
      position: absolute;
      right: 40px;
      top: 36px;
    }
  }
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 750px;
  height: 116px;
  background: #fff;
  display: flex;
  flex-direction: row;

  .dianpu {
    margin-left: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    .dianpu_img {
      width: 36px;
      height: 34px;
      margin-left: 5px;
    }

    .dianpu_text {
      margin-top: 5px;
      font-size: 24px;
      color: #858585;
      text-align: center;
    }
  }

  .cart {
    margin-left: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .cart_img {
      width: 37px;
      height: 35px;
    }

    .cart_text {
      margin-top: 5px;
      font-size: 24px;
      color: #858585;
      text-align: center;
    }
  }

  .kefu {
    margin-left: 33px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    .kefu_img {
      width: 35px;
      height: 35px;
      margin-left: 5px;
    }

    .kefu_text {
      margin-top: 5px;
      font-size: 24px;
      color: #858585;
      text-align: center;
    }
  }

  .shoucang {
    margin-left: 33px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    .shoucang_img {
      width: 37px;
      height: 35px;
      margin-left: 5px;
    }

    .shoucang_text {
      margin-top: 5px;
      font-size: 24px;
      color: #858585;
      text-align: center;
    }
  }

  .share {
    margin-left: 33px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    .share_text {
      margin-top: 5px;
      font-size: 24px;
      color: #858585;
      text-align: center;
    }
  }

  .addcar_img {
    width: 217px;
    height: 80px;
    margin-top: 20px;
    margin-left: 50px;
  }

  .nowshop_img {
    width: 217px;
    height: 80px;
    margin-top: 20px;
  }
}

.oriPrice {
  font-size: 30px !important;
  color: #999;
  text-decoration: line-through;
  margin-left: 30px;
}

.proDetail {
  background: #f8f8f8;
  text-align: center;
  margin-top: 10px;

  .baobei {
    font-size: 24px;
    font-weight: 500;
    line-height: 50px;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #d6d6d6;
    display: inline-block;
    color: #6e6e6e;
  }
}

.wrap-sku {
  .proName {
    text-align: left;
    font-size: 28px;
    height: 60px;
    line-height: 60px;
  }

  .product-box {
    width: 690px;
    display: block;
    margin: 0 30px;
    overflow-y: auto;
    height: 766px;
  }

  .product-content {
  }

  .product-delcom {
    color: #323232;
    font-size: 26px;
    padding: 10px 0;
  }

  .product-footerlist {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .product-footerlist li {
    border: 1px solid #4cc8ff;
    border-radius: 8px;
    color: #606060;
    text-align: center;
    padding: 10px 15px;
    margin-right: 20px;
    margin-top: 24px;
    font-size: 23px;
    cursor: pointer;
    list-style: none;
  }

  .product-footerlist li.productActive {
    background-color: #fe2045;
    color: #fff;
    border: 1px solid #fe2045;
  }

  .product-footerlist li.noneActive {
    background-color: #ccc;
    opacity: 0.4;
    color: #000;
    pointer-events: none;
  }

  .product-footer {
    background-color: #fe2045;
    text-align: center;
    margin: 30px 0;
    border-radius: 50px;
    position: absolute;
    bottom: 0;
    width: 690px;
  }

  .product-footer a {
    color: #fff;
    text-decoration: none;
    height: 88px;
    line-height: 88px;
    font-size: 28px;
  }

  .price {
    font-size: 30px;
    height: 60px;
    line-height: 60px;
  }
}

.proSelected {
  padding: 20px 30px;
  display: flex;
  align-items: center;

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

  .info {
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 95px;
    font-size: 28px;
    margin-left: 30px;

    .proNum {
      font-size: 26px;
      color: #999;
    }

    span {
      color: #f65b09;
      font-size: 26px;
    }

    .price {
      font-size: 35px;
      margin-left: 20px;
    }

    .oriPrice {
      color: #999;
      font-size: 26px !important;
      font-weight: 500;
    }
  }
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-item: center;
  margin-top: 40px;
  color: #555;

  .price-num {
    width: 100px;
    text-align: center;
    padding-right: 70px;
    margin-right: 20px;
  }
}

.goodsNum {
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 50px;
  margin-top: 30px;
  width: 650px;
  left: 50px;
  color: #555;

  div {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 50px;
    font-weight: bold;
    line-height: 40px;
    border: 1px solid #ccc;
    display: inline-block;
    height: 50px;
    width: 50px;
  }

  input {
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 30px;
    line-height: 65px;
    width: 3em;
    text-align: center;
  }

  .goodsNumStatus {
    color: #ccc;
  }
}

.widthOutPro {
  text-align: left;
  text-indent: 50px;
  margin-top: 20px;

  span {
    border-radius: 5px;
    font-size: 26px;
    padding: 10px;
    background-color: #4cc8ff;
    color: #fff;
    border: 1px solid #4cc8ff;
  }
}

.headImg {
  width: 750px;
  height: 750px;
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
  height: 827px;
  overflow-Y: scroll;
  align-items: center;

  .desc {
    margin: 20px 0;
  }

  .parameter_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 0 30px 0;
    border-bottom: 1px solid #e5e5e5;
    text-align: left;

    .parameter_name {
      width: 185px;
      font-size: 30px;
    }

    .parameter_content {
      width: 445px;
      color: #5d5d5d;
      text-align: left;
      font-size: 28px;
      padding-left: 30px;
    }
  }
}

.red-pack-con {
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
</style>