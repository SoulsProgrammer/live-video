<template>
    <div class="wrapper">
        <div class="img_warp" @click="liveVideo">
            <img src="../assets/images/jb.png" style="position:absolute;left: 280px;top: 0px;" alt="">
            <img :src="list.coverImg" alt="" class="Product_img">
            <img src="../assets/images/indexPlay.png" alt="" class="liveNum" v-if="list.playStatus==2">
            <div class="nowVIdeo" v-if="list.playStatus==1"></div>
            <img src="../assets/images/livePlayBg.png" alt="" class="nowVideoImg" v-if="list.playStatus==1">
            <img src="../assets/images/livePlay.gif" alt="" class="livePlayGif" v-if="list.playStatus==1">
            <div class="liveNum_text">{{list.watchTimes}}观看</div>
            <img src="../assets/images/likeNum.png" alt="" style="position: absolute;
    bottom: 12px;
    right: 18px;">
            <div class="likeNum_text">
                <span>{{list.praiseCount}}</span>
            </div>
        </div>
        <div class="detail">
            <div class="block_left">
                <div class="name">{{list.roomTitle}}</div>
                <div class="head">
                    <img :src="list.headImg" alt="" class="head_img">
                    <div class="head_name">{{list.nickname}}</div>
                </div>
            </div>
            <div class="block_right" style="padding:0;margin:0px;width: 94px;
    height: 113px; position:relative;border-radius:10px;overflow:hidden">
                <img :src="list.goods.goodsImage" alt="" style="width:94px;height:113px;"
                     v-if="list.goods.goodsImage!=''">
                <span class="price" v-if="list.goods.goodsPrice!=0">￥{{list.goods.goodsPrice}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: ["list"],
        data() {
            return {
                num: 0,
                videoData: {
                    videoShow: true,
                    anchorId: 0,
                    playStatus: 1,
                    liveRoomId: 1
                }

            };
        },
        watch: {},
        computed: {
            unit: function () {
                return this.num / 1000
            }
        },
        methods: {
            setWatchTimes(count) {
                var watchTimes = count;
                if (count >= 100000) {
                    var num = count / 10000;
                    watchTimes = num.toFixed(2) + "万";
                }
                return watchTimes;
            },
            setLikeNum(count) {
                var likeNum = count;
                if (count >= 100000) {
                    var num = count / 10000;
                    likeNum = num.toFixed(2) + "万";
                }
                return likeNum;
            },
            liveVideo() {
                this.videoData.anchorId = this.list.id
                this.videoData.playStatus = this.list.playStatus
                this.videoData.liveRoomId = this.list.liveRoomId
                this.$emit('liveVideoa', this.videoData)
            }
        },
        created() {
        },
        mounted() {
            this.list.watchTimes = this.setWatchTimes(this.list.watchTimes);
            this.list.praiseCount = this.setLikeNum(this.list.praiseCount);
            console.log(this.list)
        }
    };
</script>
<style lang="stylus" scoped>
    .price {
        position absolute
        bottom 0
        left 0
        color #000
        width 94px;
        font-size 16px;
        background #F7F7F7
        height: 27px;
        line-height 27px;
    }

    .wrapper
        margin-top 20px
        width 343px
        display flex
        flex-direction column
        overflow: hidden;

        .img_warp {
            height: 345px;
            width: 345PX;
            background #ffffff
            position relative
            border-top-right-radius: 20px
            border-top-left-radius: 20px

            .Product_img {
                height 345px;
                width 345PX;
                border-top-right-radius: 20px
                border-top-left-radius: 20px
            }

            .nowVIdeo {
                height 30px;
                width 128px;
                /*background #000*/
                opacity 0.5
                position absolute
                top 15px
                left 7px
                border-radius 18px
            }

            .nowVideoImg {
                position absolute
                top 14px
                left 7px
                z-index: 10
            }

            .livePlayGif {
                position absolute
                top: 20px;
                left: 16px;
                z-index: 10
            }

            .liveNum {
                position absolute
                top 15px
                left 7px
                z-index 10
            }

            .liveNum_text {
                background: rgba(0, 0, 0, 0.4);
                position: absolute;
                top: 15px;
                left: 7px;
                font-size: 15px;
                text-align: center;
                color: #fff;
                line-height: 32px;
                padding-left: 18px;
                border-radius 30px;
                padding-left: 38px;
                padding-right: 15px;

            }

            #likeNum {
                width: 400px;
                height: 400px;
                display: block;
            }

            .likeNum_text {
                width: 110px;
                height: 31px;
                font-size: 16px;
                text-align: center;
                position: absolute;
                bottom: 28px;
                right: -22px;
                line-height: 31px;
                color: #fff;

                span {
                    height: 31px;
                    margin: auto;
                    background: #ec4163;
                    display: inline;
                    border-radius: 10px;
                    padding-left: 8px;
                    padding-right: 8px;
                    line-height: 31px;
                }
            }
        }

        .detail
            padding 10px
            width 323px;
            border-bottom-right-radius: 20px
            border-bottom-left-radius: 20px
            background-color #ffffff
            display flex
            flex-direction row
            justify-content space-between

            .block_left
                display flex
                flex-direction column
                justify-content space-between

                .name
                    font-size 28px
                    color #262626
                    width 229px
                    text-align left
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow hidden

                .head
                    display flex
                    flex-direction row
                    margin-bottom: 3px;

                    .head_img {
                        width 51px
                        height 51px
                        border-radius: 51px
                    }

                    .head_name
                        font-size 24px
                        color #666
                        margin-top 7px
                        margin-left 20px
                        width 145px
                        text-align left
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow hidden
</style>