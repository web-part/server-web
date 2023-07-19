

define('/FileList/Body/Main/List/File/Data', function (require, module, exports) {
    const $Array = require('@definejs/array');


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
        filter(node, opt) {

            let {
                onlyCurrent = false,
                name = '',
                ext$checked = null,
                md5$checked = null,
                childDirs = [],
            } = opt;

            let isGlobal = !onlyCurrent;
            let list = node.data[isGlobal ? 'global' : 'current'].files;


            if (isGlobal) {
                list = list.filter(function (item) {
                    //当前目录下的直接子文件。
                    if (item.parent.id == node.id) {
                        return true;
                    }

                    let { id, } = item;

                    let found = childDirs.some((child) => {
                        return id.startsWith(child.id);
                    });

                    return found;
                });
            }
            

            list = filter(list, name, function (item) {
                return item.id.includes(name);
            });


            list = filter(list, ext$checked, function (item) {
                let { ext, } = item.data;

                return ext$checked[ext];
            });


            list = filter(list, md5$checked, function (item) {
                let { repeats, } = item.data;
                let N = repeats.length;

                //`N=1` 没有勾选。
                if (!md5$checked['N=1'] && N == 1) {
                    return false;
                }

                //`N>1` 没有勾选。
                if (!md5$checked['N>1'] && N > 1) {
                    return false;
                }

                return true;
            });


            let isRepeatMode = md5$checked && md5$checked['N>1'] && !md5$checked['N=1'];


            //此时仅要查看重复的文件。
            //则按 md5 值进行分组，让 md5 值相同的记录排在一起。
            if (isRepeatMode) {
                let md5$files = {};

                list.forEach((item) => {
                    let { md5, } = item.data;
                    $Array.add(md5$files, md5, item);
                });

                list = [];

                Object.entries(md5$files).forEach(([md5, files]) => {
                    list = [...list, ...files,];
                });

            }


            return { list, isRepeatMode, };



        },

    };

});
