

define.panel('/ModuleTree/Main/FileInfo', function (require, module, panel) {
    const File = require('File');
    const $Date = require('@definejs/date');


    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="file"]': function (event) {
                let file = this.innerText;
                panel.fire('file', [file]);
            },

            '[data-cmd="dir"]': function (event) {
                let dir = this.innerText;

                //去掉后缀 `/`。
                if (dir.endsWith('/')) {
                    dir = dir.slice(0, -1);
                }

                panel.fire('file', [dir]);
            },
        });

        panel.template(function (info, index) {
            let icon = File.getIcon(info.file);
            let size = File.getSizeDesc(info.size);
            let type = info.ext.slice(1) + ' 文件';
            let birthtime = $Date.format(info.stat.birthtime, 'yyyy-MM-dd HH:mm:ss');
            let mtime = $Date.format(info.stat.mtime, 'yyyy-MM-dd HH:mm:ss');

            return {
                'icon': icon.html,
                'name': info.name,
                'file': info.file,
                'ext': info.ext,
                'md5': info.md5,
                'dir': info.dir,
                'lines': info.lines,
                'type': type,
                'size': size.value,
                'sizeDesc': size.desc,
                'birthtime': birthtime,
                'mtime': mtime,
                'isUTF8': info.isUTF8 ? '是' : '否',
            };
        });

    });




    panel.on('render', function ({ item, stat, }) {
        console.log(item, stat);

       
        let { id, } = item.data;
        let jsInfo = stat.moduleStat.id$info[id];
        let htmlInfo = stat.htmlStat.id$info[id];
        let list = htmlInfo ? [jsInfo, htmlInfo] : [jsInfo];

        panel.fill(list);



    });





});
