

define('/Terminal/Command/FileList', function (require, module, exports) {
    const Loading = require('@definejs/loading');
    const Emitter = require('@definejs/emitter');
    const API = require('API');


    let emitter = new Emitter();

    let loading = new Loading({
        mask: 0,
    });


    return {

        on: emitter.on.bind(emitter),

        /**
        * 读取指定文件系统信息。
        */
        get: function () {
            let api = new API('FileList.read', {
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
                    emitter.fire('success', [data]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取文件列表失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取文件列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.get({
                'id': '/',
            });

        },


    };


});