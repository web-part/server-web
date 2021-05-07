

define('{MenuTreeSidebar.id}/Main/Data', function (require, module, exports) {
    const none = module.data.none;

    function getModuleId(id) {
        let prefix = `/${none}`;

        if (id.startsWith(prefix)) {
            id = id.slice(prefix.length);
        }
        else if (id.startsWith('/')) {
            id = id.slice('/'.length);
        }


        return id;
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
        let dir$files = opt.dir$files;
        let dir$dirs = opt.dir$dirs;

        let dirs = dir$dirs[dir];

        let list = dirs.map(function (item) {
            let sdir = dir + '/' + item;
            sdir = sdir.replace(/\/+/g, '/'); //把多个 `/` 合并成一个。

            let list = make(opt, sdir); //递归。
            let files = dir$files[sdir];

            files = files.map(function (file) {
                let name = sdir + '/' + file; //完整名称。
                let mid = getModuleId(name);

                return {
                    'name': file,
                    'id': name,
                    'mid': mid, //加个字段，方便后续处理。
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


            let mid = getModuleId(sdir);

            return {
                'name': item,
                'id': sdir,
                'mid': mid,//加个字段，方便后续处理。
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
        toTree: function (opt) {
            let root = '/';
            let list = make(opt, root);


            //加上根目录的文件列表。
            let files = opt.dir$files[root];

            files = files.map(function (file) {
                let id = root + file;
                let mid = getModuleId(id);

                return {
                    'name': file,
                    'id': id,
                    'mid': mid,
                    'data': {
                        'type': 'file',
                        'name': id,
                        'parent': root,
                    },
                };
            });

            list = [...list, ...files];

            ////取最后一个目录名。 
            ////如 opt.root = '../../markdoc/htdocs/data'; 则 name = 'data';
            let name = opt.root.split('/').slice(-1)[0]; 

            // return list;
            return [
                {
                    'name': name,
                    'id': root,
                    'open': true,
                    'foldable': false,
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