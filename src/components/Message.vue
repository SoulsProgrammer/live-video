<template>
  <div class="Message_warp">{{Message_content}}</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      Message_content: ""
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    //console.log(this.$parent._data.HintMessage);
    this.Message_content = this.$parent._data.HintMessage;
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
@keyframes mymove {
  0% {
    top: 200px;
    opacity: 0.5;
  }

  15% {
    top: 0px;
    opacity: 0.5;
  }

  50% {
    top: 0px;
    opacity: 0.5;
  }

  75% {
    top: 0px;
    opacity: 0.5;
  }

  100% {
    top: 0px;
    opacity: 0;
  }
}

.Message_warp {
  position: absolute;
  top: 200px;
  width: 200px;
  height: 100px;
  font-size: 24px;
  background: #000;
  opacity: 1;
  color: #ffffff;
  text-align: center;
  line-height: 100px;
  border-radius: 20px;
  animation: mymove 3s forwards;
}
</style>