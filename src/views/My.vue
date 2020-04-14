<template>
	<div class="wrap">
		<div class="navList">
			<div class="navItem"  v-for="(item,index) in navList" :key="index" @click="goItem(index)">
				<img :class="{navItemImg:true,lastImg:item.name=='红包'}" :src="item.img" />
				<div class="navItemName">
					{{item.name}}
				</div>
				<div class="navItemIcon"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				navList:[{
					name:'我的订单',
					img: require('@/assets/images/my_icon_01.jpg')
				},{
					name:'购物车',
					img: require('@/assets/images/my_icon_02.jpg')
				},{
					name:'收藏夹',
					img: require('@/assets/images/my_icon_03.jpg')
				},{
					name:'收货地址',
					img: require('@/assets/images/my_icon_05.jpg')
				},{
					name:'退货',
					img: require('@/assets/images/return.png')
				},{
					name:'红包',
					img: require('@/assets/images/redPackIcon.png')
				}]
			}
		},
		methods:{
			goItem(val) {
				if(val == 0){
					this.$router.push({ path: "/order" })
				}else if(val == 1){
					this.$router.push({ path: "/cart" })
				}else if(val == 2){
					this.$router.push({ path: "/collection" })
				}else if(val == 3){
					this.$router.push({ path: "/address" })
				}else if(val == 4){
					this.$router.push({ path: "/return", query:{from:'My'} })
				}else if(val == 5){
					this.$router.push({ path: "/redPack" })
				}	
			}
		},
		mounted(){
			this.$store.dispatch("chaneSelectASY", "my");
		}
	}
</script>


<style scoped lang="stylus">

.wrap {
    width: 750px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    top: 0;
	background #ffffff
}
.navList 
	background #f8f8f8	
	//background red	
	margin-top 200px
	padding 8px 0
	.navItem 
		background #ffffff
		margin-bottom  8px
		height 100px
		line-height 100px
		padding 0 30px
		display flex
		align-items center
		font-size 32px
		.navItemImg 
			width 60px
			height 60px
			margin-right 26px
		.lastImg{
			width:52px;
			height:52px;
		}
		.navItemName 
			flex 1	
			text-align left  
		.navItemIcon 
			width 16px
			height 27px
			background-image url('~@/assets/images/my_arrow.jpg')
	.navItem:last-child
		margin-bottom  0px	


</style>
