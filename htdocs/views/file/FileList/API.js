

define('/FileList/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $String = require('@definejs/string');
    const Loading = require('@definejs/loading');
    const Toast = require('@definejs/toast');
    const API = require('API');


    let emitter = new Emitter();

    let loading = new Loading({
        mask: 0,
    });

    let toast = new Toast({
        duration: 1500,
        mask: 0,
    });


    return {
        on: emitter.on.bind(emitter),

        /**
        * 获取。
        */
        get: function () {
            let api = new API('FileList.get', {
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
                    emitter.fire('success', 'get', [data]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取文件列表失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取文件列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.get();

        },

        /**
        * 读取指定文件或目录的信息。
        */
        read: function (item) {
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
                    let content = data.content;

                    if (data.isImage) {
                        let sample = '![ ]({url})';                   //markdown 语法。 中括号之间要留个空格，才能在 markdoc 的源码中语法高亮。

                        data.content = $String.format(sample, {
                            'url': data.url,
                        });

                        //data.ext = '.md';
                    }


                    let type = item.data.type;

                    let options = {
                        'detail': data,     //服务器读取到的信息。
                        'item': item,       //菜单项的信息。
                    };

                    emitter.fire('success', 'read', type, [options]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取文件内容失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取文件内容错误: 网络繁忙，请稍候再试');
                },
            });

            api.get({'id': item.id, });

        },

        /**
       * 删除指定的文件或目录。
       */
        delete: function (item) {
            let type = item.data.type;

            let type$desc = {
                file: '文件',
                dir: '目录',
            };

            let msg = `你确认要删除该${type$desc[type]}（${item.id}）吗？ `;

            //是一个目录。
            if (type == 'dir') {
                msg += `<p style="color: red;">这将会连同它的所有子目录和文件一起删除。</p>`;
            }

            msg += `<p style="color: #FF5722; font-weight: bold;">该操作会直接从服务器上删除目标项，且不可恢复！</p>`;



            definejs.confirm(msg, function () {

                let api = new API('FileList.delete');

                api.on({
                    'request': function () {
                        loading.show('删除中...');
                    },

                    'response': function () {
                        loading.hide();
                    },

                    'success': function (data, json, xhr) {
                        toast.show('删除成功', function (params) {
                            emitter.fire('success', 'delete', [{
                                'id': item.id,
                                'parent': item.parent.id,
                            }]);
                        });
                    },

                    'fail': function (code, msg, json, xhr) {
                        definejs.alert('删除失败: {0}', msg);
                    },

                    'error': function (code, msg, json, xhr) {
                        definejs.alert('删除错误: 网络繁忙，请稍候再试');
                    },
                });

                api.post({
                    'id': item.id,
                    'type': type,
                });

            });


        },

    };


});