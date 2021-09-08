

define('/Home/Server/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Toast = require('@definejs/toast');
    const API = require('API');

    let emitter = new Emitter();

    let toast = new Toast({
        icon: 'ban',
        mask: 0.5,
        width: 200,
        text: '禁止访问该域名',
    });

    return {
        on: emitter.on.bind(emitter),

        /**
        * 获取。
        */
        get: function () {
            let api = new API('Server.get', {
                // proxy: '.json',
            });

            api.on({
                'request': function () {
                    // loading.show('加载中...');
                    toast.hide();
                },

                'response': function () {
                    // loading.hide();
                },

                'success': function (data, json, xhr) {
                    data.host = data.host || 'localhost';
                    emitter.fire('success', 'get', [data]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert(`获取服务器信息失败: ${msg}`);
                },

                'error': function (xhr) {
                    if (xhr.status == 403) {
                        toast.show();
                    }
                    else {
                        definejs.alert('获取服务器信息错误: 网络繁忙，请稍候再试');
                    }
                },
            });

            api.get();

        },

       

    };


});