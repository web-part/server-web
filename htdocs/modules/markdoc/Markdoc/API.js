

define('/Markdoc/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const API = require('API');

    let emitter = new Emitter();




    return {
        on: emitter.on.bind(emitter),


        /**
        * 读取指定文件或目录的信息。
        */
        read: function (id) {
            let api = new API('FileList.read', {
                // proxy: '.json',
            });

            api.on({
                'request': function () {
                    emitter.fire('loading', [true]);
                },

                'response': function () {
                    emitter.fire('loading', [false]);
                },

                'success': function (data, json, xhr) {
                    let { content, isImage, url, } = data;

                    if (isImage) {
                        //markdown 语法。 中括号之间要留个空格，才能在 markdoc 的源码中语法高亮。
                        content = `![ ](${url})`;
                    }

                    emitter.fire('success', [content]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('获取文件内容失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('获取文件内容错误: 网络繁忙，请稍候再试');
                },
            });

            api.get({ 'id': id, });

        },

        

    };


});