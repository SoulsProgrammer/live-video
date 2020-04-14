<template>
  <div>
    <div :class="{wrap:true,overflowHide:videoShow}" @scroll="menu" ref="wrap" v-show="show">
      <div id="lunbo">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-container" v-if="swiperShow">
          <!-- slides -->
          <swiper-slide class="swiper-slide" v-for="(list,index) in bannerList" :key="index">
            <!-- <img :src="img" alt  /> -->
            <div class="liveNum_text">
              <img src="../assets/images/indexPlay.png" alt="" class="liveNum" v-if="list.playStatus == 2">
              <img src="../assets/images/livePlay.gif" alt="" class="liveNum2" v-if="list.playStatus==1">
              <img src="../assets/images/livePlayBg.png" alt="" class="nowVideoImg" v-if="list.playStatus==1">
              {{list.watchTimes}}观看
            </div>
            <img :src="list.coverImg" alt class="swiperImg" :id="list.id" :index="index" />
            <div class="swiper_title"></div>
            <div class="swiper_title_text">{{list.roomTitle}}</div>
            <img src="../assets/images/jb.png" alt="" style="position:absolute;left: 488px; top:-3px;">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 首页视频播放 -->
      <div class="indexContent" >
        <div class="video" id="indexVideo" ref="videoClick" @click="hideVideo" v-if="showModel">
          <video
                  v-if="videoShowIndex"
                  class="zVideo"
                  id="zVideo"
                  ref="indexVideo"
                  controls
                  autoplay
                  x5-video-orientation="portraint"
                  x5-video-player-type="h5"
                  muted
          >
            <source src="../assets/b052c7f45809d1b5eb14eaacc2219f4b.mp4" type="video/mp4" />您的浏览器不支持 video 标签。
          </video>
        </div>
      </div>
      <div class="main_bg" >
        <div class="main_warp">
          <div v-for="(list,index) in delicacyList " :key="index">
            <product @liveVideoa="getLiveVideo" :list="list"></product>
          </div>
          <img src="../assets/images/flash_load.gif" alt="" class="loadGif" ref="loadGif" v-if="loadGif"> <!---loadGif-->
          <div class="chuDi" style="height:85px; display:flex;justify-content: center;width:100%;align-items: center" v-if="chuDi">
          <div class="proDetail">
            <span class="baobei">
              <span style="color:#d6d6d6">————</span> 已经到底了
              <span style="color:#d6d6d6">————</span>
            </span>
          </div>
        </div>
        </div>
      </div>
      <transition :name="transitionName">
        <div class="video_wrap" v-if="videoShow">
          <live-video
                  @liveHidea="hideLiveVideo"
                  :anchorId="anchorId"
                  :playStatus="playStatus"
                  :RoomId="RoomId"
                  :PlayProgres="PlayProgres"
          ></live-video>
        </div>
      </transition>
    </div>
    <div class="load" v-if="!show">
      <!-- <img src="../assets/images/2.gif" alt class="img_load" style="top:235px;"/> -->
      <div class="load_text">拼命加载中...</div>
    </div>
  </div>
</template>

<script>
  import Product from "@/components/Product.vue";
  import LiveVideo from "@/components/LiveVideo.vue";
  import {mapState,mapMutation} from 'vuex'
  let vm = null;
  export default {
    name: "ProductsSelected",
    data() {
      return {
        playStatus: 1,
        loadGif:false,
        chuDi: false,
        show: false,
        videoShowIndex: true,
        transitionName: "videoFade",
        showModel: false,
        swiperOption: {
          watchSlidesProgress: true,
          slidesPerView: "auto",
          centeredSlides: true,
          loop: true,
          loopedSlides: 6,
          // showModel: true,
          autoplay: {
            disableOnInteraction: false,
            delay: 2500
          },
          pagination: {
            el: ".swiper-pagination"
          },
          on: {
            progress: function(progress) {
              for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                var modify = 1;
                if (Math.abs(slideProgress) > 1) {
                  modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                var translate = slideProgress * modify * 260 + "px";
                var scale = 1 - Math.abs(slideProgress) / 5;
                var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform(
                        "translateX(" + translate + ") scale(" + scale + ")"
                );
                slide.css("zIndex", zIndex);
                slide.css("opacity", 1);
                if (Math.abs(slideProgress) > 3) {
                  slide.css("opacity", 0);
                }
              }
            },
            setTransition: function(transition) {
              for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                slide.transition(transition);
              }
            },
            click: function(e) {
              //console.log(e.target.id);
              if (e.target.id == -1) {
                vm.$router.push({ path: "more" });
              } else if (e.target.id == undefined || e.target.id == "") {
                return;
              } else {
                vm.$data.anchorId = e.target.id;
                vm.$data.videoShow = true;
              }
            }
          }
        },
        swiperShow: false,
        videoShow: false,
        delicacyList: [],
        clientHeight: "",
        startNum: 0,
        endNum: 10,
        delicacyListEnd: false,
        anchorId: 0,
        playStatus: 0,
        RoomId: 0,
        PlayProgres: 0
      };
    },

    components: {
      Product,
      LiveVideo
    },
    computed: {
      ...mapState(['','name']),
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {},
    methods: {
      setHeight() {
        this.clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
        this.$refs.wrap.style.height = this.clientHeight + "px"; //输入框页面挤压问题解决
      },
      hideVideo(){
        this.videoShowIndex = false;
        this.showModel = false;
      },
      getLiveVideo(msg) {
        // this.Statusbar("hide");
        this.$refs.wrap.style.height = "100%";
        this.videoShow = msg.videoShow;
        this.anchorId = msg.anchorId;
        this.playStatus = msg.playStatus;
        this.RoomId = msg.liveRoomId;

        // vm.$store.dispatch("chaneNowRoomIdASY", this.RoomId);
      },
      // Statusbar(status) {
      //   var bridge = window["WebViewJavascriptBridge"];
      //   if (bridge) {
      //     bridge.callHandler("hideSystemStatusBar", status, function() {});
      //   }
      // } /*隐藏状态栏*/,
      hideLiveVideo(msg) {
        this.videoShow = msg;
        this.PlayProgres = 0; //视频返回播放时间清除
        var that = this
        console.log(that.$store.state.scrollTop)
        var TimeOut =  setTimeout(function(){
          clearTimeout(TimeOut)
          that.setHeight()
          that.$refs.wrap.scrollTop = that.$store.state.scrollTop
        },100)
        
      }, //视频返回
      minVideoHideEvent(msg) {},
      ToFollow() {
        this.$router.push({ path: "follow" });
      },
      getSelectedList(startNum, endNum) {
        this.loadGif = true
        var params = { start: startNum, end: endNum };
        this.$post(this.$global.globalUrl + "live/pickList.do", params).then(
                res => {
                  if (res.code == 0) {
                    // //console.log(res);
                    this.loadGif = false
                    
                    this.startNum += 10;
                    this.endNum += 10;
                    this.bannerList = res.data.recommendContentList;

                    console.log(this.delicacyList);
                    console.log(this.bannerList)
                    this.swiperShow = true;
                    this.show = true;
                    // this.loadImg()
                    for (var i = 0; i < res.data.anchorList.length; i++) {
                      this.delicacyList.push(res.data.anchorList[i]);
                    }
                    if (res.data.isEnd) {
                      this.delicacyListEnd = true;
                      if(this.delicacyList.length>2){
                        this.chuDi = true;
                      }
                      
                    }
                    
                    
                    // //console.log(this.delicacyList);
                  }
                }
        );
      } /*精选列表接口*/,
      menu(e) {
        e = e || window.event;
        // //console.log(e.srcElement.scrollTop);
        this.$store.dispatch("chaneScrollTopASY", e.srcElement.scrollTop);
        // //console.log(this.$store.state.scrollTop);
        if (
                Math.ceil(e.srcElement.scrollTop + this.clientHeight) ==
                 Math.ceil(e.srcElement.scrollHeight) &&
                !this.delicacyListEnd
        ) {
          
          this.getSelectedList(this.startNum, this.endNum);
        }
        // this.showModel = false;
      },
      SaveUserInfo() {
        // alert(this.$route.query.userId)
        // alert(this.$route.query.username)
        if (this.getQueryString("userId") != null) {
      
          localStorage.setItem("userId", this.getQueryString("userId"));
        }
        if (this.getQueryString("userName") != null) {
      
          localStorage.setItem("userName", this.getQueryString("userName"));
        }
        if (this.getQueryString("token") != null) {
     
          localStorage.setItem("token", this.getQueryString("token"));
        }
      },
      RouteQuery() {
        this.anchorId = this.$route.query.anchorId;
        this.playStatus = this.$route.query.playStatus;
        this.RoomId = this.$route.query.RoomId;
        this.videoShow = this.$route.query.videoShow;
        this.PlayProgres = this.$route.query.PlayProgres;
        console.log(this.PlayProgres)
        if (this.$route.query.transitionName) {
          this.transitionName = "false";
        } //视频组件动画清除
        var that = this;
        var TimeOut2
        TimeOut2 = setTimeout(function() {
          that.transitionName = "videoFade";
          clearTimeout(TimeOut2)
          // that.$router.push({})
        }, 1000); //视频组件过渡动画再次生效，清除url参数
      }, //参数处理
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      } /*正则截参数 */,
      loadImg() {
        var imgArr = [];
        var imgs = document.getElementsByTagName("img");
        // //console.log(imgs);
        for (var i = 0; i < imgs.length; i++) {
          imgArr.push(imgs[i].src);
        }
        // //console.log(imgArr);
        // this.swiperShow = false;
        // this.show = false
      } /*图片预加载处理 */,
      hidetitleBar() {
        var bridge = window["WebViewJavascriptBridge"];
        if (bridge) {
          bridge.callHandler("hideRightTopMoreView", "", function() {});
        }
      } /*惠生活顶部导航栏*/
    },
    mounted() {
      this.hidetitleBar();
      vm = this;
      this.SaveUserInfo();
      this.setHeight();
      this.RouteQuery();
      this.getSelectedList(this.startNum, this.endNum);
      this.$store.dispatch("chaneSelectASY", "delicacy");
      // console.log(this.$store.state.scrollTop)
      // //console.log(this.$store.state.select);
      //  //console.log(this.$store.state.autoPlayVideo);
      if (this.$store.state.autoPlayVideo == "true") {
        // var zVideo = document.getElementById("zVideo");
        // zVideo.style.display = "block";
        // var that = this;
        // var zVideo = document.getElementById("zVideo");
        // zVideo.style.display = "none";
        // that.$store.dispatch("chaneAutoPlayVideoASY", "false");
      }
      // var body = document.body;
      // body.addEventListener("click", function() {
      //   var zVideo = document.getElementById("zVideo");
      //   zVideo.style.display = "none";
      // });
    },
    beforeDestroy() {
      var body = document.body;
      body.removeEventListener("click", () => {});
      // this.$store.dispatch("chaneScrollTopASY", 0);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" scoped>
  .liveNum2{
    position absolute;
      top 5px;
      left 10px
      z-index 11
  }
  .nowVideoImg{
    position absolute
    left 2px
    z-index 10
  }
  .liveNum {
    position absolute
    left 2px
    z-index 10
  }
  .liveNum_text{
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 10px;
      left: 135px;
    font-size: 15px;
  text-align: center;
  color: #fff;
  line-height: 32px;
  padding-left: 18px;
  border-radius 30px;
  padding-left: 38px;
  padding-right: 15px;
    }
.proDetail {
  text-align: center;
  margin-top: 10px;

  .baobei {
    font-size: 24px;
    font-weight: 500;
    line-height: 50px;
    height: 50px;
    width: 100%;
    border-bottom: 0px solid #d6d6d6;
    display: inline-block;
    color: #929292;
  }
}

  .loadGif{
    width: 45px;
    height: 45px;
    margin: auto;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
  }
  .likeNum {
    position: absolute;
    bottom: 25px;
    width: 48px;
    left: 653px;
  }

  .likeNumber {
    width: 110px;
    height: 31px;
    font-size: 16px;
    text-align: center;
    position: absolute;
    bottom: 59px;
    left: 623px;
    line-height: 31px;
    color: #fff;

    span {
      height: 31px;
      margin: auto;
      background: #ec4163;
      display: inline;
      border-radius: 10px;
      padding-left: 8px;
      padding-right: 8px;
      line-height: 31px;
    }
  }
  .swiper-pagination {

    span {
      width: 18px;
      height: 18px;
      display: inline-block;
      border-radius: 100%;
      background: #000;
      opacity: 0.2;
    }
    .swiper-pagination-bullet-active {
      background: #fe2045;
      opacity: 1;
    }

  }

  .load {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;

    .img_load {
      position: absolute;
      top: 188px;
      left: 0;
      right: 0;
      margin: auto;
      width: 750px;
    }

    .load_text {
      position: absolute;
      top: 836px;
      left: 0;
      right: 0;
      margin: auto;
      width: 750px;
      color: #666 s;
    }
  }

  .swiperImg {
    width: 431px;
    height: 432px;
    border-radius: 10px;
  }

  .more {
    background: #666;
  }

  .swiper_title {
    width: 431px;
    height:  80px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background:url("../assets/images/swiperBottomBg.png") ;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    opacity: 0.5;
    position: absolute;
    bottom: 0;
    left: 121px;
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
  }

  .swiper_title_text {
    position: absolute;
    bottom: 0;
    left: 121px;
    width: 431px;
    height: 80px;
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
  }

  .video_wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    z-index: 11;
  }

  .videoFade-leave-active {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .videoFade-enter {
    -webkit-transform: translate(100%, 0);
    transform: translate(100% 0);
  }

  .wrap {
    width: 750px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    background: #ffffff;
  }

  .overflowHide {
    overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
  }

  h2, h4 {
    font-weight: normal;
  }

  #lunbo {
    width: 1039px;
    position: absolute;
    top: 210px;
    left: -290px;
  }

  #lunbo .swiper-container {
    padding-bottom: 75px;
  }

  #lunbo .swiper-slide {
    width: 671px;
    height: 432px;
  }

  #lunbo .swiper-pagination {
    width: 100%;
    bottom: 20px;
    left: 145px;
  }

  .br {
    position: absolute;
    top: 694px;
    left: 0;
    right: 0;
    margin: auto;
    width: 705px;
    border-top: 1px solid #d6d6d6;
    height: 1px;
  }

  .main_bg {
    position: absolute;
    top: 697px;
    left: 0px;
    width: 750px;
    background-color: #f0efed;
    margin-top: 20px;
    display: flex;
    justify-content: center;

    .main_warp {
      width: 705px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  .video {
    width: 100%;
    height: 432px;
  }

  .zVideo {
    width: 100%;
    height: 432px;
    background: #000;
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  #indexVideo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #333;
    height:100%;
    width: 100%;
    z-index: 998;
    background: rgba(0,0,0,.5);
  }
</style>
