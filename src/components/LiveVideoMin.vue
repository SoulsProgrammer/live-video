<template>
  <div class="wrapper">
    <div
      class="video_warp"
      ref="video_warp"
      id="video_warp"
      @touchstart.stop="videoMinStart"
      @touchmove.prevent="videoMinMove"
      @touchend.prevent="videoMinEnd"
    >
      <video
        poster="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg"
        id="myVideo"
        class="video-js"
        loop
        autoplay
        width="200"
        height="366"
        style="object-fit:cover;z-index:1"
        x5-video-player-type="h5"
        x5-playsinline
        playsinline
        webkit-playsinline
        x-webkit-airplay="allow"
      >
        <!-- <source src="http://wmhlsdown.qn-it.com/livewanmei/livetest/index.m3u8"> -->
        <!-- <source src="http://i.haituie.com/621335/b052c7f45809d1b5eb14eaacc2219f4b.mp4"> -->
        <!-- <source :src="hlsUrl" /> -->
      </video>
      <div class="black" @touchstart.stop="cancel">
        <img src="../assets/images/black_min.png" alt class="black_min" />
      </div>
      <img
        src="https://liveimg.appcoo.com/h5/images/video_bg_img.jpg"
        alt
        class="minVideoBg"
        v-if="minVideoBgShow"
      />
      <img src="../assets/images/loadHttp.gif" alt="" class="videoLoad" v-if="videoLoadShow">
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
import "videojs-flash";
export default {
  components: {},
  props: ["list"],
  data() {
    return {
      VideoHide: true,
      eleVideo: null,
      differenceX: 0,
      differenceY: 0,
      myPlayer: null,
      hlsUrl: "",
      errorData: null,
      PlayProgresTime: 0,
      minVideoBgShow: false,
      videoLoadShow:false
    };
  },
  watch: {
    errorData(newValue, oldValue) {
      this.myPlayer.src(this.hlsUrl);
      this.myPlayer.load();
    }
  },
  computed: {},
  methods: {
    initVideo() {
      var self = this;
      //初始化视频方法
      // videojs.options.flash.swf =
      //   "https://cdn.bootcss.com/videojs-swf/5.4.1/video-js.swf";
      let myPlayera = videojs(
        myVideo,
        {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: false,
          //自动播放属性,muted:静音播放
          autoplay: true,
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "true",
          sources: [
            {
              src: self.hlsUrl,
              type: "application/x-mpegURL"
            }
          ]
          //设置视频播放器的显示宽度（以像素为单位）
        },
        function() {
          //console.log("videojs播放器初始化成功");
          self.PlayProgresTime = Math.ceil(self.list.PlayProgres);
          self.myPlayer = myPlayera;
          self.myPlayer.src(self.hlsUrl)
          // if (self.list.playStatus == 2) {
          //     console.log(self.list.playStatus)
          //     this.currentTime(self.PlayProgresTime); //播放进度不变继续播放
          //     var TimeOut10 = setTimeout(() => {
          //       self.minVideoBgShow = false;
          //       clearTimeout(TimeOut10);
          //     }, 500);
          //   }
          
          // //console.log(self.list.playStatus)

          //  myPlayera.play();
          this.on("play", function() {
            // 播放器准备完毕
            // alert("播放器准备完毕,开始播放")
            // this.play();
          });
          this.on("timeupdate", function() {
           if (self.list.playStatus == 2) {
              self.$emit("minPlayProgres", this.currentTime());
            }
          }); /*视频播放中回调 */
          this.on("loadedmetadata", function() {
            if (self.list.playStatus == 2) {
              console.log(self.list.playStatus)
              self.myPlayer.currentTime(self.PlayProgresTime); //播放进度不变继续播放
              var TimeOut10 = setTimeout(() => {
                self.minVideoBgShow = false;
                clearTimeout(TimeOut10);
              }, 500);
            }
            self.myPlayer.play()
          });
          this.on("error", function(e) {
            var TimeOut7;
            TimeOut7 = setTimeout(function() {
              self.errorData = e;
              //console.log(e);
              clearTimeout(TimeOut7);
            }, 5000); // 自定义显示方式
          });
          this.on("waiting", function() {
            // 播放过程中由于网络或其他原因产生的等待，此时视频播放暂停，等网络恢复后会自动执行【playing】自动播放
            console.log("waiting");
            // this.pause();
          });
          this.on("playing", function() {
            // 每次画面开始播放或是恢复播放都会执行
            console.log("≈");
            this.play();
            if(self.list.playStatus == 1){
              self.minVideoBgShow = false;
            }
          });
        }
      );
    },
    cancel() {
      this.$emit("minVideoHide", this.VideoHide);
    },
    videoMinStart(e) {
      var eleVideo = document.getElementById("video_warp");
      this.eleVideo = eleVideo;
      var self = this;
      //console.log(e.touches[0].clientX);
      const top = window.getComputedStyle(self.eleVideo, null).top;
      const topNum = Number(top.substring(0, top.length - 2));
      const left = window.getComputedStyle(self.eleVideo, null).left;
      const leftNum = Number(left.substring(0, left.length - 2));
      this.differenceX = e.touches[0].clientX - leftNum;
      this.differenceY = e.touches[0].clientY - topNum;
      //console.log(this.differenceX);
    },
    videoMinMove(e) {
      this.eleVideo.style.left = e.touches[0].clientX - this.differenceX + "px";
      this.eleVideo.style.top = e.touches[0].clientY - this.differenceY + "px";
      if (e.changedTouches[0].clientY - this.differenceY < 2) {
        this.eleVideo.style.top = "2px";
      } else if (e.changedTouches[0].clientY - this.differenceY > 1153) {
        this.eleVideo.style.top = "1153px";
      }
      if (e.changedTouches[0].clientX - this.differenceX < 15) {
        this.eleVideo.style.left = "15px";
      } else if (e.changedTouches[0].clientX - this.differenceX > 536) {
        this.eleVideo.style.left = "536px";
      }
    },
    videoMinEnd(e) {
      //console.log(e.changedTouches[0].clientY - this.differenceY);
      if (e.changedTouches[0].clientX - this.differenceX < 266) {
        this.eleVideo.style.transform = "translateX(-200px,0px)";
        this.eleVideo.style.left = "15px";
      } else {
        this.eleVideo.style.left = "536px";
      }
    },
    RouterQuery() {} //参数处理
  },
  created() {
    this.hlsUrl = this.list.hlsUrl;
    
    console.log(this.PlayProgresTime)
  },
  mounted() {
    this.initVideo();
    this.RouterQuery();
  },
  beforeDestroy: function() {
    this.myPlayer.dispose();
  }
};
</script>
<style lang="stylus" scoped>
.vjs-poster{
  filter blur(30px)
}
.videoLoad{
  position: absolute;
  top: 0;
  left: 0;
  right 0
  bottom 0
  margin auto
  z-index: 11;
}
.minVideoBg {
  width: 194px;
  height: 340px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  filter: blur(30px);
}

#myVideo_html5_api {
  border-radius: 10px;
}

.video_warp {
  position: fixed;
  width: 194px;
  height: 340px;
  overflow: hidden;
  bottom: 200px;
  right: 50px;
  transition: all 0.8 ease;
}

.wrapper {
  bottom: 200px;
  right: 50px;
  z-index: 100;

  #myVideo {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    width: 194px;
    height: 340px;
    z-index: 1;
  }

  .black {
    width: 55px;
    height: 55px;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    .black_min {
      position: absolute;
      top: 14px;
      left: 14px;
    }
  }
}
</style>