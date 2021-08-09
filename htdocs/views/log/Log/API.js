

define('/Log/API', function (require, module, exports) {
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
        get: function () {
            let api = new API('Log.get', {
                // proxy: '.json',
            });

            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (list, json, xhr) {
                    emitter.fire('success', 'get', [list]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取日志列表失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取日志列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.get();

        },

        clear() {
            let api = new API('Log.clear', {
                // proxy: '.json',
            });

            api.on({
                'request': function () {
                    loading.show('处理中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'clear', []);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert(`清空日志失败: ${msg}`);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('清空日志错误: 网络繁忙，请稍候再试');
                },
            });

            api.get();
        },



    };


});