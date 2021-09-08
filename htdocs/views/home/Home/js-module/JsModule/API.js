

define('/Home/JsModule/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    
    const API = require('API');


    let emitter = new Emitter();




    return {
        on: emitter.on.bind(emitter),

        /**
        * 获取。
        */
        get: function () {
            let api = new API('Stat.get', {
                // proxy: '.json',
            });

            api.on({
                'request': function () {
                    // loading.show('加载中...');
                },

                'response': function () {
                    // loading.hide();
                },

                'success': function (stat, json, xhr) {
                    emitter.fire('success', 'get', [stat]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert(`获取统计数据失败: ${msg}`);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取统计数据错误: 网络繁忙，请稍候再试');
                },
            });

            api.get();

        },

       

    };


});