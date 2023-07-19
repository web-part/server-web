

define('/HtmlTree/Main/JsLink/Content/API', function (require, module, exports) {
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
        read(file) {
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

                'success': function (file$item, json, xhr) {
                    let { content, } = file$item[file];
                    emitter.fire('success', 'read', [content]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('读取文件失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('读取文件错误: 网络繁忙，请稍候再试');
                },
            });



            api.post({
                files: [file],
                content: true,
                info: false,
            });

        },

       

    };


});