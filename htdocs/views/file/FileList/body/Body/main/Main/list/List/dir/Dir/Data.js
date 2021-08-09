

define('/FileList/Body/Main/List/Dir/Data', function (require, module, exports) {

    let meta = {
        list: [],
        dirs: [],
    };

    function filter(list, data, fn) {
        if (data) {
            list = list.filter(fn);
        }

        return list;
    }

    return {

        init(list) {

            meta.list = list;

            meta.dirs = list.filter((item) => {
                return item.type == 'dir';
            });


            meta.dirs.forEach((item) => {
                let size = item.stat.size; //目录自身的大小。
                let dir = item.name;
                let files = [];
                let dirs = [];

                list.forEach((item) => {
                    let { name, stat, type, } = item;
                    let isChild = name.startsWith(`${dir}/`);

                    if (!isChild) {
                        return;
                    }

                    if (type == 'file') {
                        size += stat.size; //累加文件的大小。
                        files.push(item);
                    }
                    else {
                        dirs.push(item);
                    }

                });


                //增加字段。
                item.files = files;
                item.dirs = dirs;
                item.size = size;
            });
            
        },



        /**
        * 从列表数据中过滤出指定条件的子集。
        */
        filter: function (opt) {
            let {
                cwd = '',
                name = '',
                files$checked = null,
                dirs$checked = null,
                childDirs = null,
            } = opt;

            let list = meta.dirs;

            list = filter(list, name, function (item) {
                return item.name.includes(name);
            });

            
            //注意，根目录的 id 为字符串 '/'。
            list = filter(list, cwd, function (item) {
                
                let { name, } = item;

                //根目录的。
                if (cwd == '/') {
                    return !name.slice(1).includes('/');
                }

                //其它目录的。
                let suffix = name.slice(cwd.length + 1);
                return !suffix.includes('/');

            });

            list = filter(list, files$checked, function (item) {
                let N = item.files.length;

                //`N=0` 没有勾选。
                if (!files$checked['N=0'] && N == 0) {
                    return false;
                }

                //`N>0` 没有勾选。
                if (!files$checked['N>0'] && N > 0) {
                    return false;
                }

                return true;
            });

            list = filter(list, dirs$checked, function (item) {
                let N = item.dirs.length;

                //`N=0` 没有勾选。
                if (!dirs$checked['N=0'] && N == 0) {
                    return false;
                }

                //`N>0` 没有勾选。
                if (!dirs$checked['N>0'] && N > 0) {
                    return false;
                }

                return true;
            });



            if (!cwd) {
                list = filter(list, childDirs, function (item) {
                    let { name, } = item;

                    let isOK = childDirs.some((dir) => {

                        return name == dir || name.startsWith(`${dir}/`)
                    });

                    return isOK;
                });
            }
            



            return list;

        },

    };

});
