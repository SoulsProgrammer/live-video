<template>
  <div class="shop_wrapper">
      <div class="iframe">
          <iframe src="https://www.baidu.com/" frameborder="0" style="width:750px;height:1000px"></iframe>
      </div>
      <div class="videoMin_warp">
          <live-Video-min v-if="!minVideoHide" @minVideoHide="minVideoHideEvent" ></live-Video-min>
      </div>
  </div>
</template>

<script>
import LiveVideoMin from '@/components/LiveVideoMin.vue'
export default {
  components: {
      LiveVideoMin
  },
  props: {},
  data() {
    return {
        minVideoHide:false,
    };
  },
  watch: {},
  computed: {},
  methods: {
      minVideoHideEvent(){
      this.minVideoHide=true
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
body,html{
      widht:100%;
      height:100%;
  }
  body.position-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.shop_wrapper
    width 100%;
    height 100%
    display flex
    flex-direction column
    background #f8f8f8
    .iframe
        position absolute
        top 0
        left 0
        z-index 1
    .videoMin_warp
        position absolute
        top 0
        left 0
        z-index 200
</style>