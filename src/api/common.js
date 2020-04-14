import md5 from 'js-md5'


// const globalUrl = 'http://127.0.0.1:8081/liveshopping/';
var userId = '12'
var globalUrl
if(process.env.NODE_ENV=='development'){
    globalUrl = "http://living.appcoo.com/liveshopping/"
}else if(process.env.VUE_APP_CURRENTMODE=='production') {
    globalUrl = "http://living.appcoo.com/liveshopping/"
}else if(process.env.VUE_APP_CURRENTMODE=='test') {
    globalUrl = "http://livingtest.appcoo.com/liveshopping/"
}
// process.env.NODE_ENV=='development'?
//  globalUrl ="http://livingtest.appcoo.com/liveshopping/"  : globalUrl = "http://living.appcoo.com/liveshopping/"
//  console.log(process.env.NODE_ENV)
function setSign(obj) {
    var str = '';
    var signKey = 'duowan!QAZ2wsx';
    var newKey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newKey.length; i++) {
        newObj[newKey[i]] = obj[newKey[i]];
    }
    for (var key in newObj) {
        str += ((key + '=' + newObj[key]) + '&')
    }
    str = str + 'key=' + signKey;
    // console.log("sign str:" + str)
    return md5(str).toUpperCase();
}
  function debounce(fn, wait, immediate = false) {
    let timer;
    return function() {
        if(timer) clearTimeout(timer);
        if(immediate) {
            let trigger = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);

            if(trigger) {
                fn.apply(this, arguments);
            }
            return;
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
        return;
    }
  }

export default {
    setSign,
    globalUrl,
    userId,
    getParams,
    debounce
}

function getParams(params) {
    if (params.userId == undefined) {
        if (localStorage.getItem("userId") == "undefined") {
            params.userId = "12"
        } else {
            params.userId = localStorage.getItem("userId")
        }

    }
    if (params.username == undefined) {
        if (localStorage.getItem("userName") == "undefined") {
            params.username = "18895628787"
        } else {
            params.username = localStorage.getItem("userName")
        }
    }
    params.token = localStorage.getItem("token")
    params.timestamp = Date.parse(new Date()) / 1000
    params.sign = setSign(params);
    return params;
}