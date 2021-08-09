

define('/FileList/Body/Main/List/File/Data', function (require, module, exports) {
    const $Array = require('@definejs/array');

    let meta = {
        list: [],
        files: [],
        exts: [],
        md5$files: {},
    };

    function filter(list, data, fn) {
        if (data) {
            list = list.filter(fn);
        }

        return list;
    }



    return {

        init(list) {

            let exts = new Set();

            meta.md5$files = {}; //这里每次都要重置。
            meta.list = list;

            meta.files = list.filter((item) => {
                if (item.type == 'dir') {
                    return false;
                }

                let { ext, md5, } = item;
                let { md5$files, } = meta;

                exts.add(ext.toLowerCase());
                $Array.add(md5$files, md5, item);

                //增加一个字段。
                //表示 md5 相同的文件的列表。
                item.files = md5$files[md5];


                

                return true;
            });

            meta.exts = [...exts,];



            return meta;

        },


       


        /**
        * 从列表数据中过滤出指定条件的子集。
        */
        filter: function ( opt) {

            let {
                cwd = '',
                name = '',
                ext$checked = null,
                encoding$checked = null,
                md5$checked = null,
                childDirs = null,
            } = opt;

            let list = meta.files;



            list = filter(list, name, function (item) {
                return item.name.includes(name);
            });

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

            list = filter(list, ext$checked, function (item) {
                let ext = item.ext.toLowerCase(); //这里要统一为小写。

                return ext$checked[ext];
            });


            list = filter(list, encoding$checked, function (item) {
                let encoding = item.isUTF8 ? 'utf8' : 'other';
                return encoding$checked[encoding];
            });

            list = filter(list, md5$checked, function (item) {
                let { md5, } = item;
                let files = meta.md5$files[md5];
                let N = files.length;

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

            if (!cwd) {
                list = filter(list, childDirs, function (item) {
                    let { name, } = item;

                    let isOK = childDirs.some((dir) => {

                        return name == dir || name.startsWith(`${dir}/`)
                    });

                    return isOK;
                });
            }
            


            
            let isMd5Mode = false;

            //此时仅要查看重复的文件。
            //则按 md5 值进行分组，让 md5 值相同的记录排在一起。
            if (md5$checked && md5$checked['N>1'] && !md5$checked['N=1']) {
                let md5$files = {};

                list.forEach((item) => {
                    let { md5, files, } = item;
                    md5$files[md5] = files;
                });

                isMd5Mode = true;
                list = [];

                Object.keys(md5$files).forEach((md5) => {
                    let files = md5$files[md5];

                    list = [...list, ...files,];
                });

            }



            return { list, isMd5Mode, };



        },

    };

});
