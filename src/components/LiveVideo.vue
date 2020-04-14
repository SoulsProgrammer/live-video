<template>
  <div>
    <!-- <img src="https://liveimg.appcoo.com/h5/images/video_bg.jpg" alt class="video_imgBg" /> -->
     <img src="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg" alt class="video_imgBg_bg" />
     <img src="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg" alt class="video_imgBg" />
     <div class="mode"></div>
    <div
      class="wrapper"
      id="wrapper"
      ref="wrapper"
      @
      v-if="live_video_Dom"
      @touchstart.stop="videoTouchStr"
      @touchmove.stop="videoTouchMov"
      @touchend.stop="videoTouchEnd"
    >
      <video
        poster="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg"
        id="myVideo"
        ref="myVideo"
        class="video-js"
        style="object-fit:cover;z-index:1"
        x5-video-player-type="h5"
        x5-playsinline
        playsinline
        autoplay
        loop
        webkit-playsinline
        x-webkit-airplay="allow"
      >
        <!-- x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"-->
        <!-- <source :src="LiveRoomData.hlsUrl" /> -->
        <!-- <source :src="LiveRoomData.hlsUrl" type="application/x-mpegURL" /> -->
        <!-- <source src="https://hls1.appcoo.com/liveshopping/99/228/index.m3u8"/> -->
        <!-- <source src="http://usa.027cgb.com/621335/b052c7f45809d1b5eb14eaacc2219f4b.mp4"/> -->
        <!-- poster="http://www.zhideedu.com/UploadFiles/img_1_2999492250_3770145489_15.jpg" -->
      </video>
      <div v-show="videoHiden" class="ancher_out" ref="ancher_out">
        <div class="ancher_Txt" ref="ancher_Txt">连接中</div>
      </div>
      <img src="../assets/images/loadHttp.gif" alt class="videoLoad" v-if="videoLoadShow" />
      <!-- <img
        src="https://liveimg.appcoo.com/h5/images/video_bg.jpg"
        alt
        class="video_imgBg"
        v-if="videoPlayBgShow"
      /> -->
      <img
        src="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg"
        alt
        class="video_imgBg_bg"
        v-if="videoPlayBgShow"
      />
      <img
        src="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg"
        alt
        class="video_imgBg"
        v-if="videoPlayBgShow"
      />
      <div class="mode" v-if="videoPlayBgShow"></div>
      <div class="videoEnd" v-if="videoEndShow">
        <img src="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg" alt class="video_imgBg_bg" />
        <img src="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg" alt class="videoEndImg" />
        <div class="mode"></div>
        <div class="videoEnd_txt">主播离开了直播间</div>
      </div>
      <div
        class="man_cont"
        id="man_cont"
        @touchstart.stop="videoBgTouchStr"
        @touchmove.stop="videoBgTouchMov"
        @touchend.stop="videoBgTouchEnd"
        ref="man_cont"
        style="z-index:4"
      >
        <div class="head">
          <div class="head_bg1" ref="head_bg"></div>
          <img :src="LiveRoomData.headImg" alt class="heard" @touchstart.stop="toFollowDetail" />
          <div class="head_conte">
            <div class="name">{{LiveRoomData.nickname}}</div>
            <!-- <div>ID：{{LiveRoomData.id}}</div> -->
            <div class="watchNum">
              {{watchTimes}} 观看
              <span style></span>
            </div>
          </div>
          <img :src="guaipingImg" alt class="guapin" v-if="guaipingstatus==1" ref="guapin" />
          <img
            v-if="guanzhu"
            src="../assets/images/guanzhu.png"
            alt
            class="guanzhu"
            @touchstart.stop="guanzhua"
          />
        </div>
        <img v-if="show" src="../assets/images/tishi.png" alt class="tishi" v-show="guanzhu" />
        <img
          v-if="show"
          v-show="guanzhu"
          src="../assets/images/black_min.png"
          alt
          class="black_min"
          @touchstart.stop="close"
        />
        <div class="black_bg" @touchstart.stop="videoHide"></div>
        <img src="../assets/images/black.png" alt class="black" @touchstart.stop="videoHide" />
        <div :class="{danmu_box:true,oldDanmu:oldVideo}" id="danmu_box" ref="danmu_box">
          <div v-for="(list,index) in comment" class="zhanwei" :Key="index">
            <span>
              <div style="display:inline;" :class="list.class">{{list.nickName}}</div>
              {{list.msg}}
            </span>
          </div>
        </div>
        <img src="../assets/images/gasket.png" alt class="gasket" />
        <div :class="{bottom_warp:true,old_bottom:oldVideo}" v-if="!inputs">
          <img
            src="../assets/images/shopcar.png"
            alt
            class="shopcar"
            @touchstart.stop="productShow"
          />
          <div class="xian"></div>
          <div class="reward" v-if="more"></div>
          <span class="reward_txt" v-if="more" @touchstart.stop="rewardShow">打赏</span>
          <img
            src="../assets/images/black.png"
            alt
            class="black_bottom"
            v-if="more"
            @touchstart.stop="moreaShow"
          />
          <img
            src="../assets/images/more1.png"
            alt
            class="more1"
            v-if="rewardShowA"
            @touchstart.stop="morea"
          />
          <img src="../assets/images/share.png" alt class="share" @touchstart.stop="shareShowed" />
          <img src="../assets/images/likeNum.png" alt class="likeNum" @touchstart.stop="addLikeNum" />
          <div class="likeNumber" @touchstart.stop="addLikeNum">
            <span>{{likeNum}}</span>
          </div>
        </div>

        <input
          type="text"
          :placeholder="placeholder"
          :class="{input:inputClass,inputS:inputSClass,oldInput:(oldVideo&&!inputSClass)}"
          @touchstart.stop="inputStart"
          @blur="inputBlur"
          ref="elInput"
          id="inputDom"
        />
        <div :class="{send:true,sended:sended}" v-if="inputs" @touchstart.stop="send">发送</div>
        <div class="Message_position" v-if="MessageHide">
          <Message></Message>
        </div>
        <div class="proess" v-show="false" @touchstart.stop="showControlEvent">
          <div class="proess_end" ref="proess_end"></div>
        </div>
        <!-- 进度条 -->
        <div class="video_control_bg" v-show="showControl"></div>
        <!-- 视频control背景-->
        <div
          class="control_box"
          v-show="oldVideo"
          @touchstart.stop="stop"
          @touchmove.stop="stop"
          @touchend.stop="stop"
        >
          <img
            src="../assets/images/pause.png"
            alt
            class="control_pause"
            v-if="playing==true"
            @touchstart.stop="play_pause"
          />
          <img
            src="../assets/images/play.png"
            alt
            class="control_play"
            v-if="playing==false"
            @touchstart.stop="play_play"
          />
          <div class="play_currentTime" ref="play_currentTime">00:00:00</div>
          <div class="play_progress_bg"></div>
          <!--灰色进度条-->
          <div class="play_progress_current" ref="play_progress_current"></div>
          <!--当前播放进度条-->
          <div class="touch_progress" @touchstart.stop="control_touchStart"></div>
          <!--拖到进度受触区域-->
          <img
            src="../assets/images/progressBtn.png"
            alt
            class="progressBtn"
            ref="progressBtn"
            @touchstart.stop="progressBtn_touchStart"
            @touchmove.stop="progressBtn_touchMove"
            @touchend.stop="progressBtn_touchEnd"
          />
          <div class="play_videoTime" ref="play_videoTime">00:00:00</div>
          <div class="speed" @touchstart.stop="speedEvent" ref="speed">倍数</div>
        </div>
      </div>
      <transition name="my">
        <div
          v-if="productShowSwitch"
          class="productList"
          @touchstart.stop="stop"
          @touchmove.stop="stop"
          @touchend.stop="stop"
        >
          <product-list :list="LiveRoomData.liveRoomId" @gitPlayProgress="gogoodDetail"></product-list>
        </div>
      </transition>
      <div v-if="RewardShow">
        <reward></reward>
      </div>
      <div :class="{putUp:true,oldUp:oldVideo}">
        <put-up :likeNum="likeNum"></put-up>
      </div>
      <transition name="share">
        <div
          class="share_box"
          v-if="shareShow"
          @touchstart.stop="stop"
          @touchmove.stop="stop"
          @touchend.stop="stop"
        >
          <div class="share_item">
            <img src="../assets/images/wx.png" alt class="wx" @click.stop="shareWx" />
            <span class="wx_name">好友</span>
          </div>
          <div class="share_item">
            <img src="../assets/images/fridend.png" alt class="wx" @click.stop="pengyouquan" />
            <span class="wx_name">朋友圈</span>
          </div>
          <div class="cancle_share" @touchstart.stop="cancle_share">取消</div>
        </div>
      </transition>
      <div class="notice_warp">
        <Notice :notice="notice" :timer="timer"></Notice>
      </div>
      <div
        class="redPacketWarp"
        @touchstart.stop="stop"
        @touchmove.stop="stop"
        @touchend.stop="stop"
        v-if="RedShow"
      >
        <red-packet @getRedPacker="getRedPackerData"></red-packet>
      </div>
      <div class="redend" v-if="redendShow">
        <div class="alert">{{redPacketMessage}}</div>
        <img src="../assets/images/alterBtn.png" alt class="alterBtn" @click.stop="alterBtnEvent" />
      </div>
    </div>
  </div>
</template>
<script>
import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
import "videojs-flash";
import "videojs-contrib-hls.js/src/videojs.hlsjs";
import ProductList from "@/components/ProductList.vue";
import Reward from "@/components/Reward.vue";
import PutUp from "@/components/PutUp.vue";
import Message from "@/components/Message.vue";
import Notice from "@/components/Notice.vue";
import RedPacket from "@/components/RedPacket.vue";
import axios from "axios";
export default {
  name: "live-video",
  components: {
    ProductList,
    Reward,
    PutUp,
    Message,
    Notice,
    RedPacket
  },
  props: ["anchorId", "playStatus", "RoomId", "PlayProgres"],
  data() {
    return {
      InterVal2: null,
      delayTime: 0,
      dalyDuration: 20,
      leaveRoom: false,
      videoEndShow: false,
      videoLoadShow: false,
      videoHiden: false,
      sended: false,
      myPlayer: null,
      show: true,
      videoShow: false,
      comment: [],
      scrollSwitch: true,
      danmubox: null,
      inputs: false,
      placeholder: "跟主播聊点什么?",
      inputClass: true,
      inputSClass: false,
      productShowSwitch: false,
      guanzhu: false,
      more: false,
      RewardShow: false,
      likeNum: 0,
      rewardShowA: false,
      HintMessage: "关注成功",
      MessageHide: false,
      oldVideo: true,
      liveRoomId: Number,
      watchTimes: 0,
      userId: 10,
      chatIp: "",
      chatPort: Number,
      ws: null,
      TimeOut: null,
      playing: true,
      speed: 0,
      showControl: false,
      live_video_Dom: false,
      originPoint: Number,
      differencePoint: Number,
      shareShow: false,
      isreconnection: false,
      isrefresh: false,
      isinitVeiw: true,
      online: false,
      notice: "",
      timer: "",
      guaipingImg: "",
      xValue: "",
      yValue: "",
      guaipingWidth: 200,
      guaipingstatus: false,
      redID: 0,
      RedShow: false,
      redPacketMessage: "",
      redendShow: false,
      userNum: 0,
      token: "",
      inputDom: null,
      moveCurrentTime: 0,
      videoPlayBgShow: true,
      videoDuration: 0
    };
  },
  watch: {
    errorData(newValue, oldValue) {
      console.log("404");
      this.videoEndShow = true;
      this.myPlayer.load();
    }
  },
  computed: {},
  methods: {
    stop() {},
    inputBlur() {},
    getRedPackerData() {
      var data = {
        packetId: this.redID
      };
      this.$post(this.$global.globalUrl + "/snatch/redPacket.do", data).then(
        res => {
          if (res.code == 0) {
            this.redPacketMessage = res.msg;
            this.redendShow = true;
            this.userNum++;
            if (this.userNum == 9) {
              this.RedShow = false;
            }
          } else if (res.code == "1001") {
            //console.log(res);
            this.redPacketMessage = res.msg;
            this.redendShow = true;
            this.RedShow = false;
          }
        }
      );
    },
    alterBtnEvent() {
      this.redendShow = false;
    },
    setWatchTimes(count) {
      if (count < 100000) {
        this.watchTimes = count;
      } else {
        var num = count / 10000;
        this.watchTimes = num.toFixed(2) + "万";
      }
    },
    setLikeNum(count) {
      if (count < 100000) {
        this.likeNum = count;
      } else {
        var num = count / 10000;
        this.likeNum = num.toFixed(2) + "万";
      }
    },
    WebSocketInit(now) {
      this.setLikeNum(now.praiseCount);
      this.liveRoomId = now.liveRoomId;
      this.chatIp = now.chatIp;
      this.chatPort = now.chatPort;
      this.userId = localStorage.getItem("userId");
      this.ws = new WebSocket(this.chatIp);
      var that = this;
      this.ws.onopen = function(e) {
        that.WebSocketIn(that.ws, that.liveRoomId, that.userId);
        clearTimeout(that.TimeOut);
        that.flash(that.ws);
      };
      this.ws.onmessage = function(e) {

        var data = JSON.parse(e.data);
        //console.log(data);
        if (data.code == "1") {
          that.setWatchTimes(data.data.watchTimes);
        }
        if (data.code == "55") {
          that.notice = data.data.noticeMessage;
          that.timer = data.data.noticeTimes;
        }
        if (data.code == "56") {
          that.guaipingstatus = data.data.imgStatus;
          that.guaipingImg = data.data.imgUrl;
          // that.guaipingWidth = data.data.imgWidth;
          // that.imgHight = data.data.imgHight;
          // that.yCoordinate = data.data.yCoordinate;
          var clearGuapin = setTimeout(function() {
            that.$refs.guapin.style.width = data.data.imgWidth + "px";
            that.$refs.guapin.style.height = data.data.imgHight + "px";
            that.$refs.guapin.style.top = data.data.yCoordinate + "px";
            that.$refs.guapin.style.right = data.data.xCoordinate + "px";
            clearTimeout(clearGuapin);
          }, 100);
        }
        if (data.code == "57") {
          that.redID = data.data.id;
          that.RedShow = true;
        }
        if (data.code == "51") {
          that.leaveRoom = true;
        }
        if (data.code == "3") {
          var color = ["color1", "color2", "color3", "color4"];
          var i = Math.floor(Math.random() * 4 + 1) - 1;
          var danmu = {
            msg: data.data.msg,
            nickName: data.data.nickname,
            class: color[i]
          };
          that.comment.push(danmu);
          var TimeOut2;
          TimeOut2 = setTimeout(function() {
            clearInterval(TimeOut2);
            that.$refs.danmu_box.scrollTop = that.$refs.danmu_box.scrollHeight;
          }, 100);
        }
        if (data.code == "9") {
          that.setLikeNum(data.data.praiseCount);
        }
      };
      this.ws.onclose = function(evt) {
        //console.log("Connection closed.");
        //console.log(evt);
        clearInterval(that.TimeOut);
        //清除心跳定时器
      };
      //webSocket.onerror 用于指定报错时的回调函数
      this.ws.onerror = function(event) {
        //console.log("error");
      };
    } /*webscoket初始化 */,
    WebSocketIn(ws, liveRoomId, userId) {
      // console.log("usrId为" + userId + "的用户进去直播间");
      var data = { code: 1, data: { liveRoomId: liveRoomId, userId: userId } };
      //console.log(JSON.stringify(data));
      ws.send(JSON.stringify(data));
    } /*进去直播间*/,
    WebSocketOut(ws, liveRoomId, userId) {
      //console.log("usrId为" + userId + "的用户退出直播间");
      var data = { code: 2, data: { liveRoomId: liveRoomId, userId: userId } };
      //console.log(data);
      ws.send(JSON.stringify(data));
      ws.close();
    } /*退出直播间*/,
    WebSocketSend(ws, liveRoomId, userId, msg) {
      //console.log("usrId为" + userId + "的用户发送的消息");
      var data = {
        code: 3,
        data: { liveRoomId: liveRoomId, userId: userId, msg: msg }
      };

      ws.send(JSON.stringify(data));

      //console.log(JSON.stringify(data));
    } /*发送聊天*/,
    heartbeat(ws) {
      var data = { code: 0 };
      ws.send(JSON.stringify(data));
    } /*心跳*/,
    dianzan(ws, liveRoomId, userId) {
      //console.log("usrId为" + userId + "的用户点赞了");
      var data = { code: 9, data: { liveRoomId: liveRoomId, userId: userId } };
      ws.send(JSON.stringify(data));
      //console.log(JSON.stringify(data));
    } /*点赞*/,
    flash(ws) {
      var that = this;
      this.TimeOut = setInterval(function() {
        that.heartbeat(ws);
        // that.videoHttp();
      }, 5000);
    } /*刷新心跳*/,
    videolost() {
      var that = this;
      this.TimeOut6 = setInterval(() => {
        // that.videoHttp();
      }, 10000);
    } /**轮询判断直播间链接是否404 */,
    offLine() {
      this.WebSocketInit(this.LiveRoomData);
    },
    initVideo() {
      var self = this;
      //初始化视频方法
      // videojs.options.flash.swf = 'https://cdn.bootcss.com/videojs-swf/5.4.1/video-js.swf';
      let myPlayer = videojs(
        myVideo,
        {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: false,
          //自动播放属性,muted:静音播放
          autoplay: true,
          // muted: false,
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "true",
          sources: [
            {
              src: self.LiveRoomData.hlsUrl,
              type: "application/x-mpegURL"
            }
          ]
          //设置视频播放器的显示宽度（以像素为单位）
        },
        function() {
          // myPlayer.currentTime(self.PlayProgres);
          // myPlayer.play();
          self.myPlayer = myPlayer;
          this.on("play", function() {
            // 播放器准备完毕
            // alert("播放器准备完毕,开始播放")
            self.initVeiw();

            //console.log("play");
            this.play();
            // //console.log(myPlayer.currentTime(50))
          });
          this.on("error", function(e) {
            console.log(e);
            self.anchorOutLine();
            self.$refs.ancher_Txt.innerHTML = "连接中";
            var TimeOut7;
            TimeOut7 = setTimeout(function() {
              self.errorData = e;
              clearTimeout(TimeOut7);
            }, 5000); // 自定义显示方式
          });
          this.on("timeupdate", function() {
            // console.log(self.moveCurrentTime)
            // self.myPlayer.currentTime(self.moveCurrentTime)
            if (self.LiveRoomData.playStatus == 2) {
              if (this.currentTime() < self.moveCurrentTime) {
                self.myPlayer.currentTime(self.moveCurrentTime);
              } else {
                self.videoPlayBgShow = false;
                // if(self.LiveRoomData.duration<=this.currentTime()){
                //   self.moveCurrentTime =0
                // }
                self.moveCurrentTime = this.currentTime();
                var baifengbi = (this.currentTime() / self.videoDuration) * 100;
                self.$refs.proess_end.style.width = baifengbi + "%";
                self.$refs.play_progress_current.style.width =
                  (this.currentTime() / self.videoDuration) * 370 + "px";
                self.$refs.progressBtn.style.left =
                  (this.currentTime() / self.videoDuration) * 370 + 172 + "px";
                self.$refs.play_currentTime.innerHTML = self.timeManage(
                  this.currentTime()
                );
                self.$refs.play_videoTime.innerHTML = self.timeManage(
                  self.videoDuration
                );
              }
            }
          }); /*播放中事件 */
          this.on("loadedmetadata", function() {
            if (self.LiveRoomData.playStatus == 2) {
              var videoTime = document.getElementById("myVideo_html5_api")
                .duration;
              self.videoDuration = videoTime;
              console.log(self.videoDuration);
            }
          });
          this.on("waiting", function() {
            // 播放过程中由于网络或其他原因产生的等待，此时视频播放暂停，等网络恢复后会自动执行【playing】自动播放
            console.log("waiting");
            clearInterval(self.InterVal2);
            self.delayVideo(self.dalyDuration);
            if (self.leaveRoom) {
              self.videoEndShow = true;
              self.DelayInit();
            }
            self.videoLoadShow = true;
            if (self.LiveRoomData.playStatus == 2) {
              self.myPlayer.currentTime(self.moveCurrentTime + 1);
              if (self.moveCurrentTime + 1 > self.videoDuration) {
                self.moveCurrentTime = 0;
                self.myPlayer.currentTime(1);
              }
            }
            // this.pause();
          });
          this.on("playing", function() {
            
            self.DelayInit();
            // 每次画面开始播放或是恢复播放都会执行
            // //console.log("≈");
            self.anchorNormal();
            self.videoLoadShow = false;
            this.play();
          });
        }
      );
    } /*视频初始化 */,
    play_pause() {
      this.myPlayer.pause();
      this.playing = false;
    } /*视频暂停*/,
    play_play() {
      this.myPlayer.play();
      this.playing = true;
    } /*视频播放控制按钮 */,
    control_touchStart(e) {
      this.controls_event(e);
    },
    progressBtn_touchStart(e) {
      this.myPlayer.pause();
    },
    progressBtn_touchMove(e) {
      this.controls_event(e);
    },
    progressBtn_touchEnd(e) {
      this.myPlayer.play();
      this.playing = true;
    },
    controls_event(e) {
      var clientX = e.touches[0].clientX;
      if (clientX < 190) {
        clientX = 190;
      } else if (clientX >= 550) {
        clientX = 559;
        return;
      }
      this.$refs.progressBtn.style.left = clientX - 18 + "px";
      this.$refs.play_progress_current.style.width = clientX - 190 + "px";
      var currentTime = ((clientX - 190) / 360) * this.videoDuration;
      // //console.log()
      this.moveCurrentTime = Math.floor(currentTime);
      // this.myPlayer.pause();
      this.myPlayer.currentTime(this.moveCurrentTime);

      // var video = document.getElementById("myVideo_html5_api");
      // video.currentTime = 50
      // this.myPlayer.currentTime(50);
    } /*播放控制条处理*/,
    timeManage(time) {
      var hour = Math.floor(time / 3600);
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minute = Math.floor(time / 60) % 60;
      if (minute < 10) {
        minute = "0" + minute;
      }
      var second = (Math.ceil(time) % 60) % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return hour + ":" + minute + ":" + second;
    } /* 视频时间格式化*/,
    speedEvent() {
      var video = document.getElementById("myVideo_html5_api");
      var speednum = [1.0, 1.5, 2.0];
      var speedTet = ["1.0X", "1.5X", "2.0X"];
      video.playbackRate = speednum[this.speed];
      this.$refs.speed.innerHTML = speedTet[this.speed];
      this.speed += 1;
      if (this.speed == 3) {
        this.speed = 0;
      }
    } /*切换视频播放倍数*/,
    showControlEvent() {
      //console.log("ASDASdadsd");
      this.showControl = true;
    } /*显示控制条*/,
    close() {
      this.show = false;
    },
    videoHide() {
      this.DelayInit();
      this.live_video_Dom = false;
      this.$router.push({
        query: {}
      });
      this.$emit("liveHidea", this.videoShow);
      this.WebSocketOut(this.ws, this.liveRoomId, this.userId);
      this.Statusbar("show");
      this.$store.dispatch("chaneColseVideoASY", true);
    } /*返回，视频组件隐藏 */,
    Statusbar(status) {
      var bridge = window["WebViewJavascriptBridge"];
      if (bridge) {
        bridge.callHandler("hideSystemStatusBar", status, function() {});
      }
    } /*隐藏状态栏*/,
    inputStart() {
      // if(!this.inputs){
      //   var hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
      //   this.$refs.myVideo.style.height = hrt + "px"; //输入框页面挤压问题解决
      // }
      this.inputs = true;
      this.placeholder = "输入点什么......";
      this.inputSClass = true;
      this.inputClass = false;
      this.sended = true;
      var self = this;
      var InputSetTime = setTimeout(function() {
        // self.$refs.inputbg.style.height = hrt/2 + "px"
        // self.$refs.inputbg.style.height = 649 + "px";
        self.$refs.elInput.focus(); //显示键盘
        clearTimeout(InputSetTime);
      }, 100); //解决获取焦点键盘不弹出问题
    } /*点击输入框，输入框获得焦点 */,
    touchBack() {
      // this.inputs = false;
      // this.placeholder = "跟主播聊点什么？";
      // this.inputSClass = false;
      // this.inputClass = true; /*input返回处理*/
      this.productShowSwitch = false; /*商品列表返回处理*/
      this.RewardShow = false; /*打赏页面关闭*/
      this.more = false; /*打赏功能关闭*/
      this.showControl = false; /*隐藏控制条 */
      this.shareShow = false;
    } /*触摸屏幕任意位置返回一切功能*/,
    listenKeybord($input) {
      var that = this;
      if (that.isIos()) {
        // IOS 键盘弹起：IOS 和 Android 输入框获取焦点键盘弹起
        $input.addEventListener(
          "focus",
          function() {
            this.inputs = true;
            this.placeholder = "输入点什么......";
            this.inputSClass = true;
            this.inputClass = false;
            this.sended = true;
            var self = this;
            // alert('IOS 键盘弹起啦！');
            // IOS 键盘弹起后操作
          },
          false
        );

        // IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
        $input.addEventListener("blur", () => {
          // alert('IOS 键盘收起啦！');
          // IOS 键盘收起后操作
          that.inputs = false;
          that.placeholder = "跟主播聊点什么？";
          that.inputSClass = false;
          that.inputClass = true; /*input返回处理*/
        });
      }
      // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
      if (!that.isIos()) {
        var originHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        window.addEventListener(
          "resize",
          function() {
            var resizeHeight =
              document.documentElement.clientHeight ||
              document.body.clientHeight;
            if (originHeight < resizeHeight) {
              // Android 键盘收起后操作
              that.inputs = false;
              that.placeholder = "跟主播聊点什么？";
              that.inputSClass = false;
              that.inputClass = true; /*input返回处理*/
            } else {
              this.inputs = true;
              this.placeholder = "输入点什么......";
              this.inputSClass = true;
              this.inputClass = false;
              this.sended = true;
              var self = this;
              // alert('Android 键盘弹起啦！');
              // Android 键盘弹起后操作
            }
            originHeight = resizeHeight;
          },
          false
        );
      }
    },
    send() {
      var msg = this.$refs.elInput.value;
      this.$refs.elInput.value = "";
      if (msg != "") {
        this.WebSocketSend(this.ws, this.liveRoomId, this.userId, msg);
        this.inputs = false;
        this.inputSClass = false;
        this.inputClass = true; /*input返回处理*/
      }
    } /*聊天发送*/,
    productShow() {
      this.productShowSwitch = true;
    } /*商品列表展示 */,
    guanzhua() {
      var params = { anchorId: this.LiveRoomData.id };
      this.$post(this.$global.globalUrl + "live/follower/add.do", params).then(
        res => {
          if (res.code == 0) {
            this.guanzhu = false;
            this.$refs.head_bg.style.width = "270px";
            this.MessageHide = true;
          }
        }
      );
    } /*添加关注*/,
    isFollower() {
      var params = { anchorId: this.LiveRoomData.id };
      this.$post(
        this.$global.globalUrl + "live/follower/isFollower.do",
        params
      ).then(res => {
        if (res.code == 1) {
          this.guanzhu = false;
          this.$refs.head_bg.style.width = "270px";
        } else {
          this.guanzhu = true;
          this.$refs.head_bg.style.width = "371px";
        }
      });
    } /*检测是否关注 */,
    morea() {
      this.more = true;
    } /*展开打赏功能*/,
    moreaShow() {
      this.more = false;
    } /*打赏功能关闭*/,
    test() {
      var bridge = window["WebViewJavascriptBridge"];
      if (bridge) {
        var redirectValue =
          "https://ah.10086.cn/mpad/pad/kd/html/C032921D5A995805CCE053D404F30A151D.html?supplierID=32921D5A995805CCE053D404F30A151D&sonSupplierID=32921D5A995805CCE053D404F30A151D&temlateId=C0";
        bridge.callHandler(
          "jumpHuishenghuoH5",
          JSON.stringify({
            url: redirectValue,
            needLogin: true,
            loginFlag: "0",
            redirectType: "4",
            redirectValue: redirectValue,
            detailUrl: "",
            ssoLoginFlag: "0",
            className: "com.cmcc.sjyyt.common.jump.JumpHelper",
            method: "a,jump"
          }),
          function() {}
        );
      }
    } /*惠生活打开外部链接*/,
    rewardShow() {
      this.RewardShow = true;
    } /*打赏页面显示*/,
    addLikeNum() {
      // this.test();
      this.dianzan(this.ws, this.liveRoomId, this.userId);
    } /*点赞喜欢*/,
    getLiveRoomDate() {
      //console.log(this.anchorId);
      var anchorId;
      if (this.anchorId == undefined) {
        anchorId = 0;
      } else {
        anchorId = this.anchorId;
      }
      var playStatus;
      if (this.playStatus == undefined) {
        playStatus = 0;
      } else {
        playStatus = this.playStatus;
      }
      var RoomId;
      if (this.RoomId == undefined) {
        RoomId = 0;
      } else {
        RoomId = this.RoomId;
      }
      var params = {
        anchorId: anchorId,
        playStatus: playStatus,
        liveRoomId: RoomId
      };
      this.$post(this.$global.globalUrl + "live/play/info.do", params)
        .then(res => {
          if (res.code == "0") {
            var TimeOut8;
            this.LiveRoomData = res.data;

            var that = this;
            TimeOut8 = setTimeout(function() {
              that.live_video_Dom = true; /*收到数据dom显示*/
              that.isFollower(); /*检测关注 */
              if (that.LiveRoomData.imgStatus == 1) {
                that.guaipingstatus = 1;
                var TimeOut = setTimeout(() => {
                  that.guaipingImg = that.LiveRoomData.roomSmallImgUrl;
                  that.$refs.guapin.style.width =
                    that.LiveRoomData.imgWidth + "px";
                  that.$refs.guapin.style.height =
                    that.LiveRoomData.imgHight + "px";
                  that.$refs.guapin.style.top =
                    that.LiveRoomData.ycoordinate + "px";
                  that.$refs.guapin.style.right =
                    that.LiveRoomData.xcoordinate + "px";
                  clearTimeout(TimeOut);
                }, 100);
              }
              clearTimeout(TimeOut8);
            }, 500);

            this.setWatchTimes(this.LiveRoomData.watchTimes);
            // this.videoHttp();
            // this.videolost();
            this.$router.push({
              query: {
                anchorId: this.LiveRoomData.id,
                RoomId: this.LiveRoomData.liveRoomId,
                playStatus: this.LiveRoomData.playStatuss,
                videoShow: true,
                transitionName: true
              }
            });
            this.WebSocketInit(this.LiveRoomData);
            if (this.LiveRoomData.playStatus == 2) {
              this.oldVideo = true;
            } else if (this.LiveRoomData.playStatus == 1) {
              this.oldVideo = false;
            }

            /*获取点赞数量 */
            this.setLikeNum(this.LiveRoomData.praiseCount);
            // this.Statusbar("hide");

            var that = this;
            var TimeOut3;
            TimeOut3 = setTimeout(function() {
              that.inputDom = document.getElementById("inputDom");
              that.listenKeybord(that.inputDom);
              that.danmubox = document.getElementById("danmu_box");
              that.initVideo();
              clearTimeout(TimeOut3);
              var hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
              that.$refs.myVideo.style.height = hrt + "px"; //输入框页面挤压问题解决
            }, 600); /*dom显示完成才可以初始化，加个时间差 */
          }
        })
        .catch(err => {
          this.videoHide();
        });
    } /* 直播数据*/,
    mobileProductLink(transmit) {
      //console.log(this.token);
      this.isAndroid();
      var bridge = window["WebViewJavascriptBridge"];
      if (bridge) {
        var redirectValue;
        //console.log(transmit.goodsUrl);
        if (transmit.goodsUrl.indexOf("?") !== -1) {
          redirectValue = transmit.goodsUrl + "&dwtoken=" + this.token;
        } else {
          redirectValue = transmit.goodsUrl + "?dwtoken=" + this.token;
        }

        //console.log(redirectValue);
        bridge.callHandler(
          "jumpHuishenghuoH5",
          JSON.stringify({
            url: redirectValue,
            needLogin: true,
            loginFlag: "0",
            redirectType: "4",
            redirectValue: redirectValue,
            detailUrl: "",
            ssoLoginFlag: "0",
            className: this.isIos()
              ? "PageJumpManager"
              : "com.cmcc.sjyyt.common.jump.JumpHelper",
            method: this.isIos() ? "goPageViewWithRedirectType" : "a,jump"
          }),
          function() {}
        );
      }
    } /*移动商品跳转 */,
    createrToken(transmit) {
      var PlayProgres = this.myPlayer.currentTime();
      var params = {
        liveRoomId: this.liveRoomId,
        progress: PlayProgres
      };
      var that = this;
      this.$post(
        this.$global.globalUrl + "live/product/generateToken.do",
        params
      ).then(res => {
        if (res.code == 0) {
          that.token = res.data;
          //console.log(that.token);
          that.mobileProductLink(transmit);
        }
      });
    },
    isAndroid() {
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        if (window.ShowFitness !== undefined) return true;
      }
      return false;
    }, // 判断安卓
    isIos() {
      var u = navigator.userAgent;
      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true;
      }
      return false;
    }, // 判断设备为 ios
    gogoodDetail(transmit) {
      this.DelayInit();
      this.WebSocketOut(this.ws, this.liveRoomId, this.userId);
      var PlayProgres = this.myPlayer.currentTime();
      //console.log(this.liveRoomId);
      //console.log(transmit);
      if (transmit.type == "1") {
        this.createrToken(transmit);
      } else {
        this.$router.push({
          path: "/shop",
          query: {
            goodId: transmit.goodsId,
            hlsUrl: encodeURIComponent(this.LiveRoomData.hlsUrl),
            anchorId: this.anchorId,
            playStatus: this.playStatus,
            PlayProgres: PlayProgres,
            RoomId: this.liveRoomId
          }
        });
      }
    } /*获取组件商品ID做路由跳转*/,
    videoBgTouchStr(e) {
      this.$refs.man_cont.style.transition = "";
      this.originPoint = e.touches[0].clientX;
      this.touchBack();
    } /*内容背景触碰*/,
    videoBgTouchMov(e) {
      this.$refs.man_cont.style.left =
        e.touches[0].clientX - this.originPoint + "px";
      this.differencePoint = e.touches[0].clientX - this.originPoint;
    } /*内容背景滑动 */,
    videoBgTouchEnd(e) {
      if (typeof this.differencePoint != "number") {
        return;
      }
      if (this.differencePoint < -500) {
        this.$refs.man_cont.style.transition = "all 0.3s";
        this.$refs.man_cont.style.left = "-750px";
        this.touchBack();
      } else {
        this.$refs.man_cont.style.left = "0px";
      }
    } /*内容背景结束触碰 */,
    videoTouchStr(e) {
      this.originPoint = e.touches[0].clientX;
      this.$refs.man_cont.style.transition = "";
    } /*视频背景触碰*/,
    videoTouchMov(e) {
      this.$refs.man_cont.style.left =
        (e.touches[0].clientX - this.originPoint) * 2 - 750 + "px";
      this.differencePoint = e.touches[0].clientX - this.originPoint;
    } /*视频背景滑动 */,
    videoTouchEnd(e) {
      if (typeof this.differencePoint != "number") {
        return;
      }
      if (this.differencePoint > 180) {
        this.$refs.man_cont.style.transition = "all 0.3s";
        this.$refs.man_cont.style.left = "0px";
      } else {
        this.$refs.man_cont.style.left = "-750px";
      }
    } /*视频背景结束触碰 */,
    toFollowDetail() {
      this.DelayInit();
      this.WebSocketOut(this.ws, this.liveRoomId, this.userId);
      var PlayProgres = this.myPlayer.currentTime();
      this.$router.push({
        path: "./followDetail",
        query: {
          anchorId: this.LiveRoomData.id,
          RoomId: this.LiveRoomData.liveRoomId,
          playStatus: this.LiveRoomData.playStatus,
          PlayProgres: PlayProgres
        }
      });
      this.$emit("followVideo");
    } /*跳转主播详情页*/,
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
        imgUrl: this.LiveRoomData.coverImg
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
        imgUrl: this.LiveRoomData.coverImg
      };
      if (bridge) {
        bridge.callHandler("shareWebpage", JSON.stringify(jsonObj));
      }
    },
    anchorOutLine() {
      this.videoHiden = true;
      // document.getElementsByClassName("video-js")[0].style.display = "none";
    } /**主播离开*/,
    anchorNormal() {
      this.videoHiden = false;
      // document.getElementsByClassName("video-js")[0].style.display = "block";
      /**主播正常 */
    },
    delayVideo() {
      var that = this;
      this.InterVal2 = setInterval(() => {
        that.delayTime++;
        console.log(that.delayTime);
        if (that.dalyDuration == that.delayTime) {
          that.myPlayer.load();
          that.dalyDuration += 10;
        }
      }, 1000);
    },
    DelayInit() {
      clearInterval(this.InterVal2);
      this.delayTime = 0;
      this.dalyDuration = 10;
    } /*清除定时初始化加载延迟*/,
    videoHttp() {
      var that = this;
      var Interval;
      $.ajax({
        url: that.LiveRoomData.hlsUrl,
        success: function(data) {},
        error: function(jqXHR, textStatus, errorThrown) {
          /*弹出jqXHR对象的信息*/
          if (jqXHR.status == 404) {
            that.anchorOutLine();
            that.isrefresh = true;
            that.$refs.ancher_Txt.innerHTML = "主播失去连接";
          }
        },
        complete: function(xhr) {
          //console.log("complete", xhr);
          if ((xhr.status == 200 || 0) && (xhr.readyState == 4 || 0)) {
            that.refresh();
            if (that.isinitVeiw) {
              that.initVeiw();
            }
          }
        }
      });
    },
    refresh() {
      if (this.isrefresh) {
        this.isrefresh = false;
        this.$refs.ancher_Txt.innerHTML = "主播重新连接中";
        // this.anchorNormal()
        var TimeOut4;
        TimeOut4 = setTimeout(function() {
          // that.myPlayer.src(this.LiveRoomData.hlsUrl)
          that.myPlayer.load();
          clearTimeout(TimeOut4);
        }, 5000);
      }
    },
    initVeiw() {
      this.anchorNormal();
      this.isinitVeiw = false;
    }
  },
  created() {},
  mounted() {
    this.moveCurrentTime = this.PlayProgres;
    this.getLiveRoomDate();
    var that = this;
    window.addEventListener("online", function() {
      // that.anchorNormal();
      // that.WebSocketInit(that.LiveRoomData);
      that.$refs.ancher_Txt.innerHTML = "重新连接中";
      if (that.online) {
        var TimeOut5;
        TimeOut5 = setTimeout(function() {
          clearTimeout(TimeOut5);
          location.reload();
          // that.myPlayer.src(this.LiveRoomData.hlsUrl)
          // that.myPlayer.load()
          // that.anchorNormal();
        }, 5000);
      }

      // 网络由异常到正常时触发
    });
    window.addEventListener("offline", function() {
      that.online = true;
      that.anchorOutLine();
      that.$refs.ancher_Txt.innerHTML = "当前网络异常";
      // 网络由正常常到异常时触发
    });
  },
  beforeDestroy() {
    this.myPlayer.dispose();
  }
};
</script>
<style lang="stylus" scoped>
.videoEnd {
  width: 750px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;

  .videoEndImg {
    width: 750px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    filter: blur(30px);
    z-index 1
  }

  .videoEnd_txt {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 750px;
    height: 100px;
    font-size: 38px;
    color: #fff;
    text-shadow: 5px 1px 6px #F93;
    font-size: 38px;
    letter-spacing: 7px;
    text-align: center;
    z-index 2
  }
}

.videoLoad {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 2;
  width: 100px;
}

.gasket {
  position: absolute;
  width: 750px;
  bottom: -24px;
  left: 0;
}

.video_imgBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  height: 100%;
  z-index: 1;
  filter: blur(30px);
}
.video_imgBg_bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 750px;
  height: 100%;
  z-index: 1;
}
.mode{
  width 750px;
  height 100%;
  top 0
  left 0
  position absolute
  opacity 0.5
  background #000
  z-index 1
}
.alterBtn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 70px;
  margin: auto;
}

.redend {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1000;
  width: 500px;
  height: 600px;
}

.alert {
  width: 500px;
  height: 600px;
  background: #ffffff;
  border-radius: 30px;
  font-size: 30px;
  color: #373737;
  line-height: 300px;
}

.guapin {
  position: absolute;
  z-index: 1;
}

.redPacketWarp {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  height: 594px;
  z-index: 1000;
}

.notice_warp {
  position: absolute;
  top: 200px;
  left: 0px;
  z-index: 10000;
}

.ancher_out {
  width: 750px;
  position: absolute;
  height: 1100px;
  top: 0;
  left: 0;
  z-index: 3;

  .ancher_outImg {
    width: 100%;
    height: 100%;
  }

  .ancher_Txt {
    position: absolute;
    width: 300px;
    height: 100px;
    background: #000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    color: #ffffff;
    font-size: 30px;
    opacity: 0.5;
    text-align: center;
    line-height: 100px;
    border-radius: 50px;
  }
}

.input_bg {
  width: 750px;
  position: absolute;
  bottom: 0;
  background: #d3d4d8;
  opacity: 1;
  z-index: 2;
}

.share_box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 651px;
  height: 300px;
  padding: 50px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  z-index: 10;
  background: #f3f3f3;
  display: flex;
  flex-direction: rows;

  .share_item {
    display: flex;
    flex-direction: column;
    margin-left: 141px;
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

.video_control_bg {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: #000;
  opacity: 0.3;
  z-index: 1;
  display: flex;
  flex-direction: row;
}

.control_box {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  display: flex;
  flex-direction: row;

  .control_pause {
    width: 47px;
    height: 47px;
    margin-top: 16px;
    margin-left: 17px;
  }

  .control_play {
    width: 42px;
    height: 38px;
    margin-top: 20px;
    margin-left: 22px;
  }

  .play_currentTime {
    height: 80px;
    width: 125px;
    line-height: 80px;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
  }

  .play_videoTime {
    height: 80px;
    width: 89px;
    line-height: 80px;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    margin-left: 18px;
  }

  .play_progress_bg {
    width: 370px;
    height: 8px;
    background: #afafae;
    border-radius: 3px;
    margin-top: 36px;
  }

  .play_progress_current {
    width: 0px;
    height: 8px;
    background: #eb5428;
    border-radius: 3px;
    position: absolute;
    top: 36px;
    left: 190px;
  }

  .touch_progress {
    position: absolute;
    height: 60px;
    width: 370px;
    left: 190px;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.3;
  }

  .progressBtn {
    position: absolute;
    top: 20px;
    width: 36px;
    left: 172px;
  }

  .speed {
    color: #ffffff;
    font-size: 18px;
    width: 65px;
    height: 38px;
    border-radius: 19px;
    border: 1px solid #ffffff;
    margin-top: 20px;
    line-height: 38px;
    text-align: center;
    margin-left: 7px;
  }
}

.proess {
  width: 100%;
  height: 79px;
  position: absolute;
  bottom: 0px;
  left: 0;
  border-bottom: 10px solid #666666;
  z-index: 1;
  display: flex;
  flex-direction: row;
}

.proess_end {
  width: 10%;
  height: 10px;
  background: #ff5700;
  position: absolute;
  bottom: -10px;
  left: 0;
  z-index: 1;
}

.color1 {
  color: #fdd5d5;
}

.color2 {
  color: #fdd979;
}

.color3 {
  color: #d7ecc1;
}

.color4 {
  color: #9dd6e9;
}

.bottom_warp {
  position: absolute;
  bottom: 0px;
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

.my-enter-active {
  transition: all 0.3s;
}

.my-leave-active {
  transition: all 0.3s;
}

.my-enter, .my-leave-to {
  transform: translateY(850px);
  opacity: 1;
}

.productList {
  position: absolute;
  bottom: -47px;
  left: 0;
  z-index: 1000;
}

.send {
  width: 150px;
  position: absolute;
  right: 0;
  bottom: 0px;
  margin: auto;
  height: 80px;
  background: #e51d37;
  color: #fffdf6;
  font-size: 35px;
  line-height: 80px;
  text-align: center;
  z-index: 2;
}

.sended {
  bottom: 0px;
}

.input {
  width: 350px;
  height: 50px;
  position: absolute;
  bottom: 28px;
  left: 110px;
  background: rgba(0, 0, 0, 0);
  border-radius: 5px;
  border: none;
  inset-inline: none;
  color: #fff;
  font-size: 24px;
  padding-left: 20px;
  z-index: 100;
}

.inputS {
  position: absolute;
  bottom: 0px;
  left: 0;
  margin: auto;
  background: #fff;
  font-size: 30px;
  color: #aaa;
  height: 80px;
  width: 600px;
  border: none;
  outline: none;
  border-radius: 0px;
  line-height: 80px;
  z-index: 2;
}

.input::-webkit-input-placeholder {
  color: #fff;
  font-size: 28px;
}

.input::-moz-placeholder {
  color: #fff;
  font-size: 24px;
}

.input:-ms-input-placeholder {
  color: #fff;
  font-size: 24px;
}

.inputS::-webkit-input-placeholder {
  color: #aaa;
  font-size: 24px;
}

.inputS::-moz-placeholder {
  color: #aaa;
  font-size: 24px;
}

.inputS:-ms-input-placeholder {
  color: #aaa;
  font-size: 24px;
}

.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #000;
  overflow: hidden;

  #myVideo {
    height: 100%;
    width: 750px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .man_cont {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    .head {
      margin-left: 27px;
      margin-top: 24px;
      color: #ffffff;

      .head_bg1 {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 371px;
        height: 75px;
        background: #000;
        border-radius: 45px;
        opacity: 0.6;
      }

      .heard {
        position: absolute;
        top: 24px;
        left: 24px;
        border-radius: 50%;
        width: 70px;
        height: 70px;
      }

      .head_conte {
        position: absolute;
        top: 21px;
        left: 110px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        text-align: left;
        font-size: 20px;
        width: 145px;
        height: 78px;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;

        .name {
          font-size: 22px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          height: 44px;
          line-height: 44px;
        }

        .watchNum {
          height: 44px;
          line-height: 44px;
          letter-spacing: 0px;
        }
      }

      .guanzhu {
        position: absolute;
        top: 32px;
        left: 269px;
      }
    }

    .tishi {
      position: absolute;
      top: 69px;
      left: 302px;
      width: 268px;
      height: 92px;
    }

    .black_min {
      position: absolute;
      top: 121px;
      left: 529px;
    }

    .black_bg {
      position: absolute;
      top: 21px;
      left: 647px;
      background: #000;
      width: 75px;
      height: 75px;
      border-radius: 50px;
      opacity: 0.5;
    }

    .black {
      position: absolute;
      top: 40px;
      left: 666px;
      z-index: 3;
    }

    .danmu_box {
      width: 520px;
      height: 310px;
      position: absolute;
      bottom: 162px;
      left: 20px;
      flex-direction: column;
      overflow-y: scroll;
      overflow-x: hidden;

      .zhanwei {
        width: 100%;
        float: left;
        margin: 5px;

        span {
          color: #ffffff;
          font-size: 28px;
          float: left;
          display: inline-block;
          background: rgba(0, 0, 0, 0.2);
          padding: 10px;
          line-height: normal;
          border-radius: 5px;
          text-align: left;
          letter-spacing: 1px;
        }
      }
    }

    .oldDanmu {
      bottom: 253px;
    }

    .bottom_warp {
      .shopcar {
        position: absolute;
        left: 20px;
        bottom: 20px;
      }

      .reward {
        position: absolute;
        bottom: 83px;
        left: 504px;
        width: 80px;
        height: 80px;
        background: #000;
        opacity: 0.4;
        border-radius: 40px;
      }

      .reward_txt {
        position: absolute;
        bottom: 83px;
        left: 504px;
        width: 80px;
        height: 80px;
        font-size: 30px;
        color: #ffffff;
        line-height: 80px;
        text-align: center;
      }

      .xian {
        width: 390px;
        height: 1px;
        background: #ffffff;
        position: absolute;
        left: 106px;
        bottom: 30px;
      }

      .black_bottom {
        position: absolute;
        bottom: 31px;
        left: 525px;
      }

      .more1 {
        position: absolute;
        bottom: -1px;
        left: 498px;
        width: 100px;
      }

      .share {
        position: absolute;
        bottom: 31px;
        left: 577px;
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
    }
  }

  .putUp {
    position: absolute;
    right: 0px;
    bottom: 100px;
    z-index: 2;
  }

  .Message_position {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 200px;
    margin: auto;
  }

  .old_bottom {
    position: absolute;
    bottom: 73px;
  }

  .oldInput {
    bottom: 101px;
  }

  .oldUp {
    bottom: 151px;
  }
}
</style>