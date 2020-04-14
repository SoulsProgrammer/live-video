<template>
  <div id="app">
    <transition :name="transitionName" v-if="true">
      <keep-alive include="Order">
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>
    <!-- <transition :name="transitionName" v-if="true">
        <router-view class="Router"></router-view>
    </transition>-->
  </div>
</template>
<script>
export default {
  date() {
    return {
      transitionName: "" // 默认动态路由变化为slide-right
    };
  },
  watch: {
    $route(to, from) {
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
    localStorage.setItem("nowRouteName", "ProductsSelected");
    this.transitionName = "aaa";
  },
  mounted() {}
};
</script>  
<style lang="stylus">
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

.Router {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.slide-left-enter, .slide-right-leave-active {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active, .slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}

.home {
  overflow-x: hidden;
  background: #f8f8f8;
}

* {
  padding: 0;
  margin: 0;
  -webkit-user-select: none;   
  -moz-user-select: none;    
  -ms-user-select: none;    
  user-select: none;
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

.twoEllipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* autoprefixer off */
  -webkit-box-orient: vertical;
  /* autoprefixer on */
  -webkit-line-clamp: 2;
}
</style>