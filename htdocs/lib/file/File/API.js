

define('File/API', function (require, module, exports) {
    const Loading = require('@definejs/loading');
    const API = require('API');

    let loading = new Loading({
        mask: 0,
    });


    return {
        /**
        * 读取。
        */
        read(file, fn) {
            let api = new API('FileSystem.read');

            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (file$item, json, xhr) {
                    let { content, } = file$item[file];
                    fn && fn(content);
                },

                'fail': function (code, msg, json, xhr) {
                    definejs.alert(`读取文件失败: ${msg}`);
                },

                'error': function (code, msg, json, xhr) {
                    definejs.alert(`读取文件错误: 网络繁忙，请稍候再试`);
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