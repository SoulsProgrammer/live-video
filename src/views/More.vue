<template>
  <div :class="{more_warp:true,overflowHide:videoShow}" @scroll="menu" ref="wrap">
    <div class="more">
        <img src="../assets/images/zhubo_fanhui.png" alt="" class="black" @click="black">
        移动专区</div>
    <div class="main_bg">
        <div class="main_warp">
            <div v-for="(list,index) in delicacyList " :key="index">
                <product @liveVideoa="getLiveVideo" :list="list"></product>
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
          >
        </live-video>
      </div>
    </transition>
  </div>
</template>

<script>
import LiveVideo from "@/components/LiveVideo.vue";
import Product from "@/components/Product.vue";
export default {
  components: {
    Product,
    LiveVideo
  },
  data() {
    return {
        videoShow:false,
        clientHeight: "",
        startNum: 0,
        endNum: 10,
        delicacyListEnd: false,
        anchorId: Number,
        playStatus:Number,
        RoomId:0,
        PlayProgres: 0,
        delicacyList:[],
        transitionName:"videoFade"
    };
  },
  computed: {},
  watch: {},
  methods: {
    setHeight() {
      this.clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
      this.$refs.wrap.style.height = this.clientHeight + "px"; //输入框页面挤压问题解决
    },
    getLiveVideo(msg) {
      this.videoShow = msg.videoShow;
      this.anchorId = msg.anchorId;
      this.playStatus = msg.playStatus;
      this.RoomId = msg.liveRoomId;
    },
    hideLiveVideo(msg) {
      this.videoShow = msg;
      this.PlayProgres = 0; //视频返回播放时间清除
    }, //视频返回
    getSelectedList(startNum, endNum) {
      var params = { start: startNum, end: endNum };
      this.$post(this.$global.globalUrl + "/live/cmccLiveList.do", params).then(
        res => {
          if (res.code == 0) {
            //console.log(res);
            if (!res.data.isEnd) {
              this.delicacyListEnd = true;
            }
            this.startNum += 11;
            this.endNum += 11;
            for (var i = 0; i < res.data.anchorList.length; i++) {
              this.delicacyList.push(res.data.anchorList[i]);
            }
            //console.log(this.delicacyList);
          }
        }
      );
    } /*精选列表接口*/,
    menu(e) {
      e = e || window.event;
      if (
        Math.ceil(e.srcElement.scrollTop + this.clientHeight) ==
          e.srcElement.scrollHeight &&
        !this.delicacyListEnd
      ) {
        this.getSelectedList(this.startNum, this.endNum);
      }
    },
    black(){
        this.$router.push({ path: "/" });
    },
    RouteQuery() {
      this.anchorId = this.$route.query.anchorId;
      this.playStatus = this.$route.query.playStatus;
      this.RoomId = this.$route.query.RoomId;
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
  },
  created() {
    
  },
  mounted() {
      this.setHeight()
      this.getSelectedList(this.startNum, this.endNum)
      this.RouteQuery()
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

.more_warp{
  width: 750px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 0;
}
.black{
    width: 57px;
    position: absolute;
    left: 16px;
    top: 18px;
}
.more{
    height 88px;
    background #0589fe
    font-size 28px;
    line-height 88px;
    color #fff
    position fixed
    top 0
    left 0
    width 100%
    z-index 11
}
.main_bg {
  width: 750px;
  background-color: #f0efed;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  top 0

  .main_warp {
    width: 705px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
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
.overflowHide {
  overflow: hidden;
}
</style>