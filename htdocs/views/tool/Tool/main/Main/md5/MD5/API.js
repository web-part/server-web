

define('/Tool/Main/MD5/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Loading = require('@definejs/loading');
    const API = require('API');


    let emitter = new Emitter();

    let loading = new Loading({
        mask: 0,
    });




    return {
        on: emitter.on.bind(emitter),

        /**
        * 获取。
        */
        get: function (content) {
            let api = new API('Crypto.md5', {
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
                    emitter.fire('success', [data,]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取 MD5 信息失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取 MD5 信息错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'content': content,
            });

        },

       

    };


});