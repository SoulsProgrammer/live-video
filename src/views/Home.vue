<template>
  <div
    class="home"
    id="home"
    @touchstart="wrapstart"
    @touchmove="wrapmove"
    @touchend="wrapend"
    ref="home"
  >
    <div class="mode"></div>
    <Nav :choosed="choosed" @changeSelect="changeSelect"></Nav>
    <div @touchstart="touchStart" @touchend="touchEnd" style="height:100%;width: 100%;">
      <transition :name="transitionName">
        <router-view class="Router"></router-view>
      </transition>
    </div>

    <!-- <keep-alive  include="Follow,ProductsSelected,My">
        <router-view class="Router"></router-view>
    </keep-alive>-->
    <!-- </transition> -->
    <div class="mode" ref="mode">下拉刷新</div>
    <div class="flash_load" ref="flash_load"></div>
    <img src="../assets/images/flash_load.gif" alt class="flash_Img" ref="flash_Img" />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
export default {
  data() {
    return {
      transitionName: "",
      originPoint: 0,
      endPoint: 0,
      flash: false,
      loadShow: false,
      timeStamp: false,
      originTimeStamp: 0,
      choosed: "",
      startPosition: 0,
      endPosition: 0,
      nowRouteName: ""
    };
  },
  components: {
    Nav
  },
  watch: {
    $route(to, from) {
      this.nowRouteName = to.name;
      localStorage.setItem("nowRouteName", this.nowRouteName);
      this.$store.dispatch("chaneNowRouteIdASY", this.nowRouteName);

      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (from.meta.index == undefined) {
        this.transitionName = "aa";
      } else if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
  created() {
    // ,this.nowRouteName
    this.$store.dispatch("chaneNowRouteIdASY");
    this.nowRouteName = this.$store.state.nowRouteName;
    console.log(this.nowRouteName);
    this.transitionName = "aaa";
  },
  methods: {
    //子组件Nav触发此函数传来Val
    changeSelect(val) {
      this.choosed = val;
      switch (val) {
        case "my":
          this.$router.push({ name: "My" });
          break;
        case "delicacy":
          this.$router.push({ name: "Home" });
          break;
        case "follow":
          this.$router.push({ name: "Follow" });
          break;
        default:
          break;
      }
    },
    //以下两个函数记录触摸开始结束位置来实现手势切换
    touchStart(e) {
      this.startPosition = e.touches[0].clientX;
      console.log(this.startPosition);
    },
    touchEnd(e) {
      this.endPosition = e.changedTouches[0].clientX;
      let offsetPosition = this.startPosition - this.endPosition;
      let isEndWitinSwiper = e.target.parentElement.className.indexOf("swiper");
      console.log(isEndWitinSwiper);//判断滑动是否在swiper范围内
      switch (this.nowRouteName) {
        case "ProductsSelected":
          if (offsetPosition > 250 && isEndWitinSwiper!=0) {
            this.choosed = "my";
            this.$router.push({ name: "My" });
          } else if (offsetPosition < -250 && isEndWitinSwiper!=0) {
            this.choosed = "follow";
            this.$router.push({ name: "Follow" });
          } else {
            return;
          }
          break;
        case "My":
          if (offsetPosition < -150) {
            this.choosed = "delicacy";
            this.$router.push({ name: "ProductsSelected" });
          }
          break;
        case "Follow":
          if (offsetPosition > 150) {
            this.choosed = "delicacy";
            this.$router.replace({ name: "ProductsSelected" });
          }
          break;
        default:
          break;
      }
    },
    wrapstart(e) {
      if (
        this.$store.state.scrollTop == 0 &&
        this.$store.state.scrollTopFloow == 0
      ) {
        this.originTimeStamp = e.timeStamp;
        this.originPoint = e.touches[0].clientY;
        this.timeStamp = true;
      } else {
        this.timeStamp = false;
      }
    },
    wrapmove(e) {
      if (e.timeStamp - this.originTimeStamp < 10) {
        this.originPoint = e.touches[0].clientY;
        this.timeStamp = false;
        return false;
      }
      if (
        this.$store.state.scrollTop == 0 &&
        this.$store.state.scrollTopFloow == 0 &&
        this.timeStamp
      ) {
        this.endPoint = e.touches[0].clientY;
      }
      var difference = (this.endPoint - this.originPoint) / 3;
      if (difference > 0) {
        this.$refs.home.style.top = difference + "px";
        if (difference > 150) {
          this.$refs.home.style.top = 150 + "px";
          this.flash = true;
          this.$refs.mode.innerHTML = "释放刷新";
        }
      }
    },
    wrapend(e) {
      this.$refs.home.style.top = 0 + "px";
      this.originPoint = 0;
      this.difference = 0;
      this.endPoint = 0;

      if (this.flash) {
        var that = this;
        that.$refs.flash_load.style.display = "block";
        that.$refs.flash_Img.style.display = "block";
        setTimeout(function() {
          location.reload();
        }, 500);
      }
      this.flash = false;
    }
  },
  mounted() {}
};
</script>
<style lang="stylus">
.flash_load {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.1;
  z-index: 1;
  display: none;
}

.flash_Img {
  position: absolute;
  width: 60px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: none;
}

.mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 174px;
  background: #fff;
  z-index: 0;
  text-align: center;
  line-height: 100px;
  color: #666666;
}

#home {
  background: #ffffff;
  position: absolute;
  top: 0px;
  left: 0;
  overflow: hidden;
}

.Router {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: 0.5s all;
  top: 0px;
  left: 0px;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active, .slide-right-enter {
  opacity: 1;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}

* {
  padding: 0;
  margin: 0;
}

html, body {
  height: 100%;
  overflow: auto;
  margin: 0;
}

body.position-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

#app {
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  font-size: 32px;
  overflow-x: hidden;
}
</style>