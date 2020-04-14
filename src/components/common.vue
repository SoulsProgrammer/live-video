<template>
	<div></div>
</template>

<script>
		import md5 from 'js-md5'
		const globalUrl = 'http://192.168.0.194:8081/';
		var userId = '20'
	    function setSign(obj) {
			var str = '';
			var signKey = 'duowan!QAZ2wsx';
			var newKey = Object.keys(obj).sort();
			var newObj = {};
			for (var i = 0; i < newKey.length; i++) {
					newObj[newKey[i]] = obj[newKey[i]];
			    };
			for(var key in newObj){
					str += ((key + '=' + newObj[key])+'&')
				};
			str = str + 'key=' + signKey;
			return md5(str).toUpperCase();
	    }
		export default {
		        setSign,
				globalUrl,
				userId
		    }
</script>

<style>
</style>
