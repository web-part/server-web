/**
* src: @definejs/api/modules/API/Meta.js
* pkg: @definejs/api@2.0.1
*/
define('API/Meta', function (require, module, exports) { 
    const Emitter = require('Emitter');
    
    let idCounter = 0;
    
    module.exports = {
    
        get(config, more) {
            let id = `definejs-API-${idCounter++}`;
            let stopEvents = config.stopEvents || {};
    
            let emitter = new Emitter(more.this, {
                'stopValue': stopEvents.same,
            });
    
            let meta = {
                'id': id,
                'name': more.name,
                'ajax': more.ajax,
                'this': more.this,
                'emitter': emitter,
                'proxy': config.proxy,
                'base': config.base,
                'delay': config.delay,
                'successCode': config.successCode,
                'field': config.field,
                'headers': config.headers,
                'stopEvents': stopEvents,
                'done': more.done,           //回调函数。
                'values': [],   //缓存当次 emitter.fire() 的返回结果。
            };
    
    
            meta.fire = function (...args) {
                let stopValue = stopEvents.cross;
                let needStop = stopValue !== undefined && meta.values.includes(stopValue);
    
                //先检查上次执行后的结果。
                if (needStop) {
                    return needStop;
                }
    
                meta.values = emitter.fire(...args);
            };
    
    
    
          
    
            return meta;
    
        },
    };
});