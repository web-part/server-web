/**
* src: @definejs/api/modules/API/Response.js
* pkg: @definejs/api@2.0.1
*/
define('API/Response', function (require, module, exports) { 
    const Fn = require('Fn');
    const Events = module.require('Events');
    const Parser = module.require('Parser');
    
    
    
    module.exports = {
    
        //opt 会包含下列三种情况的一种。
        // { xhr, isTimeout, }      //服务器。   
        // { xhr, context, }        //代理，请求的是 json 文件或其它。
        // { factory, context, }    //代理，请求的是 js 文件。
        process(meta, opt) {
            let { field, successCode, stopEvents, } = meta;
            let stopValue = stopEvents.cross;
            
            let {
                xhr,        //服务器模式和非 js 文件的代理模式。
                isTimeout,  //仅针对服务器模式，是否超时。 
                factory,    //仅针对代理模式，请求 js 文件时的工厂函数的返回值。
                context,    //仅针对代理模式，请求的上下文。
            } = opt;
    
    
            let res = Parser.parse({ xhr, field, factory, context, });
            let events = Events.get({ res, isTimeout, successCode, });
            
    
            Fn.delay(meta.delay, function () {
                
                events.some((item) => {
                    let { names, args, condition, } = item;
                    if (!condition) {
                        return;
                    }
    
                    let needStop = meta.fire(...names, args);
                    return needStop;
                });
                
            });
        },
    };
});