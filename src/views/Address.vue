<template>
	<div class="pages">
		<div class="head">
			<img src="../assets/images/backNoBg.png" alt="" @click="back">
			地址管理
		</div>
		<div class="addlistCon">
			<div v-for="(item,index) in addlist" :key="index">
				<addlist @getAddList="getAddList" :item="item"></addlist>
			</div>
		</div>
		<div class="addBtn" @click="toAddDetailAdd">
			+新增地址
		</div>
		<div class="noData" v-if="addlist.length<=0">
			<img src="@/assets/images/noAdress.png" alt="" class="no-data-pic">
			<div class="desc">收货地址暂时没有哦</div>
			<div class="desc-sm">写了地址才能拿到宝贝哦</div>
		</div>
	</div>
	
</template>

<script>
	import addlist from '@/components/addList.vue'
	//import global from "../api/common.js";
	export default {
	  data() {
	    return {
			addlist:[]
	    };
	  },
	  components:{
		  addlist
	  },
	  methods: {
		  back(){
		  	this.$router.go(-1)
		  },
		  toAddDetailAdd(){
			  this.$router.push({ path: "/addDetailAdd" });
		  },
		  getAddList(){
			  var that = this
			  this.$delayFun(()=>{
			 var params = {
				pageNum :'1',
				pageSize:'100',
			   timestamp: Date.parse(new Date()) / 1000
			 };
			 this.$post(
			   this.$global.globalUrl + "userAddress/getUserAddrList.do",
			   params
			 ).then(res => {
				 //console.log(res)
				 if(res.code != 0){
					 this.$toastMessage({message: res.msg, time: 3000})
				 }
			   that.addlist = res.data
			 }); 
			},500)
		  }
		  
	   
	  },
	 created() {
		 this.getAddList()
	 },
	};
</script>

<style lang="stylus" scoped>
.noData
	position absolute
	left 50%
	top 50%
	transform translate(-50%,-100%)
	.no-data-pic
		width: 150px
		margin: 0 auto		
	.desc
		margin-top: 40px		
	.desc-sm
		color: #929292
		font-size: 24px
		margin-top: 25px	  
.pages
	background #f5f5f5
	height auto
	min-height calc(100%)
.addlistCon
	padding-bottom 200px
.head
	text-align center
	position relative
	height 92px
	width 750px
	line-height 92px
	font-weight 500
	font-size 32px
	background #fe2045
	color: #fff;
	img
		position absolute
		top 25px
		left 20px
.addBtn
	width 200px
	color #fff
	position fixed
	bottom 100px
	left 275px
	height 60px
	border-radius 10px
	line-height 60px
	font-size 30px
	background: #fe2045
			
	
</style>
