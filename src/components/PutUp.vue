<template>
    <div class="putUP_wrap" id="putUP_wrap">
    </div>
</template>
<script>
export default {
    props:["likeNum"],
    components: {},
    data() {
        return {    
            DomImg_warp:null,
            DomClear:false,
            setOut:null
        };
    },
    computed: {
        LikeNum(){
            return this.$parent.likeNum
        }
    },
    watch: {},
    methods: {
        animateNum(num){
            var attr=[]
            for(var i=0 ; i<num;i++){
                this.createAnimate(attr[num])
            }/*生产的动画数量*/
            
        },
        createAnimate(dom){
            var imgArr=["https://liveimg.appcoo.com/h5/images/gift1.png",
            "https://liveimg.appcoo.com/h5/images/gift2.png",
            "https://liveimg.appcoo.com/h5/images/gift3.png",
            "https://liveimg.appcoo.com/h5/images/gift4.png",
            "https://liveimg.appcoo.com/h5/images/gift5.png",
            "https://liveimg.appcoo.com/h5/images/gift6.png",
            "https://liveimg.appcoo.com/h5/images/gift7.png",
            "https://liveimg.appcoo.com/h5/images/gift8.png",
            "https://liveimg.appcoo.com/h5/images/gift9.png",
            "https://liveimg.appcoo.com/h5/images/gift10.png",
            "https://liveimg.appcoo.com/h5/images/gift11.png",
            "https://liveimg.appcoo.com/h5/images/gift12.png",
            "https://liveimg.appcoo.com/h5/images/gift13.png",
            "https://liveimg.appcoo.com/h5/images/gift14.png",
            "https://liveimg.appcoo.com/h5/images/gift15.png",
            "https://liveimg.appcoo.com/h5/images/gift16.png",
            "https://liveimg.appcoo.com/h5/images/gift17.png",
            "https://liveimg.appcoo.com/h5/images/gift18.png",
            "https://liveimg.appcoo.com/h5/images/gift19.png",
            "https://liveimg.appcoo.com/h5/images/gift20.png",
            "https://liveimg.appcoo.com/h5/images/gift21.png",
            "https://liveimg.appcoo.com/h5/images/gift22.png",
            "https://liveimg.appcoo.com/h5/images/gift23.png",
            "https://liveimg.appcoo.com/h5/images/gift24.png",
            "https://liveimg.appcoo.com/h5/images/gift25.png",
            "https://liveimg.appcoo.com/h5/images/gift26.png",
            "https://liveimg.appcoo.com/h5/images/gift27.png",
            "https://liveimg.appcoo.com/h5/images/gift28.png",
            "https://liveimg.appcoo.com/h5/images/gift29.png",
            "https://liveimg.appcoo.com/h5/images/gift30.png",
            "https://liveimg.appcoo.com/h5/images/gift31.png"
            ]
            var imgIndex=Math.floor(Math.random()*31)
            dom = document.createElement("img")
            dom.setAttribute("src",imgArr[imgIndex])
            this.DomImg_warp.appendChild(dom)
            this.setCss(dom)
            var setInter
            var LeftRange=Math.floor(Math.random()*220)-110 +"px"
            setInter = setInterval(function(){
                dom.style.bottom="350px"
                dom.style.left=LeftRange
                dom.style.opacity ="0"
                clearInterval(setInter)
            },30)
        }, /*随机创建一张img图片标签附加动画*/
        setCss(dom){
            var BottomRange=Math.floor(Math.random()*110)-50 +"px"
            dom.style.position="absolute"
            dom.style.margin="auto"
            dom.style.left="0"
            dom.style.right="0"
            dom.style.bottom=BottomRange
            dom.style.opacity ="1"
            dom.style.transition = "all 2s"; 
        },/*设置初始css*/
    },
    created() {},
    mounted() {
        this.DomImg_warp = document.getElementById('putUP_wrap')
    },
    watch:{
        LikeNum(newValue, oldValue) {
            var upNum = newValue-oldValue
            this.animateNum(upNum)/*生产一张动画*/
            this.DomClear = false
            clearTimeout(this.setOut)
            var that = this
            this.setOut = setTimeout(function(){
                that.DomClear = true
                 clearTimeout(that.setOut)
            },10000) /*判断两秒时间数值有没有改变，改变则为true*/
    　　},
        DomClear(newValue, oldValue){
            if(newValue==true){
                this.DomImg_warp.innerHTML = ""
            }
        }/*监听数值如果为true则清理所有动画dom元素*/
    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    }
</script>
<style lang='stylus' scoped>
.putUP_wrap
    width: 195px;
    height: 449px;
    overflow: hidden;
    position: relative;
</style>