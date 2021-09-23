/**
* src: @definejs/api/modules/API.js
* pkg: @definejs/api@2.0.1
*/
define('API', function (require, module, exports) { 
    
    
    const Headers = module.require('Headers');
    const Ajax = module.require('Ajax');
    const Proxy = module.require('Proxy');
    const Response = module.require('Response');
    const Meta = module.require('Meta');
    
    const mapper = new Map();
    
    
    
    
    class API {
        /**
        * API 构造器。
        * 已重载 API(config);         此时 name 为空串。
        * 已重载 API(name, config);     
        * @param {string} name 后台接口的名称。 简短名称，且不包括后缀。
        * @param {Object} [config] 配置对象。
        *   config = {
        *
        *   };
        */
        constructor(name, config) {
            //重载 API(config);
            if (typeof name == 'object') {
                config = name;
                name = '';
            }
    
            name = name || '';
            config = Object.assign({}, exports.defaults, config);
    
            let ajax = Ajax.make(name, config);
    
            let meta = Meta.get(config, {
                'name': name,
                'ajax': ajax,
                'this': this,
                'done': function (opt) {
                    Response.process(meta, opt);
                },
            });
    
           
    
            mapper.set(this, meta);
    
    
            Object.assign(this, {
                'id': meta.id,
            });
    
    
    
        }
    
        // /**
        // * 当前实例的 id。
        // */
        // id = '';
    
    
        /**
        * 发起 GET 网络请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [query] 可选，请求的数据对象。
        *   该数据会给序列化成查询字符串以拼接到 url 中。
        * @param {Object} [headers] 可选，自定义的请求头键值对对象。
        * @example
            var api = new API('test');
            api.get({ name: 'micty' });
        */
        get(query, headers) {
            //API 类给继承后，this 就是子类的实例。 
            //比如 SSH 继承 API，则 this 为 SSH 的实例，不再是 API 的实例。
            let meta = mapper.get(this);
            let allHeaders = Headers.make(meta, 'get', headers);
    
            let req = {
                time: Date.now(),
                method: 'get',
                headers: allHeaders,
                query,
            };
    
            meta.fire('request', [req]);
    
            if (meta.proxy) {
                Proxy.request(meta, req);
            }
            else {
                Ajax.request(meta, req);
            }
    
        }
    
        /**
        * 发起 POST 网络请求。
        * 请求完成后会最先触发相应的事件。
        * @param {Object} [data] 可选，post 请求的数据对象。
        *   该数据会给序列化成字符串，并且通过 form-data 发送出去。
        * @param {Object} [query] 可选，查询字符串的数据对象。
        *   该数据会给序列化成查询字符串以拼接到 url 中。
        * @param {Object} [headers] 可选，自定义的请求头键值对对象。
        *   该数据会以键值对的方式添加到请求头中。
        */
        post(data, query, headers) {
            let meta = mapper.get(this);
            let allHeaders = Headers.make(meta, 'post', headers);
    
            let req = {
                time: Date.now(),
                method: 'post',
                headers: allHeaders,
                query,
                data,
            };
    
            meta.fire('request', [req]);
    
            if (meta.proxy) {
                Proxy.request(meta, req);
            }
            else {
                Ajax.request(meta, req);
            }
    
        }
    
    
        /**
        * 绑定事件。
        * 已重载 on({...}，因此支持批量绑定。
        */
        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }
    
        /**
        * 销毁本实例对象。
        */
        destroy() {
            let meta = mapper.get(this);
            meta.emitter.destroy();
            mapper.delete(this);
        }
    
        /**
        * 响应代理请求。
        * 可以生成很复杂的动态数据，并根据提交的参数进行处理，具有真正模拟后台逻辑的能力。
        * 已重载 response(fn)的情况。
        * 已重载 response(json)的情况。
        * @param {function|Object} factory 响应的处理函数或 json 对象。
        *   当传进来的 factory 为处理函数时，该函数会接收到两个参数：factory(context)。 
        * 其中： 
        *   context = {
        *       method: '',     //请求类型，值为 `get` 或 `post`。
        *       name: '',       //请求的接口名称，如 `getUsers`。
        *       base: '',       //代理响应的基础目录，如 `api/`。
        *       file: '',       //请求代理的实际响应文件，如 `getUsers.js`。
        *       ext: '',        //请求代理的实际响应文件的后缀名，如 `.js`。
        *       url: '',        //请求代理的实际响应文件地址，如 `http://localhost:3001/htdocs/api/getUsers.js?E9E4`。
        *       query: {},      //请求的 query 部分。
        *       data: {},       //针对 post 请求时的表单数据。
        *       time: 0,        //请求发起时的客户端时间戳，如 1631608915540。
        *       headers: {},    //自定义的请求头。
        *       factory: fn,    //针对代理响应为 js 文件时，此 js 文件里面对应的工厂函数。
        *   }
        */
        static proxy(factory) {
            Proxy.response(factory);
        }
    }
    
    API.defaults = require('API.defaults');
    module.exports = exports = API;
});