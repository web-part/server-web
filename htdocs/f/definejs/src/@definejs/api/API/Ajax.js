/**
* src: @definejs/api/modules/API/Ajax.js
* pkg: @definejs/api@2.0.1
*/
define('API/Ajax', function (require, module, exports) { 
    
    const Data = module.require('Data');
    const Url = module.require('Url');
    const XHR = module.require('XHR');
    
    
    
    /**
    * 发起 ajax 网络请求(核心方法)。
    *   method: '',             //网络请求的方式，只能取值为：`get` 或 `post`。
    *   opt = {
    *       url: '',            //可选，请求的 url 地址。
    *       prefix: '',         //可选，url 的前缀。
    *       name: '',           //必选，后台接口的名称，会用在 url 中。
    *       ext: '',            //可选，要用在 url 中的后缀。
    *       random: 4,          //给 url 加上随机数的长度，以刷新缓存。 如果指定为 false 或 0，则禁用。
    *       timeout: 0,         //超时时间。 如果指定为 0，则使用浏览器内置的超时管理，会调用 fnError 回调函数。
    *       proxy: false,       //是否启用代理。 要启用，可以指定为 true，或一个具体的 json 或 js 文件名。
    *
    *       data: {},           //可选，post 要发送的数据。 如果不是字符串，则会调用 fnStringify 方法进行字符串化。
    *       query: {},          //可选，要发送的查询字符串数据。 post 和 get 时都可用。
    
    *       headers: {},
    *
    *
    *       fnStringify: fn,    //对 data 字段的进行字符串化的方法。
    *       fnDone: fn,         //请求完成后的回调函数。
    *   };
    *
    * 返回：
    *   XMLHTTPRequest 实例对象 xhr。
    *   如果使用的是代理，则返回 null。
    */
    function request(method, opt) {
        let url = Url.make(opt);                    // opt = { url, prefix, name, ext, query, random, };
        let data = Data.make(method, opt);          // opt = { data, fnStringify, };
    
        //同时启动超时器和发起请求，让它们去竞争。
        let xhr = XHR.make({
            'method': method,
            'url': url,
            'headers': opt.headers,
            'timeout': opt.timeout,
            'fnDone': opt.fnDone,
        });
    
        xhr.send(data);
    
        return xhr;
    }
    
    
    module.exports = {
    
        make(name, config) {
            //发起 ajax 请求所需要的配置对象。
            let ajax = {
                'name': name,
                'url': config.url,
                'prefix': config.prefix,
                'ext': config.ext,
                'random': config.random,
                'field': config.field,
                'timeout': config.timeout,
                'fnStringify': config.stringify,
            };
    
            return ajax;
    
        },
    
    
        request(meta, { method, data, query, headers, }) {
            request(method, {
                ...meta.ajax,
                data,
                query,
                headers,
                'fnDone': meta.done,
            });
        }
    
    };
});