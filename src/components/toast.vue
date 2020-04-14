<template>
  <div class="toastMessageBox" v-show="show"><div class="msg">{{message}}</div></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'toastMessage',
  data () {
    return {
      message: '',
      show: false
    }
  }
}
</script>

<style  scoped lang="stylus">
.toastMessageBox{
  position: fixed;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  height: 200px;
  padding:0 25px;
  font-size: 30px;
  display: table; 
  border-radius: 8px;
  text-align: center;
  z-index: 99999;
}
.msg{
	        display: table-cell;
	        vertical-align:middle;
	        text-align:center;
}


</style>

