/**
* src: @definejs/api/modules/API/Proxy/File.js
* pkg: @definejs/api@2.0.1
*/
define('API/Proxy/File', function (require, module, exports) { 
    module.exports = {
    
        
        get({ proxy, name, }) {
    
            //支持简写，代理的文件名跟 API 的名称一致。
            if (proxy === true) {
                proxy = '.js';
            }
            
    
    
            //只提供后缀，需要补全。
            if (proxy.startsWith('.')) {
                proxy = name + proxy.toLowerCase();
            }
    
            ext = proxy.split('.').slice(-1)[0];
    
            return {
                'file': proxy,
                'ext': `.${ext}`,
            };
    
        },
    };
});