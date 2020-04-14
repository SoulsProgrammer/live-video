<template>
    <div>
        <div class="top">
            <div class="backBtn">
                <img src="../assets/images/backNoBg.png" alt @click="goBack"/>
            </div>
            <p>支付结果</p>
        </div>
        <div class="welcome">
            <img src="@/assets/images/noOrder.png" alt class="check-img"/>
            <div class="wdesc-sm" v-text="paymentTip"></div>
        </div>
        <div class="btn-group">
            <div class="check-btn" @click="finishPay">返回首页</div>
            <div class="wrong-btn" @click="getWrong">查看订单</div>
        </div>
        <div class="cover" v-if="showLoading">
            <img src="@/assets/images/loadHttp.gif" alt class="spin-icon"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paymentTip",
        props: {
            orderSn: {
                type: String
            }
        },
        data() {
            return {
                isChecking: false,
                paymentRes: false,
                state: 0,
                showLoading: false,
                checkOrderStatusTimer: '',
                paymentTip: "支付中...",
                checkTimes:0,
                orderId: 0,
                orderSnss:this.$route.query.orderSnss
            };
        },
        mounted() {
            this.showLoading = true
            console.log(this.orderSnss)
            this.checkOrderStatusTimer = setInterval(this.getPaymentRes, 1000);
        },
        beforeDestroy() {
            clearInterval(this.checkOrderStatusTimer);
        },

        methods: {
            finishPay() {
                this.$router.replace({
                    name: "ProductsSelected"
                });
            },
            getWrong() {
             this.$router.replace({
                    name:'OrderDetail',
                     query: { sid: this.orderId, state: this.state }
                });
            },
            getPaymentRes() {
                this.paymentTip = "正在查询支付结果，请稍候...";
                 if(this.checkTimes == 3) {
                    this.showLoading = false
                }
                
                this.$post(this.$global.globalUrl + "/order/checkOrder.do", {
                    orderSns: this.orderSn||this.orderSnss
                }).then(res => {
                    this.showLoading = false
                    if (res.code == "0") {
                        this.orderId = res.data.orderInfo.id
                        this.state = res.data.orderInfo.status
                        if (res.data.orderInfo.payStatus == "01") {
                            this.paymentTip = "支付成功";
                            clearInterval(this.checkOrderStatusTimer);
                        } else if (res.data.orderInfo.payStatus == "02") {
                            this.paymentTip = "正在查询支付结果，请稍候...";
                        }
                    } else {
                        this.paymentTip = "哦，出错了，请联系客服处理...";
                        clearInterval(this.checkOrderStatusTimer);
                    }
                });
                this.checkTimes++;
                if(this.checkTimes > 3){
                    clearInterval(this.checkOrderStatusTimer);
                }
            },
            goBack() {
                //console.log("返回按钮");
                this.$router.replace({
                    name:'OrderDetail',
                     query: { sid: this.orderId, state: this.state }
                });
            },
        }
    };
</script>

<style scoped lang="stylus">
    .welcome {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -100%);
    }

    .check-img {
        width: 45%;
    }

    .btn-group {
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 100%;
        bottom: 25%;

        .check-btn {
            background: #1E90FF;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 20px;
            margin-left: 120px;
        }

        .wrong-btn {
            background: #fe2045;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 20px;
            margin-right: 120px;
        }
    }

    .cover {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
    }

    .spin-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60px;
        transform: translate(-50%, -50%);
    }

    .top {
        height: 100px;
        line-height: 100px;
        background: #fe2045;
        overflow: hidden;
        color: #fff;

        .backBtn {
            position: fixed;
            left: 24px;
            top: 8px;
        }

        p {
            text-align: center;
        }
    }

    .wdesc-sm {
        font-size: 28px;
        margin-top: 10px;
        color: #6e6e6e;
        width: 360px;
    }
</style>>
