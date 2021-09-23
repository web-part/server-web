/**
* src: @definejs/api/modules/API/Proxy/XHR.js
* pkg: @definejs/api@2.0.1
*/
define('API/Proxy/XHR', function (require, module, exports) { 
    module.exports = {
    
        
        load(url, done) {
            let xhr = new XMLHttpRequest();
    
            xhr.open('get', url, true);
    
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) {
                    return;
                }
    
                done(xhr);
            };
    
            xhr.send(null);
    
        },
    };
});