

define('/HtmlTree/Main/JsLink/Compile/API', function (require, module, exports) {
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
        * 编译。
        */
        compile: function (opt) {
            let api = new API('Less.compile', {
                // proxy: '.json',
            });


            api.on({
                'request': function () {
                    loading.show('编译中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'compile', [data]);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert('编译 less 失败: {0}', msg);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert('编译 less 错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'file': opt.file,
                'dest': opt.dest,
                'minify': false,
            });

           

        },

       

    };


});