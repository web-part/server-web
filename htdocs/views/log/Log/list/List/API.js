

define('/Log/List/API', function (require, module, exports) {
    const $Date = require('@definejs/date');
    const API = require('API');

    return {

        /**
        * 获取列表。
        */
        get(date, fn) {
            let api = new API('Log.get', {
                // proxy: '.json',
            });

            api.on({
                'success': function (data, json, xhr) {
                    fn && fn(data);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert(`获取日志列表失败: ${msg}`);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取日志列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.get({ date, });

        },



    };


});