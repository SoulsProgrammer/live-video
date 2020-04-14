<template>
  <div>
    <div class="wrap">
      <div class="noData" v-if="followList.length<=0" @touchstart="touchStart"  @touchend="touchEnd">
        <img src="@/assets/images/no-follow.png" alt="" class="no-data-pic">
        <div class="desc">您还没有关注的人</div>
        <div class="desc-sm">关注主播可以订阅主播的最新动态</div>
      </div>
      <div class="follow" v-if="!videoShow" ref="follow" @scroll="menu">
        <div class="scroll_wrap">
          <div v-for="(item,index) in followList" :key="index" class="listWrap">
            <FollowList @liveVideoa="getLiveVideo" :item="item"></FollowList>
          </div>

          <img src="../assets/images/flash_load.gif" alt="" class="loadGif" ref="loadGif" v-if="loadGif">
          <div class="chuDi" style="height:85px; display:flex;justify-content: center;width:100%;align-items: center" v-if="followList.length>0">
            <div class="proDetail">
            <span class="baobei">
              <span style="color:#d6d6d6">————</span> 已经到底了
              <span style="color:#d6d6d6">————</span>
            </span>
            </div>
            <!-- <img src="../assets/images/product_img1.jpg" alt=""> -->
          </div>
          <!--<div class="space"></div>-->
        </div>
       
      </div>

    
    </div>

  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import LiveVideo from '@/components/LiveVideo.vue'
import FollowList from "@/components/FollowList.vue";
import global from "../api/common.js";
export default {
  name: "Follow",
  data() {
    return {
      loadGif: false,
      chuDi: true,
      globalUrl: global.globalUrl,
      start: 0,
      end: 7,
      maxLimit: "",
      scroll: "",
      followList: [],
      videoShow: false,
      anchorId:Number,
      playStatus:Number,
      RoomId:Number,
      PlayProgres:Number,
      clientHeight:0,
      transitionName:"videoFade",
      startPosition:0,
      endPosition: 0
    };
  },
  components: {
    Product,
    FollowList,
    LiveVideo,

  },
  watch: {
    srcoll: function(e) {}
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {

  },
  methods: {
    setHeight() {
      this.clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
      this.$refs.follow.style.height = this.clientHeight + "px"; //输入框页面挤压问题解决
    },
    getLiveVideo(msg) {
      //console.log(msg)
      this.videoShow = msg.videoShow;
      this.anchorId = msg.anchorId;
      this.playStatus = msg.playStatus
      this.RoomId = msg.liveRoomId
    },
   touchStart(e){
    //  this.startPosition = e.touches[0].clientX
   },
    touchEnd(e){
    //   this.endPosition = e.changedTouches[0].clientX
    //   if(this.startPosition-this.endPosition>=150){
    //     this.$router.replace({
    //       name:'ProductsSelected'
    //     })
       
    //   }
    //  console.log(this.startPosition,this.endPosition)
   },
    hideLiveVideo(msg) {
      this.videoShow = msg;
      this.minVideoHide = msg;
    },
    menu(e) {
      this.$store.dispatch("chaneScrollTopFloowASY", e.srcElement.scrollTop);
      e = e || window.event;
      if((Math.ceil(e.srcElement.scrollTop+e.srcElement.clientHeight)==e.srcElement.scrollHeight)){
        if(this.maxLimit<this.start){
          return
        }else{
          this.getFollowList(this.start,this.end)
        }
      }
    },
    getFollowList(start,end) {
      this.loadGif = true;
      var that = this
      var params = {
        start: start,
        end: end,
      };
      this.$post(
        this.globalUrl + "/live/follower/list.do",
        params
      ).then(res => {
          if(res.code=="0"){
            //console.log(res)
            this.loadGif = false;
              that.maxLimit = res.count
              var arr = res.data;
              for(var i = 0;i<arr.length;i++){
                that.followList.push(arr[i])
              }
              that.start+=8
              that.end+=8
          }
         //console.log(that.followList)
      });
    },
    RouteQuery(){
      this.anchorId = this.$route.query.anchorId
      this.RoomId = this.$route.query.RoomId
      this.playStatus = this.$route.query.playStatus
      this.videoShow = this.$route.query.videoShow;
      this.PlayProgres = this.$route.query.PlayProgres
      if(this.$route.query.transitionName){
        this.transitionName="false"
      } //视频组件动画清除
      var that = this
      setTimeout(function(){
        that.transitionName="videoFade"
        // that.$router.push({})
      },1000)  //视频组件过渡动画再次生效，清除url参数
    }//参数处理
  },
  mounted() {
    this.RouteQuery()
    this.setHeight()
    //console.log(this.$route.query.videoShow);
    this.videoShow = this.$route.query.videoShow;
    window.addEventListener("scroll", this.menu, true);
    this.$store.dispatch('chaneSelectASY','follow')
    this.$store.dispatch("chaneColseVideoASY", false);
  },
  created() {
    this.getFollowList(this.start,this.end); //获取关注列表
  },
  beforeDestroy() {
    this.$store.dispatch("chaneScrollTopFloowASY", 0)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.noData{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-100%);
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
.video_wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  z-index: 100;
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
  overflow: hidden;
  background :#ffffff;
}
.scroll_wrap{
  width: 705px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 208px;
  
}
.follow {
  overflow-y scroll;
}
.space{
  width 750px;
  height 100px;

}
    .noNotice div:first-child{
      margin-top:30px;
    }
.noNotice div:first-child img{
      width:132px;
  }
  .noNotice div:nth-child(2){
    marign-top: 15px;
  }
  .noNotice  div:last-child{
    margin-top:15px;
    color: rgb(201,201,201);
  }

.loadGif{
  width: 45px;
  height: 45px;
  position: absolute;
  top: 50%;
  left: 50%;
}
    .baobei{
        color: #929292;
        font-size:24px;
    }
</style>
