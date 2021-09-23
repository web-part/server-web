/**
* src: @definejs/api/modules/API/Ajax/Url.js
* pkg: @definejs/api@2.0.1
*/
define('API/Ajax/Url', function (require, module, exports) { 
    
    const Query = require('Query');
    
    module.exports = {
    
        make(opt) {
            let {
                url = '',
                prefix = '',
                name = '',
                ext = '',
                query = null,
                random = 0,
            } = opt;
    
            //完整的 url
            url = url + prefix + name + ext;
    
    
            if (query) {
                query = typeof query == 'string' ? Query.parse(query) : query;
                url = Query.add(url, query);
            }
    
            //增加一个随机字段，以使缓存失效。
            if (random) {
                random = typeof random == 'number' ? random : 4;
                url = Query.random(url, random);
            }
    
            return url;
    
        },
    };
});