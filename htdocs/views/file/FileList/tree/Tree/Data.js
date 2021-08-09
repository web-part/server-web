

define('/FileList/Tree/Data', function (require, module, exports) {
    const File = require('File');

    function getFileIcon(file) {
        let { className, } = File.getIcon({
            'name': file,
        });
        
        return className;

    }


    /**
    * 根据给定的目录名，递归搜索子目录和文件列表，组装成符合菜单树的数据结构。
    *   dir: '',            //要组装的目录名称。
    *   opt = {
    *       dir$files: {},  //某个目录对应的文件列表（仅当前层级，不包括子目录的）。
    *       dir$dirs: {},   //某个目录对应的子目录列表（仅当前层级，不包括子目录的）。
    *   };
    */
    function make(opt, dir) {
        let { dir$dirs, dir$files, } = opt;
        let dirs = dir$dirs[dir];

        let list = dirs.map(function (item) {
            let sdir = dir + '/' + item;
            sdir = sdir.replace(/\/+/g, '/'); //把多个 `/` 合并成一个。

            let list = make(opt, sdir); //递归。
            let files = dir$files[sdir];

            files = files.map(function (file) {
                let name = sdir + '/' + file; //完整名称。
                let icon = getFileIcon(file);

                return {
                    'name': file,
                    'id': name,
                    'fileIcon': icon,
                    'data': {
                        'type': 'file',
                        'name': name,       
                        'parent': sdir,
                    },
                };
            });

            list = [...list, ...files];

            //为了让空目录能以文件夹的图标展示（组件设计如此），需要增加一个虚拟的指示文件。
            //同时在父模块里转发它的点击到该虚拟文件的父目录中。
            if (!list.length) {
                list.push({
                    'name': '(空目录)',
                    'id': sdir + '/', 
                    'data': {
                        'type': 'file',
                        'name': '',
                        'parent': sdir,
                    },
                });
            }


            return {
                'name': item,
                'id': sdir,
                'data': {
                    'type': 'dir',
                    'name': sdir,   //完整名称。
                    'parent': dir,  //
                },
                'list': list,
            };
        });



        return list;
    }





    return {
        /**
        * 把 JSON 数据转成树节点列表，用于展示成菜单树。
        */
        make: function (opt) {
            let root = '/';
            let list = make(opt, root);


            //加上根目录的文件列表。
            let files = opt.dir$files[root];

            files = files.map(function (file) {
                let id = root + file;
                let icon = getFileIcon(file);

                return {
                    'name': file,
                    'id': id,
                    'fileIcon': icon,
                    'data': {
                        'type': 'file',
                        'name': id,
                        'parent': root,
                    },
                };
            });

            list = [...list, ...files];

            let name = opt.root.split('/').slice(-1)[0]; 

            return [
                {
                    'name': name,
                    'id': root,
                    'open': true,
                    'data': {
                        'type': 'dir',
                        'name': root,
                    },
                    'list': list,
                },
            ];
        },

     
    };


});