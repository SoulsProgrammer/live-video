<template>
  <div class="notice-warp" ref="noticeWarp" style="display:none">
      <img src="../assets/images/notice.png" alt="" class="noticeImg">
    <div class="noticeContentWarp">
      <div class="content_bg"></div>
      <div class="content" ref="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notice", "timer"],
  components: {},
  data() {
    return {
      Interval: null,
      timered: 1,
      noticeArr: [],
      initArrLength: 0
    };
  },
  computed: {},
  watch: {
    Interval(newValue, oldValue) {
      this.watchMessage(newValue, this.initArrLength);
    },
    notice(newValue, oldValue) {
      clearInterval(this.Interval);
      this.Interval = null;
      this.timered = 1;
      this.messageDispose();
    }
  },
  methods: {
    Notice(message, index) {
      this.$refs.noticeWarp.style.display = "block";
      this.$refs.content.innerHTML = message;
      var Width = String(
        window.getComputedStyle(this.$refs.content, null).width
      );
      var Width = Width.substring(0, Width.length - 2);
      var left = 750;
      var that = this;
      this.Interval = setInterval(() => {
        left -= 5;
        that.$refs.content.style.left = left + "px";
        if (left < -(Number(Width) + 100)) {
          clearInterval(that.Interval);
          that.Interval = index;
          that.initArrLength = index;
          that.$refs.noticeWarp.style.display = "none";
        }
      }, 30);
    } /*滚屏公告功能*/,
    messageDispose() {
      this.noticeArr = this.notice.split("&");
      //console.log(this.noticeArr)
      if (this.noticeArr[0] == "") {
      } else {
        this.Notice(this.noticeArr[0], 0);
      }
    } /*公告消息处理初始运行滚动*/,
    watchMessage(newValue, index) {
      if (newValue == index) {
        if (this.noticeArr.length > index + 1) {
          this.Notice(this.noticeArr[index + 1], index + 1);
        } else {
          if (this.timer == -1) {
            this.Notice(this.noticeArr[0], 0);
          } else if (this.timered < this.timer) {
            this.timered++;
            this.Notice(this.noticeArr[0], 0);
          }
          return;
        }
      }
    } /** */
  },
  created() {},
  mounted() {
    this.messageDispose();
    // if(this.notice==""){

    // }else{
    //     this.initNotice(this.notice)
    // }
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    clearInterval(this.Interval);
    this.Interval = null;
  },
  destroyed() {},
  activated() {}
};
</script>
<style lang='stylus' scoped>
.notice-warp {
  position: relative;
  color: #ffffff;
  width: 750px;
  height: 70px;
  right 0
  background: rgba(226, 62, 110, 0.6);
  .noticeImg{
      width 45px;
      position absolute
      left: 11px;
      top: 13px;
  }
  .noticeContentWarp {
      width: 681px;
      height: 70px;
      overflow-x: scroll;
      overflow-y: hidden;
      position: absolute;
      right: 0;
    .content_bg {
      position: absolute;
      width: 681px;
      height: 70px;
    }

    .content {
      position: absolute;
      top: 0;
      left: 681px;
      display: inline;
      height: 70px;
      line-height: 70px;
      word-break: keep-all;
      white-space: nowrap;
      color: #fdfdfd;
      font-size: 48px;
      letter-spacing: 3px;
    }
  }
}
</style>