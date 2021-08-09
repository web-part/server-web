

define('/DocAdd/Editor/File', function (require, module, exports) {
    const $Date = require('@definejs/date');
    const $String = require('@definejs/string');
    const Loading = require('@definejs/loading');
    const File = require('File');

    let loading = new Loading({
        mask: 0,
    });





    return {

        /**
        * 上传粘贴板中的文件。
        *   file: File,         //必选，DOM 节点中的 input[type="file"] 元素中获取到的对象。
        *   done: function,     //可选，上传完成后的回调。
        */
        upload: function (file, done) {
            let now = new Date();
            let date = $Date.format(now, 'yyyy-MM-dd');
            let time = $Date.format(now, 'HHmmss');

            let dir = 'upload/paste/' + date + '/';
            let name = time + '-' + $String.random(4) + '.png';


            loading.show('上传中...');


            File.upload({
                'file': file,
                'dir': dir,
                'name': name,

                'done': function (data) {
                    loading.hide();

                    if (!data) {
                        definejs.alert('上传失败');
                        return;
                    }

                    let sample = '![]({dest})';
                    let md = $String.format(sample, data);

                    done && done(md, data);

                },
            });
        },

        /**
        * 
        */
        paste: function () {

        },
    };





});
