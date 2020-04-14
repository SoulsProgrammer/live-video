<template>
	<div>
		<div class="body">
			<div class="select">
				<p class="selectedArea"></p>
				<div class="province" @scroll.passive="getProvinceScrollDebounce($event)" ref="proUl">
					<ul>
						<li v-for="(pro,index) in data" :key="index">{{pro.name}}</li>
					</ul>
				</div>
				<div class="city" v-if="data[proId].citys.length > 0" @scroll.passive="getCityScrollDebounce($event)" ref="cityUl">
					<ul>
						<li v-for="(city,index) in data[proId].citys" :key="index">{{city.name}}</li>
					</ul>
				</div>
				<div class="area" v-if="data[proId].citys.length > 0 && data[proId].citys[cityId].areas"  ref="areaUl" @scroll.passive="getAreaScrollDebounce($event)">
					<ul>
						<li v-for="(area,index) in data[proId].citys[cityId].areas" :key="index">{{area.name}}</li>
					</ul>
				</div>
			</div>
			<div class="btns">
				<div class="cancelBtn" @click="cancel">取消</div>
				<div class="confirm" @click="confirm">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	const delay = (function () {
	  let timer = 0
	  return function (callback, ms) {
	    clearTimeout(timer)
	    timer = setTimeout(callback, ms)
	  }
	})()
	
	const delay2 = (function () {
	  let timer = 0
	  return function (callback, ms) {
	    clearTimeout(timer)
	    timer = setTimeout(callback, ms)
	  }
	})()
	
	const delay3 = (function () {
	  let timer = 0
	  return function (callback, ms) {
	    clearTimeout(timer)
	    timer = setTimeout(callback, ms)
	  }
	})()
	import json from "@/api/json.js";
	// import { debounce } from "@/api/api.js"
	export default {
		name: 'myPicker',
		props: {
			msg:{
				type:String
			}
		},
		watch:{
			proId(){
				if(this.proStart){
					this.scrollToTop();
				}
			},
			cityId(){
				if(this.cityStart){
					this.scrollToTopArea();
				}
			}
		},
		created() {
			//console.log(json)
			this.data = json.json.data
		},
		data() {
			return {
				showWindow:false,
				data:[],
				proId:0,
				cityId:0,
				areaId:0,
				proStart:true,
				cityStart:true,
				areaStart:true
			}
		},
		mounted() {
			//console.log(this.data)
			this.initLoaction();
		},
		methods: {
			initLoaction(){
				//console.log(this.msg)
				var arr = this.msg.split(",");
				this.$refs.proUl.scrollTop = parseInt(arr[0]) * 80;
				this.$refs.cityUl.scrollTop = parseInt(arr[1]) * 80;
				this.$refs.areaUl.scrollTop = parseInt(arr[2]) * 80;
				
			},
			scrollToTop(){
				// //console.log(this.$refs.cityUl,this.$refs.cityUl.scrollTop,this.data[this.proId].citys)
				if(this.data[this.proId].citys){
					this.$refs.cityUl.scrollTop = 0
					this.cityId = 0
					if(this.data[this.proId].citys[this.cityId].areas){
						this.$refs.areaUl.scrollTop = 0
						this.areaId = 0
					}
				}
			},
			scrollToTopArea(){
				if(this.data[this.proId].citys.length > 0){
					if(this.data[this.proId].citys[this.cityId].areas){
						this.$refs.areaUl.scrollTop = 0
						this.areaId = 0
					}
				}
			},
			cancel(){
				//console.log("取消")
				this.$emit("cancelWindow",false)
			},
			confirm(){
				var that = this;
				//console.log("确认")
				this.$emit("cancelWindow",false)
				var addIds = that.proId+","+that.cityId +"," + that.areaId;
				var sendVal = that.data[that.proId].name + ' '+ that.data[that.proId].citys[that.cityId].name+ ' ' + that.data[that.proId].citys[that.cityId].areas[that.areaId].name;
				var res = {
					addIds:addIds,
					sendVal:sendVal
				}
				this.$emit("getAddressVal",res)
				
				
			},
			getProvinceScrollDebounce(e){
				var that = this;
				this.getProvinceScroll(e);
				delay(() => {
					//执行部分
					if(that.proStart){
						that.calculateAnimation();
					}
					
				}, 500)
			},
			calculateAnimation(){
				var that = this;
				that.proStart = false;
				var proLocation = (parseInt(this.proId)) * 80;
				this.$refs.proUl.scrollTop = proLocation
				
				//console.log(proLocation)
				setTimeout(function(){
					// //console.log("当前选中的地址",that.data[that.proId].name + that.data[that.proId].citys[that.cityId].name + that.data[that.proId].citys[that.cityId].areas[that.areaId].name)
					that.proStart = true
				},1000)
			},
			getProvinceScroll(event){
				// //console.log("start ")
				let scrollBottom = event.target.scrollTop
				let tempId;
				var shift = scrollBottom % 80
				if(shift >= 40){
					tempId = parseInt(scrollBottom / 80) + 1;
				}else{
					tempId = parseInt(scrollBottom / 80);
				}
				
				this.proId = tempId;
				        // event.target.scrollHeight -
				        // event.target.scrollTop -
				        // event.target.clientHeight;
				//console.log(scrollBottom,tempId,shift);
				this.start = true;
			},
			getCityScrollDebounce(e){
				var that = this;
				this.getCityScroll(e);
				delay2(() => {
					//执行部分
					if(that.proStart){
						that.calculateAnimation2();
					}
				}, 500)
			},
			calculateAnimation2(){
				var that = this;
				that.cityStart = false
				var cityLocation = (parseInt(this.cityId)) * 80;
				this.$refs.cityUl.scrollTop = cityLocation
				setTimeout(function(){
					// //console.log("当前选中的地址",that.data[that.proId].name + that.data[that.proId].citys[that.cityId].name + that.data[that.proId].citys[that.cityId].areas[that.areaId].name)
					that.cityStart = true
				},1002)
			},
			
			getCityScroll(event){
				let scrollBottom = event.target.scrollTop
				let tempId;
				var shift = scrollBottom % 80
				if(shift >= 40){
					tempId = parseInt(scrollBottom / 80) + 1;
				}else{
					tempId = parseInt(scrollBottom / 80);
				}
				this.cityId = tempId;
				//console.log(scrollBottom,tempId)
			},
			getAreaScrollDebounce(e){
				var that = this;
				this.getAreaScroll(e);
				delay3(() => {
					//执行部分
					if(that.proStart){
						that.calculateAnimation3();
					}
				}, 500)
			},
			
			calculateAnimation3(){
				var that = this;
				that.areaStart = false
				var areaLocation = (parseInt(this.areaId)) * 80;
				this.$refs.areaUl.scrollTop = areaLocation
				//console.log("当前选中的地址",that.data[that.proId].name + that.data[that.proId].citys[that.cityId].name + that.data[that.proId].citys[that.cityId].areas[that.areaId].name)
				that.areaStart = true
				// setTimeout(function(){
				// 	//console.log("当前选中的地址",that.data[that.proId].name + that.data[that.proId].citys[that.cityId].name + that.data[that.proId].citys[that.cityId].areas[that.areaId].name)
				// 	that.areaStart = true
				// },501)
			},
			getAreaScroll(event){
				let scrollBottom = event.target.scrollTop
				let tempId;
				var shift = scrollBottom % 80
				if(shift >= 40){
					tempId = parseInt(scrollBottom / 80) + 1;
				}else{
					tempId = parseInt(scrollBottom / 80);
				}
				this.areaId = tempId;
				// //console.log(scrollBottom,tempId,"结果：",this.proId,this.cityId,this.areaId)
				// if(this.data[this.proId].citys[this.cityId].areas){
				// 	//console.log(this.data[this.proId].name + this.data[this.proId].citys[this.cityId].name + this.data[this.proId].citys[this.cityId].areas[this.areaId].name);
				// }
				
			}
		}
	}
</script>

<style scoped lang="stylus">
	::-webkit-scrollbar
		display none
	.body
		position relative
		z-index 20
		padding 0 60px
		height 100%
		.select
			display flex
			margin 60px 0 20px 0
			overflow hidden
			height 400px
			position relative
			>div
				box-sizing border-box
				padding-top 160px
				padding-bottom 160px
				width 33.33%
				height 400px
				overflow-y scroll
				position relative
				z-index 5
				>ul
					
					li
						height 80px
						line-height 80px
						overflow hidden
						text-overflow ellipsis
			.selectedArea
				position absolute
				width 100%
				top 160px
				height 78px
				border-top 1px solid #999999
				border-bottom 1px solid #999999
				z-index 2
		.btns
			display flex
			align-items center
			justify-content center
			>div
				height 60px
				line-height 60px
				width 160px
				margin 0 20px
				&.cancelBtn
					background #fe2045
					color #fff
				&.confirm
					background #086BF4
					color #FFFFFF
	
</style>
