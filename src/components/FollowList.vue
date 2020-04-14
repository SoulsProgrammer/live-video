<template>
		<div  class="followCon" @click="goDetail(item.playStatus)">
			<img src="../assets/images/jb.png" style="position:absolute;left: 285px;top: 1px;width:58px;" alt="">
			<div class="imgCon">
				<img :src="item.coverImg" alt="">
			</div>
			<div class="followInfo">
				<img :src="item.headImg" alt="">
				<span class="followName">{{item.nickname}}</span>
			</div>
			<div class="followStatus" v-if="item.playStatus==1">
			<img src="../assets/images/zhibo.png" alt="">
			{{item.watchTimes}}观看</div>
			<div class="followStatus" v-if="item.playStatus==2">
				<img src="../assets/images/indexPlay.png" alt="" style="webkit-filter: blur(-1px);">
				{{item.watchTimes}}观看</div>
		</div>


</template>

<script>
	export default {
		components: {},
		props: {
			item:Object
		},
		data() {
			return {
				chuDi:false,
				msg:{
					videoShow:true,
					anchorId:0,
					playStatus:1,
					liveRoomId:1
				}
			};
		},
		watch: {},
		computed: {},
		methods: {
			goDetail(num1){
                this.$router.push({path:'/followDetail',query:{anchorId:this.item.id,playStatus:this.item.playStatus,RoomId:this.item.liveRoomId}})
			},

			setWatchTimes(count){
				var watchTimes = count;
				if(count >= 100000){
					var num = count / 10000;
					watchTimes = num.toFixed(2) + "万";
				}
				return watchTimes;
			},
			setLikeNum(count){
				var likeNum = count;
				if(count >= 100000){
					var num = count / 10000;
					likeNum = num.toFixed(2) + "万";
				}
				return likeNum;
			},
		},
		created() {
		},
		mounted() {
			this.msg.id = this.item.id
			this.item.watchTimes =  this.setWatchTimes(this.item.watchTimes);
			this.item.praiseCount = this.setLikeNum(this.item.praiseCount);
		},
		beforeDestroy: function() {

		},
	};
</script>

<style lang="stylus" scoped>
.followCon
	margin-top 20px
	width 343px
	position relative
	font-size 28px
	height 410px;
.imgCon
	width 100%
.imgCon img
	width 100%
	height 343px
	border-radius 10px
.followInfo
	margin-top 10px
	display flex
	align-items center
.followInfo img
	width 50px
	height 50px;
	border-radius 50%
	margin 0 10px
.followMore
	position absolute
	right 5px
.followStatus
	position absolute
	left 10px
	top 10px
	height 30px
	background rgba(0,0,0,0.5)
	border-radius 20px
	color #fff
	line-height 30px
	font-size 16px
	padding-right 10px
	display flex
	align-items center
	justify-content space-between
.followStatus img
	height 30px
	margin-right 10px
.followName
	overflow hidden
	white-space nowrap
	text-overflow ellipsis
	text-align left
	width 8em
.proDetail {
	text-align: center;
	margin-top: 10px;

	.baobei {
		font-size: 24px;
		font-weight: 500;
		line-height: 50px;
		height: 50px;
		width: 100%;
		border-bottom: 0px solid #d6d6d6;
		display: inline-block;
		color: #929292;
	}
}

</style>
