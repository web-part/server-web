

define('/HtmlTree/API', function (require, module, exports) {
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
        get() {
            let api = new API('HtmlTree.parse', {
                // proxy: '.json',
            });


            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    Data.make(data);
                    emitter.fire('success', 'get', [data]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert(`获取解析数据失败 ${msg}`);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取解析错误: 网络繁忙，请稍候再试');
                },
            });

            api.get({
                usePack: false,
            });

           

        },

       

    };


});