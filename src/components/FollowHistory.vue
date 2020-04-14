<template>
	<div class="videoHistory">
		<div class="title">
			<div class="info">
				<div>{{item.roomTitle}}</div>
				<div class="nums"><img src="../assets/images/video1.png" alt=""> {{item.watchTimes}}观看 | {{item.goodsCount}}宝贝</div>
			</div>
			<div class="time">
				{{item.dates}}
			</div>
		</div>
		<div class="video" @click="liveVideo">
			<img :src="item.roomBigImg" alt="">
			<div class="videoPlay">
				<img src="../assets/images/videoPlay.png" alt="">
			</div>
		</div>
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
			liveVideo(){
				this.msg.anchorId = this.item.userId
				this.msg.playStatus=this.item.status
				this.msg.liveRoomId = this.item.id
				this.$emit('liveVideoa',this.msg)
			}
		},
		created() {},
		mounted() {
			this.msg.id = this.item.userId
			var dates = this.item.advanceNoticeStartTime.split(" ")[0].split("-")[1]
			+"/"+this.item.advanceNoticeStartTime.split(" ")[0].split("-")[2] /*时间处理 */
			this.item.dates = dates
			//console.log(this.item)
			this.$forceUpdate()
		},
		beforeDestroy: function() {},
	};
</script>

<style  scoped lang="stylus">
	.videoHistory
		background #fff
		padding 30px
		border-top 1px solid #ddd
	
	.videoHistory .title .info>div
		display flex
		align-items center
		font-size 32px
		font-weight 500
		margin 20px 0
	.videoHistory .title .info .nums img
		width 80px
		margin-right 20px
	.videoHistory .title .info .nums,.videoHistory .title .time
		font-size 28px
		color #c7c7c7
	.videoHistory .title
		display flex
		justify-content space-between
		align-items center
		text-align left
	.video
		position relative
		text-align left
		overflow hidden
		width 450px
		height 450px
		border-radius 20px
	.video>img
		width 450px
		height 450px
		object-fit cover
	.videoPlay
		position absolute
		width 100%
		height 100%
		top 0
		left 0
		background rgba(0,0,0,0.5)
	.videoPlay img
		width 100px
		height 100px
		margin 175px 175px
	
	
</style>
