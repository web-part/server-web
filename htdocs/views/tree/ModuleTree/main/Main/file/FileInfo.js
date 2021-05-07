﻿

define.panel('/ModuleTree/Main/FileInfo', function (require, module, panel) {
    const File = require('File');
    const $Date = require('@definejs/date');

    let meta = {
        info: null,     //外面传进来的模块信息。
    };

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="file"]': function (event) {
                let item = { 'file': meta.info.file, };

                panel.fire('cmd', ['file', item]);
            },

            '[data-cmd="dir"]': function (event) {
                let dir = meta.info.dir;
                //去掉后缀 `/`。
                if (dir.endsWith('/')) {
                    dir = dir.slice(0, -1);
                }

                let item = { 'file': dir, };

                panel.fire('cmd', ['file', item]);
            },
        });

    });




    panel.on('render', function (data) {
        let { item, stat, } = data;
        let { id$info, id$module, } = stat.moduleStat;
        let id = item.mid;
        let info = id$info[id];

        let size = File.getSizeDesc(info.size);
        let type = info.ext.slice(1) + ' 文件';
        let birthtime = $Date.format(info.stat.birthtime, 'yyyy-MM-dd HH:mm:ss');
        let mtime = $Date.format(info.stat.mtime, 'yyyy-MM-dd HH:mm:ss');

        meta.info = info;
        
        panel.fill({
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
        });

    });





});