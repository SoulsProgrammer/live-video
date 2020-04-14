<template>
    <div class="reward_box">
      <div class="reward_cont">
        <div class="gift" v-for="(item,i) in liwu">
          <img src="../assets/images/luwu.jpg" alt="" class="liwu">
          <span class="liwu_name">虎粮</span>
          <span class="liwu_price">5淘金币</span>
        </div>
      </div>
      <div class="my_reward">
        <div class="txt1">我的淘金币</div>
        <span class="txt2">0</span>
        <div class="reward_btn">打赏</div>
      </div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            liwu:[{},{},{},{},{},{},{},{}],
            rewardBox:false
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    }
</script>
<style lang='stylus' scoped>
.reward_box
    width 750px;
    background #ffffff
    position absolute
    bottom 0;
    left 0;
    display flex
    justify-content space-between
    flex-direction column
    .reward_cont
        display flex
        flex-direction row
        flex-wrap wrap
        .gift
            width 187.5px
            height 202px
            display flex
            flex-direction column
            position relative
        .liwu
            width 80px
            position absolute
            left 0;
            right 0;
            top 20px
            margin auto
        .liwu_name
            font-size 24px
            color #252525;
            margin-top 105px
        .liwu_price
            font-size 24px
            color #a7a7a7;
            margin-top 7px
    .my_reward
        display flex
        flex-direction row
        width 750px;
        height 81px
        line-height 81px
        border-top 1px solid #cccccc
        .txt1
            font-size 24px
            margin-left 20px
        .txt2
            font-size 24px
            color #dd3f60
            margin-left 15px
        .reward_btn
            margin-left: 453px;
            width: 105px;
            height: 55px;
            line-height: 55px;
            border: 1px solid #dd3f60;
            border-radius: 10px;
            margin-right: 20px;
            margin-top: 14px;
            color: #dd3f60;
</style>