/**
* src: @definejs/api/modules/API/Response/Parser.js
* pkg: @definejs/api@2.0.1
*/
define('API/Response/Parser', function (require, module, exports) { 
    const $JSON = require('JSON');
    
    function getHeaders(xhr) {
        let headers = {};
        let list = xhr.getAllResponseHeaders().split('\r\n');
    
        list.forEach((item) => {
            let a = item.split(': ');
            let key = a[0];
            if (!key) {
                return;
            }
    
            let value = a[1];
            headers[key] = value;
        });
    
        return headers;
    
    }
    
    
    module.exports = {
        parse({ xhr, factory, field, context, }) {
            let json = null;
            let origin = '';
            let status = '';
            let url = '';
            let headers = null;
            let parsedJSON = null;
    
    
            if (xhr) {
                headers = getHeaders(xhr);
    
                let type = headers['content-type'];
                let text = xhr.responseText;
    
                if (type.startsWith('application/json;')) {
                    json = $JSON.parse(text);
                }
    
                origin = text;
                status = xhr.status;
                url = xhr.responseURL;
            }
            else {
                origin = factory;
                status = 200;
                headers = {};
                url = context.url;
    
                if (typeof factory == 'object') {
                    json = { ...factory, };
    
                    status = factory.status || 200;
                    headers = factory.headers || {};
    
                    delete json.status;     //删除可能的存在的 `status` 字段。
                    delete json.headers;
                }
            }
    
            if (json && field) {
                parsedJSON = {
                    'code': json[field.code],
                    'msg': json[field.msg],
                    'data': (field.data in json) ? json[field.data] : {},
                };
            }
    
    
            return {
                json,
                status,
                headers,
                origin,
                parsedJSON,
                xhr,
                url,
                'hasError': status != 200 || field && !parsedJSON,
                'isProxy': !!context, //是否为代理模式。
            };
    
    
        },
    };
});