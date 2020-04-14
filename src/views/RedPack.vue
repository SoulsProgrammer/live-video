<template>
  <div class="redPack_warp">
    <div class="head">
      <img src="../assets/images/backNoBg.png" alt class="backBtn" @click.stop="goblack" />
      <div class="head_text">红包</div>
    </div>
    <div class="main_content">
      <div class="noData" v-if="redPackAll.length<=0">
        <img src="@/assets/images/noRedPack.png" class="no-data-pic" />
        <div class="desc">您暂时还没有红包哦</div>
        <div class="desc-sm">逛一逛就能领到红包哦</div>
      </div>
      <div class="scrol_warp" v-if="redPackAll.length>0">
        <div class="box" v-for="(item,index) in redPackAll" :key="index">
          <div class="left">
            ￥
            <div class="price">{{item.packetNum}}</div>
          </div>
          <div class="right">
            <div class="title">惠生活购物红包</div>
            <ul class="ul">
              <li>领取时间：{{item.startTime}}</li>
              <li>有效期至：{{item.endTime}}</li>
            </ul>
            <div class="date" v-if="item.status==2">已过期</div>
            <div class="date" v-if="item.status==1">已使用</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      redPackAll: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    goblack() {
      this.$router.push({
        path: "/my"
      });
    },
    getRedPackAll() {
      var data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$post(this.$global.globalUrl + "snatch/list.do", data).then(res => {
        // //console.log(res);
        this.redPackAll = res.data;
        // this.orderList = [...this.orderList, ...res.data]
      });
    }
  },
  created() {
    this.getRedPackAll();
  },
  mounted() {},
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
.redPack_warp {
  width: 750px;
  height: 100%;
  background: #f5f5f5;
  .head {
    position: relative;
    width: 750px;
    height: 100px;
    background: #fe2045;
    z-index: 1000;
    color: #fff;

    .backBtn {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 24px;
      margin: auto;
    }

    .head_text {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 200px;
      height: 50px;
    }
  }

  .main_content {
    padding: 30px;
    width: 690px;
    background: #f5f5f5;

    .noData {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -100%);

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
        margin-top: 25px;
      }
    }

    .scrol_warp {
      background: #f5f5f5;

      .box {
        width: 690px;
        border-radius: 5px;
        background: #ffffff;
        display: flex;
        flex-direction: row;
        margin: 30px 0px;
        position: relative;

        .left {
          align-items: center;
          display: flex;
          flex-direction: row;
          color: #f94359;
          font-weight: bold;
          width: 158px;
          justify-content: center;

          .price {
            font-size: 50px;
          }
        }

        .right {
          width: 554px;
          display: flex;
          flex-direction: column;
          text-align: left;
          margin: 30px 0;

          .title {
            font-weight: bold;
          }

          .ul {
            margin-left: 26px;

            >li {
              font-size: 24px;
              color: #b5b5b5;
            }
          }

          .date {
            position: absolute;
            top: 0;
            right: 0;
            transform: rotate(-30deg);
          }
        }
      }
    }
  }
}
</style>