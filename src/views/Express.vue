<template>
	<div class="expressBd">
		<div class="top">
			<div class="backBtn">
				<img src="../assets/images/backNoBg.png" alt="" @click="$router.go(-1)">
			</div>
			<p>物流详情</p>
		</div>
		<div class="expressBr"></div>
		<div class="expressHead">
			<div class="expressCompany">
				<img :src="logo"/>
				<div class="expressSub">
					<p>{{expresInfo.expName}}</p>
					<p>官方电话 <a :href="'tel:'+expresInfo.expPhone" style="text-decoration: none;    color: #555;">{{expresInfo.expPhone}}</a></p>
				</div>
			</div>
			<div class="expressNum">
				运单号 {{expresInfo.number}}
			</div>
		</div>
		
		<div class="expresMain" ref="wrap">
			<div class="space" style="height:30px;width:600px;"></div>
			<div class="address">
				<div class="addresss_head"></div>
				<div class="address_bg">收
				</div>
				<div class="address_content">
					[收货地址]{{expresInfo.receiverProvince}}{{expresInfo.receiverCity}}{{expresInfo.receiverRegion}}
					{{expresInfo.receiverDetailAddress}}
				</div>
			</div>
			<div class="expresList" v-for="(list,index) in expresList " :key="index" >
				<div class="expresItem">
					<div class="expresTime">
						<div class="date">{{list.time}}</div>
					</div>
					<div class="expresProgress">
						<img src="../assets/images/dian.png" alt="" class="dian">
						<div class="yunshuche_bg" v-if="index==0">
							<img src="../assets/images/yunshuche.png" alt="" class="yunshuche">
						</div>
					</div>
					<div class="expresContent">
						{{list.status}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Express',
		data(){
			return{
				expresInfo:{},
				expresList:[],
				logo:require('../assets/images/wuliu.png')
			}
		},
		props:{
			orderId:{
				type: Number
			}
		},
		mounted(){
			this.setHeight()
			this.getExpress()
		},
		methods:{
			setHeight() {
				this.clientHeight = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
				this.$refs.wrap.style.height = (this.clientHeight-380) + "px"; //输入框页面挤压问题解决
			},
			getExpress(){
				var params = {
					orderId:this.orderId
				}
				this.$post(
				  this.$global.globalUrl + "express/info.do",
				  params
				).then(res => {
				  	//console.log(res);
				  	if(res.code==0){
						// this.$toastMessage({message: res.msg, time: 3000})
						this.expresList = res.data.list
						this.expresInfo = res.data
						// this.logo = res.data.logo.replace('http','https')
						//console.log(this.expresList)
				  	}else {
						
					}
				});
			}
		},
		
	}
</script>


<style scoped lang="stylus">
.address{
	display flex
	flex-direction row
	position relative
	.addresss_head{
		height 130px;
		width 209px;
		border-right:1px solid #ababab
	}
	.address_bg{
		width: 45px;
		height: 45px;
		border-radius: 49px;
		background: #ababab;
		position: absolute;
		top: -4px;
		left: 187px;
		color #ffffff;
		font-size 20px;
		text-align center
		line-height 45px;
	}
	.address_content{
		font-size 24px;
		color #ababab
		text-align left
		padding-right: 20px;
		text-align justify
		margin-left: 38px;
    	width: 482px; 
	}
}
.expresMain{
	margin-top 372px;
	width 100%;
}
.yunshuche_bg{
    width: 45px;
    height: 45px;
    border-radius: 49px;
    background: #377ef6;
    position: absolute;
    top: -4px;
    left: 187px;
	.yunshuche{
		width 28px;
		position absolute
		top 0
		left 0
		right 0
		bottom 0 
		margin auto
	}
}
.expresList{
	display flex
	flex-direction column
	position relative
	.expresItem{
		display flex
		flex-direction row
		font-size 28px
	}
	.expresTime{
		display flex
		flex-direction :column
		text-align right 
		color #999999
		.date{
			width 177px;
		}
	}
	.expresProgress{
		margin-left: 32px;
    	border-left: 1px solid #ababab;
		height: 140px;
		.dian{
			width: 30px;
			margin-right: 30p;
			position: relative;
			left: -16px;
			}
	}
	.expresContent{
		font-size 24px;
		color #ababab
		text-align left
		padding-right: 20px;
		text-align justify
	}
}
.expressBd
	background #ffffff
	.top
		width 750px
		height 100px
		line-height 100px
		background #fe2045
		margin-bottom 20px
		overflow hidden
		color:#fff;
		.backBtn
			position absolute
			left 24px
			top 32px
			img
				display block
		p
			text-align center
	.expressBr {
		width 100%
		height 10px
		background #eeeeee
	}
	.expressHead 
		background #ffffff
		.expressNum {
			background #e3e9f1
			text-align left 
			font-size 28px
			padding 10px 30px 
		}
		.expressCompany
			display flex
			padding 30px
			align-items: center;
			img 
				width auto
				height 50px
			.expressSub 
				text-align left 
				margin-left 30px
				padding-top 5px
				p 
					padding-top 5px	
					font-size 28px
		

	.expresMain 
		width 750px
		overflow-x hidden
		overflow-y scroll
		position absolute
		top -8px
		left 0

	

</style>
