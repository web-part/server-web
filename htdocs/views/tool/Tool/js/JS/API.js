

define('/Tool/JS/API', function (require, module, exports) {
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
        * 压缩。
        */
        minify: function (content) {
            let api = new API('JS.minify', {
                // proxy: '.json',
            });


            api.on({
                'request': function () {
                    loading.show('压缩中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', [data]);
                },

                'fail': function (code, msg, json, xhr) {
                    let error = json.data;

                    definejs.alert(`压缩 js 失败: ${msg}，所在行号：${error.line}`, function () {
                        emitter.fire('fail', [error]);
                    });
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('压缩 js 错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'content': content,
            });



        },
       

    };


});