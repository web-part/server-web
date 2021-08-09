

define.panel('/HtmlTree/Main/JsLink/FileInfo', function (require, module, panel) {
    const File = require('File');
    const $Date = require('@definejs/date');
    const API = File.API();


    let meta = {
        file: '',
        dir: '',
    };


    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="file"]': function (event) {
                panel.fire('file', [meta.file]);
            },

            '[data-cmd="dir"]': function (event) {
                panel.fire('file', [meta.dir]);
            },
        });

        API.on('success', {
            'read': function (data) {
                let file = meta.file;
                let name = file.split('/').slice(-1)[0];
                let lines = data.content.split('\n');

                let { stat, } = data;
                let size = File.getSizeDesc(stat.size);
                let type = data.ext.slice(1) + ' 文件';
                let birthtime = $Date.format(stat.birthtime, 'yyyy-MM-dd HH:mm:ss');
                let mtime = $Date.format(stat.mtime, 'yyyy-MM-dd HH:mm:ss');


                panel.fill({
                    'name': name,
                    'file': file,
                    'ext': data.ext,
                    'md5': data.md5,
                    'dir': meta.dir,
                    'type': type,
                    'lines': lines.length,
                    'size': size.value,
                    'sizeDesc': size.desc,
                    'birthtime': birthtime,
                    'mtime': mtime,
                    'isUTF8': data.isUTF8 ? '是' : '否',
                    'utf8Class': data.isUTF8,
                });
            },
        });

    });




    panel.on('render', function (item) {
        let { file, } = item.data;

        //传入的是同一个文件，则直接显示即可。
        if (file == meta.file) {
            return;
        }

        meta.file = file;
        meta.dir = file.split('/').slice(0, -1).join('/');
        API.read(file);

   


    });





});
