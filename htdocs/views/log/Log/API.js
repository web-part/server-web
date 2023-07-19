

define('/Log/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Loading = require('@definejs/loading');
    const API = require('API');


    let emitter = new Emitter();

    let loading = new Loading({
        mask: 0,
    });



    function onSuccess(stat) { 
        let dates = [];
        let type$count = {};

        Object.entries(stat.date$info).forEach(([date, info]) => {
            dates.push(date);
            Object.assign(type$count, info.type$count);
        });

        let types = Object.keys(type$count);


        dates.sort();
        Object.assign(stat, { types, dates, });

        emitter.fire('success', 'get', [stat]);
    }

    return {
        on: emitter.on.bind(emitter),

        /**
        * 获取统计信息。
        */
        get() {
            let api = new API('Log.stat', {
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
                    onSuccess(stat);
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
            let api = new API('Log.clear');

            api.on({
                'request': function () {
                    loading.show('处理中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (stat, json, xhr) {
                    onSuccess(stat);

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