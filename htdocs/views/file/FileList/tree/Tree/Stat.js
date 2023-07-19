

define('/FileList/Tree/Stat', function (require, module, exports) {
    const $Array = require('@definejs/array');
    const File = require('File');


    function parse(list, file$info) {
        let dirs = [];
        let files = [];
        let emptyDirs = []; //空目录。
        let emptyFiles = []; //空文件。

        let size = 0;
        let exts = [];
        let ext$files = {};
        let ext$size = {};


        list.forEach((item) => {
            let { id, type, list, } = item;

            if (type == 'dir') {
                dirs.push(item);

                if (list.length == 0) {
                    emptyDirs.push(item);
                }
                return;
            }

            
            let info = file$info[id];
            let { ext, stat, } = info;

            files.push(item);

            if (stat.size == 0) {
                emptyFiles.push(item);
            }

            size += stat.size;
            ext$size[ext] = (ext$size[ext] || 0) + stat.size;

            $Array.add(ext$files, ext, item);
        });

        exts = Object.keys(ext$files);

        dirs.sort(function (a, b) {
            a = a.id.toLowerCase();
            b = b.id.toLowerCase();
            return a > b ? 1 : -1;
        });

        files.sort(function (a, b) {
            a = a.id.toLowerCase();
            b = b.id.toLowerCase();
            return a > b ? 1 : -1;
        });

        exts.sort();

        Object.entries(ext$size).forEach(([ext, size]) => {
            ext$size[ext] = File.getSize(size);
        });

        size = File.getSize(size);


        return {
            size,
            dirs,
            files,
            emptyDirs,
            emptyFiles,
            exts,
            ext$files,
            ext$size,
        
        };

    }

    return {
        

        parse(item, { dir$info, file$info, }) { 
            let { id, type, } = item;

            if (type == 'file') {
                let info = file$info[id];
                Object.assign(item.data, info);
                return;
            }


            //type == 'dir'
            let info = dir$info[id];
            let global = parse(item.children, file$info);
            let current = parse(item.list, file$info);

            Object.assign(item.data, info, { global, current, });

           
        },

     

    };


});