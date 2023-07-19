

define('MenuTree/Files/List', function (require, module, exports) {


    return exports = {
        /**
        * 根据给定的目录名，递归搜索子目录和文件列表，组装成符合菜单树的数据结构。
        *   dir: '',            //要组装的目录名称。 须以 `/` 结尾。
        *   opt = {
        *       dir$files: {},  //某个目录对应的文件列表（仅当前层级，不包括子目录的）。
        *       dir$dirs: {},   //某个目录对应的子目录列表（仅当前层级，不包括子目录的）。
        *   };
        */
        make(dir, { dir$dirs, dir$files, }) {
            let dirs = dir$dirs[dir];   //目录短名称列表。

            let list = dirs.map(function (item) {
                let sdir = `${dir == '/' ? '' : dir}${item}/`;
                let list = exports.make(sdir, { dir$dirs, dir$files, }); //递归。
                let files = dir$files[sdir]; //文件短名称列表。

                files = files.map(function (file) {
                    let id = `${sdir}${file}`;//完整名称。

                    return {
                        'type': 'file',
                        'name': file,
                        'id': id,
                        'data': {},
                    };
                });

                list = [...list, ...files];


                return {
                    'type': 'dir',
                    'name': item,
                    'id': sdir,
                    'data': {},
                    'list': list,
                };
            });

            return list;
        },

        //对树型结构的列表进行每项迭代。
        each(list, fn, depth = 0) { 
            list.forEach((item) => {
                fn(item, depth);

                let { list, } = item;

                if (Array.isArray(list)) {
                    exports.each(list, fn, depth + 1);
                }

            });
        },
    };

});