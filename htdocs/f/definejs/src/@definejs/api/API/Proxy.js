/**
* src: @definejs/api/modules/API/Proxy.js
* pkg: @definejs/api@2.0.1
*/
define('API/Proxy', function (require, module, exports) { 
    const Script = require('Script');
    const File = module.require('File');
    const Url = module.require('Url');
    const XHR = module.require('XHR');
    
    
    
    let current = null;
    
    
    function request(opt) {
    
        let {
            method,
            name,
            base,
            proxy,
            data,
            query,
            time,
            headers,
            fnDone,
        } = opt;
    
       
        let { file, ext, } = File.get({ proxy, name, });
        let url = Url.get(file, base);
        
    
        let context = {
            method,
            name,
            base,
            file,
            ext,
            url,
            query,
            data,
            time,
            headers,
        };
    
        /**
        * 加载指定的 js 代理文件。
        * 注意：加载完 js 代理文件后，会先执行 js 代理文件的逻辑，再触发 onload 事件。
        * 经过试验发现，并发加载多个 js 文件，也会严格地按上述顺序对应的进行。
        */
        if (ext == '.js') {
            //加载完后会去执行 response() 方法，此时 meta.factory 就有值。
            Script.load(url, function () {
                let factory = context.factory =current;
    
                current = null;
    
    
                if (typeof factory == 'function') {
                    factory = factory(context);
                }
    
                fnDone({ factory, context, });
            });
        }
        else {
            XHR.load(url, function (xhr) {
                context.xhr = xhr;
                fnDone({ xhr, context, });
            });
        }
    }
    
    
    
    module.exports = {
    
    
        request(meta, req) {
            // debugger
            request({
                ...req,
                'name': meta.name,
                'base': meta.base,
                'proxy': meta.proxy,
                'fnDone': meta.done,
            });
    
        },
    
       
    
        /**
        * 响应代理请求。
        * 可以生成很复杂的动态数据，并根据提交的参数进行处理，具有真正模拟后台逻辑的能力。
        * 该方法仅用在代理响应的 js 文件中，且在调用之前必须先调用 request 方法。
        * 已重载 response(json)的情况。
        * @param {function|Object} factory 响应的处理函数或 json 对象。
        *   当传进来的 factory 为处理函数时，该函数会接收到两个参数：factory(data, config)。 其中：
        *   data 为发起 get 或 post 请求时最终的 data 字段；
        *   config 为发起 get 或 post 请求时全部的配置字段。
        */
        response(factory) {
            current = factory;
        },
    };
});