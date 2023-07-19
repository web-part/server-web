

define('/Home/JsModule/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    
    const API = require('API');
    const Data = module.require('Data');


    let emitter = new Emitter();




    return {
        on: emitter.on.bind(emitter),

        /**
        * 获取。
        */
        get() {
            let api = new API('ModuleSystem.parse', {
                // proxy: '.json',
            });

            api.on({
                'request': function () {
                    // loading.show('加载中...');
                },

                'response': function () {
                    // loading.hide();
                },

                'success': function (data, json, xhr) {
                    data = Data.make(data);

                    emitter.fire('success', 'get', [data]);
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