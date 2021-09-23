/**
* src: @definejs/api/modules/API.defaults.js
* pkg: @definejs/api@2.0.1
*/
define('API.defaults', function (require, module, exports) { 
    /**
    * API 模块的默认配置
    */
    module.exports = {
        /**
        * 成功的状态码。 
        * 只有状态码为该值是才表示成功，其它的均表示失败。
        */
        successCode: 200,
    
        /**
        * 字段映射。
        * 如果指定为 null，则不对响应进行 json 解析。 
        * 即只有指定具体的映射规则时，才把响应当成 json 进行解析。
        */
        field: {
            /**
            * 状态码。
            */
            code: 'code',
            /**
            * 消息。
            */
            msg: 'msg',
            /**
            * 主体数据。
            */
            data: 'data',
        },
    
        /**
        * 要发送的请求头。
        */
        headers: {
            //针对全部 method 的请求头。
            '': { },
    
            //针对 method=`get` 的请求头。
            'get': { },
    
            //针对 method=`post` 的请求头。
            'post': {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': 'application/json;charset=UTF-8',
            },
        },
    
        /**
        * 要停止继续触发事件的返回值。 
        */
        stopEvents: {
            //针对同一个事件名的。
            same: undefined,
    
            //针对跨事件名的。
            cross: undefined,
        },
    
    
        /**
        * 代理配置。
        */
        proxy: '',
    
        /**
        * 加载代理响应文件的起始位置(或目录)。
        */
        base: '',
    
        /**
        * 随机延迟时间，更真实模拟实际网络环境。
        * 可指定为 false，或如 { min: 500, max: 2000 } 的格式。
        */
        delay: false,
    
        /**
        * 在 url 中增加一个随机长度的 key，以解决缓存问题。
        * 当指定为 false 或 0 时，则禁用。
        */
        random: 4,
    
        /**
        * API 接口 Url 的主体部分。
        */
        url: '',
    
        /**
        * API 接口 Url 的前缀部分。
        */
        prefix: '',
    
        /**
        * API 接口 Url 的后缀部分。
        * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
        */
        ext: '',
       
        /**
        * 请求超时的最大值(毫秒)。
        * 0 表示由浏览器控制，代码层面不控制。
        */
        timeout: 0,
    
        /**
        * 把请求时的 data 中的第一级子对象进行序列化的方法。
        * @param {string} key 要进行处理的子对象的键。
        * @param {Object} value 要进行处理的子对象的值对象。
        * @return {string} 返回该子对象序列化的字符串。
        */
        stringify: null,
    };
});