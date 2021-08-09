

define('File/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Loading = require('@definejs/loading');
    const API = require('API');


   

    return {
        create() {
            let emitter = new Emitter();

            let loading = new Loading({
                mask: 0,
            });

            return {
                on: emitter.on.bind(emitter),

                /**
                * 读取指定文件或目录的信息。
                */
                read: function (id, fn) {
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
                            emitter.fire('success', 'read', [data]);
                        },

                        'fail': function (code, msg, json, xhr) {
                            definejs.alert('获取文件内容失败: {0}', msg);
                        },

                        'error': function (code, msg, json, xhr) {
                            definejs.alert('获取文件内容错误: 网络繁忙，请稍候再试');
                        },
                    });

                    //如 `htdocs/a/b/test.js`，则取为 `/a/b/test.js`
                    if (!id.startsWith('/')) {
                        id = id.split('/').slice(1).join('/');
                    }

                    api.get({ 'id': id, });

                },



            };
        },
    };


   


});