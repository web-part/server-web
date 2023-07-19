

define('/FileList/Body/Main/List/Dir/Data', function (require, module, exports) {

    function filter(list, condition, fn) {
        if (condition) {
            list = list.filter(fn);
        }

        return list;
    }

    return {

        /**
        * 从列表数据中过滤出指定条件的子集。
        */
        filter: function (item, opt) {
            let {
                cwd = false,
                name = '',
                files$checked = null,
                dirs$checked = null,
                childDirs = [],
            } = opt;


            let list = item.data[cwd ? 'current' : 'global'].dirs;

            childDirs = childDirs.map((dir) => {
                let { id, } = item;
                let pid = id == '/' ? '' : id;
                return `${pid}${dir}/`;
            });

            list = list.filter(function (item) {
                let { id, } = item;

                let isOK = childDirs.some((dir) => {
                    return id == dir || id.startsWith(dir);
                });

                return isOK;
            });

            list = filter(list, name, function (item) {
                return item.id.includes(name);
            });

          

            list = filter(list, files$checked, function (item) {
                let N = item.data[cwd ? 'current' : 'global'].files.length;

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
                let N = item.data[cwd ? 'current' : 'global'].dirs.length;

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


            return list;

        },

    };

});
