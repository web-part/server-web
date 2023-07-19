

define('/FileList/Sidebar/Stat/Types', function (require, module, exports) {

    return {
        /**
        * 从列表数据中过滤出类型下拉列表。
        */
        get: function (item) {
            if (item.type == 'file') {
                return [];
            }

            let {
                dirs, exts, files, emptyDirs, emptyFiles, size,
                ext$files, ext$size,
            } = item.data.global;


            let list = [
                // {
                //     name: '名称',
                //     value: item.name,
                //     class: 'sname',
                // },
                // {
                //     name: '类型',
                //     value: '目录',
                //     class: 'type',
                // },
                // {
                //     name: '创建时间',
                //     value: item.data.birthtime,
                //     class: 'time',
                // },
                // {
                //     name: '修改时间',
                //     value: item.data.mtime,
                //     class: 'time',
                // },
                {
                    name: '项目',
                    value: dirs.length + files.length,
                    desc: '个',
                    value1: size.value,
                    desc1: size.desc,
                    class: 'spliter dir-size',
                },
                {
                    name: '目录',
                    value: dirs.length,
                    desc: '个',
                    value1: emptyDirs.length,
                    desc1: '空',
                },
                {
                    name: '文件',
                    value: files.length,
                    desc: '个',
                    value1: emptyFiles.length,
                    desc1: '空',
                },
            ];

            exts.forEach((ext) => {
                let size = ext$size[ext];

                list.push({
                    name: ext == '' ? '(无后缀)' : `.${ext}`,
                    value: `${ext$files[ext].length}`,
                    desc: `个`,

                    value1: size.value,
                    desc1: size.desc,
                });
            });
           


            return list;
        },

        

    };

});
