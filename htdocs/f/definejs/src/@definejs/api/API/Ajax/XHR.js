/**
* src: @definejs/api/modules/API/Ajax/XHR.js
* pkg: @definejs/api@2.0.1
*/
define('API/Ajax/XHR', function (require, module, exports) { 
    
    
    let fn = function (...args) {
        // console.log(...args);
    };
    
    
    module.exports = {
    
        make(opt) {
            let {
                method,
                url,
                headers = {},
                timeout = 0,
                fnDone = fn,
            } = opt;
    
    
    
            let xhr = new XMLHttpRequest();
            let isTimeout = false; //指示是否已超时
            let tid = null;
    
            //同时启动超时器和发起请求，让它们去竞争。
            if (timeout > 0) {
                tid = setTimeout(function () {
                    isTimeout = true;
                    xhr.abort(); //取消当前响应，关闭连接并且结束任何未决的网络活动。
                    fnDone({ xhr, isTimeout, });
                }, timeout);
            }
    
            xhr.open(method, url, true);
    
    
            Object.keys(headers).forEach((key) => {
                let value = headers[key];
                xhr.setRequestHeader(key, value);
            });
    
    
            xhr.onreadystatechange = function () {
                if (isTimeout || xhr.readyState != 4) {
                    return;
                }
    
                clearTimeout(tid);
                fnDone({ xhr, });
            };
    
            return xhr;
    
        },
    };
});