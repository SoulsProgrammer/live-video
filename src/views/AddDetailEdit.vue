<template>
	<div class="pages">
		<div class="head">
			<img src="../assets/images/backNoBg.png" alt="" @click="back">
			地址编辑
		</div>
		<div class="form">
			<div><span>联系人</span><input type="text"  @input="nameVal" v-model="name"></div>
			<div><span>手机号码</span><input :class="phoneStatus?'phoneStatus':''" type="number" v-model="phone" @input="phoneCheck"></div>
			<div><span>选择地区</span><input onfocus=this.blur() type="text" @click="addPick" v-model="address"></div>
			<div><span>详细地址</span><input @input="addDetailVal" type="text" v-model="detail"></div>
		</div>
		<div class="setDefaultCon" @click="setDefault">
			设为默认地址
			<div class="setDefault" :style="isDefault?'background:#e63027':''">
				<div>
				</div>
			</div>
		</div>
		<div class="editBtn" @click="editAdd">
			修改
		</div>
		<transition name="fade">
			<div class="blackBg" v-if="showWindow" @click="getOut"></div>
		</transition>
		
		<transition name="up">
			<div class="myPicker" v-if="showWindow">
				<myPicker :msg="addDetail.addressIds" @getAddressVal="getAddressVal" @cancelWindow="close"></myPicker>
			</div>
		</transition>
	</div>
</template>

<script>
	import myPicker from "@/components/myPicker.vue"
	export default {
	  data() {
	    return {
			addDetail:'',
			name:'',
			phone:'',
			address:'',
			detail:'',
			phoneStatus:false,
			isDefault:false,
			show: true,
			showWindow:false,
			global:this.$global,
			addressIds:''
	    }
	  },
	  components:{
		  myPicker	
	  },
	  methods: {
		  back(){
		  	this.$router.go(-1)
		  },
		  nameVal(){
		  			  this.name = this.name.replace(" ","");
		  },
		  addDetailVal(){
			  //console.log(this.detail)
		  			 this.detail = this.detail.replace(" ",""); 
		  },
		  phoneCheck(){
				var re = /^1\d{10}$/;
				let str = this.phone;
				if(this.phone.length>11){
					this.phone = this.phone.substring(0,11)
					str = this.phone;
				}
				if(re.test(str)){
						this.phoneStatus = false
				    }else {
						this.phoneStatus = true
				    }
		  },
		  setDefault(){
			  
			  if(!this.addDetail.defaultStatus){
				  var tf = this.isDefault;
				  this.isDefault = !tf
			  }
		  },
		  addPick(){
		  			  this.showWindow = true
		  },
		  getOut(){
		  	this.showWindow = false
		  },
		  close(e){
		  	if(!e){
		  		this.getOut()
		  	}
		  	//console.log("00000",e);
		  },
		  getAddressVal(e){
		  			  //console.log(e)
		  			  this.address = e.sendVal;
					  this.addressIds = e.addIds;
					  //console.log(this.addressIds)
		  },
		  editAdd(){
			  var that = this
			  this.$delayFun(()=>{
			       //console.log("自定义防止多次点击提交");
			  				   var params = {
									name: that.name,
									id:that.addDetail.id,
									phoneNumber : that.phone,
			  				   		defaultStatus : that.isDefault?'1':'0',
			  				   		province : that.address.split(' ')[0],
			  				   		city : that.address.split(' ')[1],
			  				   		region  : that.address.split(' ')[2],
			  				   		detailAddress  : that.detail,
			  						addressIds: that.addressIds,
									timestamp: Date.parse(new Date()) / 1000
			  				   };
							   //console.log(params)
			  				   this.$post(
			  				     that.global.globalUrl + "userAddress/updateUserAddress.do",
			  				     params
			  				   ).then(res => {
								   
								   this.$toastMessage({message: res.msg, time: 3000})
										//console.log(res);
										this.$router.go(-1)
			  				   });
			  				   
			  				   
			  				   
			  				   
			      },500)
		  }
		  
			  
	   
	  },
	  created(){
		  this.addDetail = this.$route.query.detail;
		  var addDetail = this.$route.query.detail;
		  //console.log(this.addDetail)
		  this.address = addDetail.province +' '+ addDetail.city+' '+ addDetail.region;
		  this.name = addDetail.name;
		  this.phone = addDetail.phoneNumber;
		  this.detail = addDetail.detailAddress;
		  this.isDefault = addDetail.defaultStatus;
		  this.addressIds = addDetail.addressIds;
		  
	  }
	};
</script>

<style lang="stylus" scoped>
	.pages
		background #f5f5f5
	.head
		text-align center
		position relative
		height 92px
		width 750px
		line-height 92px
		font-weight 500
		font-size 32px
		background #fe2045
		color: #fff
		img
			position absolute
			top 20px
			left 20px
	.form
		background #fff
		padding 0 30px
		div
			display flex
			padding 30px 0
		div~div
			border-top 1px solid #ddd
		span
			display inline-block
			width 4em
		.phoneStatus
			color red
			
	input,input:focus
		border none
		outline none
		margin-left 50px
		font-size 32px
		
	.setDefaultCon
		display flex
		align-items center
		justify-content space-between
		padding 30px 60px 30px 30px
		background #fff
		margin-top 60px
		
	.setDefault
		position relative
		height 40px
		width 40px
		background #999
		border-radius 50%
		margin-right 20px
		div
			position absolute
			top 11px
			left 11px
			width 18px
			height 18px
			border-radius 50%
			background #fff
	.editBtn
		width 200px
		color #fff
		margin 100px auto 0
		height 60px
		border-radius 10px
		line-height 60px
		font-size 32px
		background #fe2045
	.blackBg
		position fixed
		top 80px
		left 0
		right 0
		bottom 0
		z-index 9
		background rgba(0,0,0,0.5)
	.myPicker
		width 100%
		height 600px
		position absolute
		bottom 0
		z-index 99
		background #FFFFFF
		border-top-left-radius 40px
		border-top-right-radius 40px
	.address
		font-size 26px
	.top
		display flex
		justify-content space-between
		padding 0 20px
		background #999999
		height 80px
		line-height 80px
	
	.up-enter-active,.up-leave-active
		transition all .5s linear
	.up-enter,.up-leave-to
		transform translateY(100%)
		
	.fade-enter-active,.fade-leave-active
		transition all .5s linear
	.fade-enter,.fade-leave-to
		opacity: 0;
</style>
