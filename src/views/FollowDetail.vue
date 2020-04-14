<template>
  <div class="pages" v-if="DisplaPage" ref="pages" @scroll="menu">
    <div class="head">
      <img src="../assets/images/liveDetails.jpg" alt />
      <img @touchstart.stop="back" class="backBtn" src="../assets/images/backBg.png" alt />
      <div class="followInfo">
        <div class="back" v-if="scroll>100">主播个人页</div>
        <img :src="anchorData.anchor.headImg" alt />
        <span>{{anchorData.anchor.nickname}}</span>
        <span>{{followNum}}粉丝</span>
        <div @click="addFollow" :class="{followStatus:true}" ref="followStatus">{{followStatus}}</div>
      </div>
    </div>
    <div class="main">
      <div
        class="now_video"
        @click="toNowVideo({
        anchorId:anchorData.livingRoom.userId,
        RoomId:anchorData.livingRoom.id
        })"
        v-if="anchorData.livingRoom!=''"
      >
        <div class="now_title">{{anchorData.livingRoom.roomTitle}}</div>
        <div class="flex_bottom">
          <!--<div class="now"><span style="font-size:30px;transform: translateY(-2px);">●</span><span>直播中</span></div>-->
          <div class="now">
            <div class="circle"></div>
            <div>直播中</div>
          </div>
          <div class="watch_num">{{anchorData.livingRoom.watchTimes}}观看</div>
        </div>
      </div>
      <div
        class="title"
        v-for="(item,index) in anchorData.advanceList"
        :key="index"
        v-if="timeShow&&item.date!=0"
      >
        <div class="titleInfo">
          <span>{{item.roomTitle}}</span>
          <!-- {{item.advanceNoticeStartTime}} -->
          <span class="time">
            <span class="advance">预告</span>
            {{item.date.Day}}
            <span class="time_sty">天</span>
            {{item.date.hour}}
            <span class="time_sty">时</span>
            {{item.date.minute}}
            <span class="time_sty">分</span>
            <div ref="second">{{item.date.second}}</div>
            <span class="time_sty">秒</span>
          </span>
        </div>
        <!-- <div class="btn">开播提醒</div> -->
      </div>
      <div class="followDetail">
        <div class="followDetailTitle">
          <img src="../assets/images/videoLogo.png" alt />
          精彩回放
        </div>
        <div v-for="(item,index) in followHistory" :key="index">
          <FollowHistory :item="item" @liveVideoa="getLiveVideo"></FollowHistory>
        </div>
      </div>
    </div>
    <transition :name="transitionName">
      <div class="video_wrap" v-if="videoShow">
        <live-video
          @liveHidea="hideLiveVideo"
          @followVideo="followVideo"
          :anchorId="anchorId"
          :playStatus="playStatus"
          :RoomId="RoomId"
          :PlayProgres="PlayProgres"
        ></live-video>
      </div>
    </transition>
  </div>
</template>

<script>
import FollowHistory from "@/components/FollowHistory.vue";
import LiveVideo from "@/components/LiveVideo.vue";
import Qs from "qs";
export default {
  components: {
    FollowHistory,
    LiveVideo
  },
  props: {},
  data() {
    return {
      transitionName: "videoFade",
      DisplaPage: false,
      followId: "",
      followHistory: [],
      videoShow: false,
      scroll: "",
      start: 0,
      end: 10,
      anchorData: Object,
      followStatus: "已关注",
      followNum: 10,
      followis: true,
      advance: [],
      anchorId: Number,
      playStatus: Number,
      RoomId: Number,
      PlayProgres: Number,
      timefalse: true,
      timestamp: [],
      timeFrom: [],
      timeShow: false,
      timeInval: Object,
      beforeUrl: "",
      clientHeight: Number,
      followSwitch: true
    };
  },
  watch: {
    srcoll: function(e) {}
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
      if (from.path == "/more") {
        vm.$store.dispatch("chaneRoutePathASY", "/more");
      }
    }); /*获取上一级路由 */
  },
  computed: {},
  methods: {
    toNowVideo(msg) {
      this.videoShow = true;
      this.anchorId = msg.anchorId;
      this.RoomId = msg.liveRoomId;
    },
    back() {
      //console.log(this.$route.query.PlayProgres);
      this.beforeUrl = this.$store.state.routePath;
      var id = this.$route.query.id;
      var PlayProgres = this.$route.query.PlayProgres;
      if (this.beforeUrl == "/follow") {
        if (PlayProgres != undefined) {
          this.$router.push({
            path: this.beforeUrl,
            query: {
              videoShow: true,
              transitionName: true,
              RoomId: this.RoomId,
              PlayProgres: PlayProgres,
              anchorId: this.anchorId,
              playStatus: this.playStatus
            }
          });
        } else {
          this.$router.push({
            path: this.beforeUrl,
            query: {
              videoShow: false
            }
          });
        }
      } else if (this.beforeUrl == "/followDetail") {
        if (this.$store.state.colseVideo) {
          this.$router.push({
            path: "/follow",
            query: {
              videoShow: false
            }
          });
        } else {
          this.$router.push({
            path: this.beforeUrl,
            query: {
              videoShow: true,
              transitionName: true,
              RoomId: this.RoomId,
              PlayProgres: PlayProgres,
              anchorId: this.anchorId,
              playStatus: this.playStatus
            }
          });
          this.videoShow = true;
        }
      } else {
        this.$router.push({
          path: this.beforeUrl,
          query: {
            videoShow: true,
            transitionName: true,
            RoomId: this.RoomId,
            PlayProgres: PlayProgres,
            anchorId: this.anchorId,
            playStatus: this.playStatus
          }
        });
      }
    },
    addFollow() {
      if (this.followSwitch) {
        if (this.followis) {
          /*取消关注*/
          this.cancelFollow();
        } else {
          /*添加关注*/
          this.ADDFollow();
        }
      }
    },
    cancelFollow() {
      this.followSwitch = false
      var params = {
        anchorId: this.followId
      };

      this.$delayFun(() => {
        this.$post(
          this.$global.globalUrl + "/live/follower/cancel.do",
          params
        ).then(res => {
          if (res.code == "0") {
            //console.log(res);
            this.$refs.followStatus.innerHTML = "关注";
            this.$refs.followStatus.style.backgroundColor = "#f41d49";
            this.$refs.followStatus.style.color = "#ffffff";
            this.followis = false;
            this.followNum -= 1;
            this.followSwitch = true
          }
        });
      }, 500);
    } /* 取消关注*/,
    ADDFollow() {
      this.followSwitch = false
      var params = {
        anchorId: this.followId
      };

      this.$delayFun(() => {
        this.$post(
          this.$global.globalUrl + "/live/follower/add.do",
          params
        ).then(res => {
          if (res.code == "0") {
            //console.log(res);
            this.$refs.followStatus.innerHTML = "已关注";
            this.$refs.followStatus.style.backgroundColor = "#ffffff";
            this.$refs.followStatus.style.color = "#f41d49";
            this.followis = true;
            this.followNum += 1;
            this.followSwitch = true
          }
        });
      }, 500);
    } /* 取消关注*/,
    getAnchorDetail(start, end) {
      var params = {
        anchorId: this.followId,
        start: start,
        end: end
      };
      this.$post(
        this.$global.globalUrl + "/live/anchor/detail.do",
        params
      ).then(res => {
        if (res.code == "0") {
          if (this.timefalse == true) {
            this.DisplaPage = true; /*数据加载完页面展示 */

            var that = this;
            var timeOut;
            timeOut = setTimeout(function() {
              clearTimeout(timeOut);
              that.isFollow(res.data.isFollower); /*判断是否关注*/
              that.setHeight(); /*设置page高度 */
            }, 100);

            this.followis = res.data.isFollower;
            this.anchorData = res.data; /*头部数据 */
            this.followNum = this.anchorData.followerCount;
            //console.log(this.followNum)
            var date = new Date().getTime();
            //console.log(date);
            for (var i = 0; i < res.data.advanceList.length; i++) {
              //console.log(res.data.advanceList[i].timestamp);
              const timestamp = res.data.advanceList[i].timestamp - date;
              this.timestamp.push(timestamp);
            } /*获取预告时间戳*/
            this.getDate();
            this.timefalse = false; /*时间处理只处理一次开关 */
          }
          var arr = res.data.finshList;
          for (var i = 0; i < arr.length; i++) {
            this.followHistory.push(arr[i]);
          }
          this.start += 11;
          this.end += 11;
        }
      });
    } /*获取主播详情数据 */,
    setHeight() {
      this.clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
      this.$refs.pages.style.height = this.clientHeight + "px"; //输入框页面挤压问题解决
    },
    menu(e) {
      e = e || window.event;
      //console.log(e)
      //console.log(e.srcElement.scrollTop + this.clientHeight)
      if (
        Math.ceil(e.srcElement.scrollTop + this.clientHeight) ==
        e.srcElement.scrollHeight
      ) {
        this.getAnchorDetail(this.startNum, this.endNum);
      }
    },
    isFollow(follow) {
      if (follow == true) {
        this.followStatus = "已关注";
      } else {
        this.followStatus = "关注";
        this.$refs.followStatus.style.backgroundColor = "#f41d49";
        this.$refs.followStatus.style.color = "#ffffff";
      }
    },
    followVideo() {
      this.videoShow = false;
      var that = this;
      var setTiom;
      setTiom = setTimeout(function() {
        that.$refs.pages.scrollTop = 0;
        clearTimeout(setTiom);
      }, 100);

      this.$store.dispatch("chaneRoutePathASY", "/followDetail");
    } /*本页视频跳转 */,
    getLiveVideo(msg) {
      this.videoShow = msg.videoShow;
      this.anchorId = msg.anchorId;
      this.playStatus = msg.playStatus;
      this.RoomId = msg.liveRoomId;
      //console.log(msg);
    },
    hideLiveVideo(msg) {
      this.videoShow = msg;
      this.PlayProgres = 0; //视频返回播放时间清除
    }, //视频返回
    RouteQuery() {
      this.RoomId = this.$route.query.RoomId;
      this.anchorId = this.$route.query.anchorId;
      this.playStatus = this.$route.query.playStatus;
      this.videoShow = this.$route.query.videoShow;
      this.PlayProgres = this.$route.query.PlayProgres;
      if (this.$route.query.transitionName) {
        this.transitionName = "false";
      } //视频组件动画清除
      var that = this;
      setTimeout(function() {
        that.transitionName = "videoFade";
        // that.$router.push({})
      }, 1000); //视频组件过渡动画再次生效，清除url参数
    }, //参数处理
    getDateFormat(time) {
      var time = Math.floor(time / 1000);
      var Day = Math.floor(time / 86400);
      if (Day < 10) {
        Day = "0" + Day;
      }
      var hour = Math.floor(time / 3600) % 24;
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minute = Math.floor(time / 60) % 60;
      if (minute < 10) {
        minute = "0" + minute;
      }
      var second = Math.floor(time % 60);
      if (second < 10) {
        second = "0" + second;
      }
      return { Day: Day, hour: hour, minute: minute, second: second };
    },
    getDate() {
      //console.log(this.timestamp);
      var that = this;
      var timeOut;
      var timer = 100;
      timeOut = setTimeout(function() {
        var date = Math.floor(new Date().getTime() / 1000);
        for (var i = 0; i < that.timestamp.length; i++) {
          if (that.timestamp[i] < 0) {
            that.anchorData.advanceList[i]["date"] = 0;
          } else {
            that.anchorData.advanceList[i]["date"] = that.getDateFormat(
              that.timestamp[i]
            );
          }
        }
        //console.log(that.anchorData.advanceList);
        that.timeShow = true;
        clearTimeout(timeOut);
        that.applyTime();
      }, timer);
    } /*初次渲染获取的时间*/,
    applyTime() {
      var that = this;
      var timer = 1000;
      this.timeInval = setInterval(function() {
        var date = Math.floor(new Date().getTime() / 1000);
        for (var i = 0; i < that.timestamp.length; i++) {
          that.timestamp[i] -= 1000;
          if (that.timestamp[i] < 0) {
            that.anchorData.advanceList[i]["date"] = 0;
          } else {
            that.anchorData.advanceList[i]["date"] = that.getDateFormat(
              that.timestamp[i]
            );
          }
        }
        that.$forceUpdate();
      }, timer);
    } /*渲染时间*/
  },

  created() {
    this.followId = this.$route.query.anchorId;
  },
  mounted() {
    this.RouteQuery();
    this.getAnchorDetail(this.start, this.end);
    window.addEventListener("scroll", this.menu, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.menu, true);
  }
};
</script>

<style  scoped lang="stylus">
.now_video {
  display: flex;
  flex-direction: column;
  background: #ffff;
  border-top: 1px solid #ddd;
  padding: 30px;

  .now_title {
    text-align: left;
    height: 50px;
    line-height: 50px;
  }

  .flex_bottom {
    display: flex;
    flex-direction: row;
    margin-top: 30px;

    .now {
      background: -webkit-linear-gradient(left, #ff238c 0%, #fe2e5f 100%);
      height: 43px;
      line-height: 43px;
      padding: 0 10px;
      border-radius: 10px;
      color: #FFFFFF;
      font-weight: 400;
      font-size: 26px;
      margin-right: 10px;
      width: 110px;
      display: flex;
      align-items: center;
      justify-content: center;

      .circle {
        width: 18px;
        height: 18px;
        background: #fff;
        border-radius: 50%;
        margin-right: 5px;
      }
    }

    .watch_num {
      font-size: 28px;
      color: #c7c7c7;
      margin-left: 10px;
    }
  }
}

.video_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  z-index: 100;
}

.videoFade-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.videoFade-enter {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100% 0);
}

.pages {
  background: #efefef;
  overflow-y: scroll;
  overflow-x: hidden;
  letter-spacing: 3px;
}

.head {
  position: relative;
}

.head img {
  width: 100%;
  height: 500px;
  overflow: hidden;
  object-fit: cover;
}

.followInfo {
  position: absolute;
  top: 109px;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 24px;
}

.followInfo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.followInfo span {
  height: 60px;
  line-height: 60px;
}

.followStatus {
  width: 120px;
  height: 50px;
  border-radius: 25px;
  background: #fff;
  line-height: 50px;
  color: #f41d49;
  font-size: 26px;
  margin-top: 20px;
  touch-action: none;
}

.nums {
  background: #404040;
  width: 2px;
  height: 1em;
  position: relative;
  font-size: 30px;
  line-height: 30px;
  margin: 30px 0;
}

.nums span:first-child {
  position: absolute;
  right: 20px;
  white-space: nowrap;
  top: 0;
}

.nums span:last-child {
  position: absolute;
  left: 20px;
  white-space: nowrap;
  top: 0;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background: #fff;
}

.title .titleInfo {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.title .titleInfo .time {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 33px;
  color: #0386f1;
}

.advance {
  background: -webkit-linear-gradient(left, #1a9ef0 0%, #095fe6 100%);
  display: inline-block;
  height: 43px;
  line-height: 43px;
  padding: 0 10px;
  border-radius: 10px;
  color: #FFFFFF;
  font-weight: 400;
  font-size: 26px;
  margin-right: 10px;
  width: 59px;
  text-align: center;
}

.title .btn {
  color: #3a7ba5;
  height: 50px;
  width: 140px;
  text-align: center;
  border: 1px solid #3a7ba5;
  border-radius: 25px;
  font-size: 26px;
  line-height: 50px;
}

.main {
  margin: 10px 0;
  overflow-x: hidden;
}

.main>div~div {
  border-top: 1px solid #ddd;
}

.followDetail {
  margin-top: 20px;
  background: #FFFFFF;
}

.followDetail img {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}

.followDetail .followDetailTitle {
  display: flex;
  align-items: center;
  font-size: 32px;
  padding: 30px;
}

.back {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  height: 100px;
  color: #000;
  font-weight: bold;
  line-height: 100px;
  border-bottom: 1px solid #aaa;
  z-index: 99;
}

.backBtn {
  width: 54px !important;
  height: 54px !important;
  position: fixed;
  left: 40px;
  top: 40px;
  z-index: 70;
}

.time_sty {
  color: #c7c7c7;
  font-size: 28px;
  padding: 0 5px 0 5px;
}
</style>
