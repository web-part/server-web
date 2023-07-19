

define('/ModuleTree/Main/Content/API', function (require, module, exports) {
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
        * 读取。
        */
        read(files) {
            let api = new API('FileSystem.read', {
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
                    console.log(data);
                    emitter.fire('success', 'read', [data]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取模块列表失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取模块列表错误: 网络繁忙，请稍候再试');
                },
            });



            api.post({
                files,
                content: true,
                info: false,
            });

        },



    };


});