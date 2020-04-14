/**
 * 调起和包支付
 */
export function hbPay(hburl,phone) {
    console.log('和包支付')
    var jsonObj = {
        sessionid: hburl.SESSIONID,                
        phone: phone
    }
    var bridge = window['WebViewJavascriptBridge']
    bridge.callHandler("hepaySend",JSON.stringify(jsonObj),function(){
       //alert(1212)
    });
}

/**
 * 调起微信支付
 * @param wxurl 微信下单接口返回的url
 */
export function wxPay(wxurl) {
    console.log('微信支付')
    var r = /^weixin:/i;
    var httpR = /^http/i;
    var wx154R = /^https:\/\/wx.tenpay.com/i;
    if (r.test(wxurl)) {
        top.location.href = wxurl;
    }else if (httpR.test(wxurl)) {
        if(wx154R.test(wxurl)){
            window.location.href = wxurl;
        }else {
            createPayIframe(wxurl);
        }
    }else {
        createPayIframe(wxurl);
    }
}

/**
 * 调起支付宝支付，
 * @param payForm 支付宝下单返回的form数据
 */
export function zfbPay(payForm) {
    const div = document.createElement('div')
    /* 此处form就是后台返回接收到的数据 */
    div.innerHTML = payForm;
    document.body.appendChild(div)
    document.forms[0].submit()
}


export function createPayIframe(url) {
	const div = document.createElement('div')
	div.innerHTML = "<iframe id='ifr_create' src='" + url
            + "' style='display: none;' sandbox='allow-scripts allow-top-navigation allow-same-origin'></iframe>";
 // div.innerHTML = "<h1>asdasdasas</h1>";
			document.body.appendChild(div);
    // $("body").append("<iframe id='ifr_create' src='" + url
    //         + "' style='display: none;' sandbox='allow-scripts allow-top-navigation allow-same-origin'></iframe>");
    // setTimeout(function() {
    //     $("#ifr_create").remove();
    // }, 4000);
}