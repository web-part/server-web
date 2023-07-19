

define.panel('/HtmlTree/Main/JsLink/FileInfo', function (require, module, panel) {
    const $Date = require('@definejs/date');
    const File = require('File');
    const API = module.require('API');


    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="file"]': function (event) {
                let file = this.innerText;
                panel.fire('file', [file]);
            },
        });

        API.on('success', {
            'read': function (data) {
                let { content, stat, md5, file, } = data;
                let lines = content.split('\n');
                let { names, dir, name, ext, isImage, icon, } = File.getInfo(file);
                let size = File.getSize(stat.size);
                let birthtime = $Date.format(stat.birthtimeMs, 'yyyy-MM-dd HH:mm:ss');
                let mtime = $Date.format(stat.mtimeMs, 'yyyy-MM-dd HH:mm:ss');


                panel.fill({
                    name,
                    file,
                    dir,
                    ext,
                    md5,
                    birthtime,
                    mtime,

                    'type': `${ext} 文件`,
                    'lines': lines.length,
                    'sizeValue': size.value,
                    'sizeDesc': size.desc,
                });
            },
        });

    });




    panel.on('render', function (item) {
        let { file, } = item.data;

        API.read(file);




    });




});
