<template>
    <div class="RedPacket_warp">
         <img src="../assets/images/red_packet.png" alt="" class="redPacket" @click.stop="getRedPacket">
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        getRedPacket(){
            this.$emit("getRedPacker");
        }
    },
    created() {},
    mounted() {
        //console.log(this.redID)
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
.redPacket{
    width 280px;
}
</style>