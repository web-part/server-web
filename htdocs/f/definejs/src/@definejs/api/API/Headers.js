/**
* src: @definejs/api/modules/API/Headers.js
* pkg: @definejs/api@2.0.1
*/
define('API/Headers', function (require, module, exports) { 
    
    
    
    module.exports = {
    
        make(meta, method, more) {
            let headers = meta.headers || {};
            let defaults = headers[''] || {};       //针对全部的请求头。
            let methods = headers[method] || {};    //针对特定类型的请求头，如 `get`、`post`。
    
            let all = Object.assign({}, defaults, methods, more);
    
            
            return all;
    
        },
    };
});