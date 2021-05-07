

define('/ModuleTree/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    
    const Loading = require('@definejs/loading');
    const API = require('API');
    const Data = module.require('Data');


    let emitter = new Emitter();

    let loading = new Loading({
        mask: 0,
    });




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
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (stat, json, xhr) {
                    let tree = Data.make(stat);

                    emitter.fire('success', 'get', [stat, tree]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取模块列表失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取模块列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.get();

        },

       

    };


});