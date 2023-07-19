

define('/FileList/API', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Loading = require('@definejs/loading');
    const Toast = require('@definejs/toast');
    const API = require('API');
    const Data = module.require('Data');


    let emitter = new Emitter();

    let loading = new Loading({
        mask: 0,
    });

    let toast = new Toast({
        duration: 1500,
        mask: 0,
    });

    let meta = {
        data: null,
    };


    return {
        on: emitter.on.bind(emitter),

        /**
        * 获取。
        */
        get(refresh) {

            if (!refresh && meta.data) {
                emitter.fire('success', 'get', [meta.data, true]);
                return;
            }


            let api = new API('FileSystem.list');

            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();

                },

                'success': function (data, json, xhr) {
                    let { dir, dir$info, file$info, } = data;
                    let { dirs, files, } = Data.make(data);

                    data = meta.data = {
                        dir, dir$info, file$info,
                        dirs, files,
                    };

                    emitter.fire('success', 'get', [data, false]);

                   



                    // let worker = new Worker('./worker/FileList.js');

                    // worker.addEventListener('message', (event) => {
                    //     worker.terminate();

                    //     loading.hide();
                    //     let data = meta.data = event.data;
                    //     emitter.fire('success', 'get', [data, false]);
                      

                    // });

                    // worker.postMessage(data);


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
       * 删除指定的文件或目录。
       */
        delete(item) {
            let type = item.type;

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

                let api = new API('FileSystem.delete');

                api.on({
                    'request': function () {
                        loading.show('删除中...');
                    },

                    'response': function () {
                        loading.hide();
                    },

                    'success': function (data, json, xhr) {
                        toast.show('删除成功', function (params) {
                            emitter.fire('success', 'delete', [item]);
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
                });

            });


        },

    };


});