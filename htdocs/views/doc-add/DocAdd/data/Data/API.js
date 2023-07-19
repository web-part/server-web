
define('/DocAdd/Data/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Loading = require('@definejs/loading');
    const Toast = require('@definejs/toast');
    const File = require('File');
    const API = require('API');

    let emitter = new Emitter();

    let loading = new Loading({
        mask: 0,
    });

    let toast = new Toast({
        text: '保存成功',
        duration: 1500,
        mask: 0,
    });



    return {
        on: emitter.on.bind(emitter),

        read(file) {

            File.read(file, function (content) { 
                let ext = File.getExt(file);
                ext = ext.toLowerCase();

                emitter.fire('success', 'read', [{ file, content, ext, }]);
            });

        },


        //提交详情
        save(opt) {
            let api = new API('FileList.write');

            api.on({
                'request': function () {
                    loading.show('保存中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show();

                    setTimeout(function () {
                        emitter.fire('success', 'save', [data, opt]);
                    }, 1500);

                },

                'fail': function (code, msg, json) {
                    definejs.alert(`保存失败: ${msg}`);
                },

                'error': function () {
                    definejs.alert('保存错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

    };


});