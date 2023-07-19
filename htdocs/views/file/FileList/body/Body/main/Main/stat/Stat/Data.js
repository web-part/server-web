

define('/FileList/Body/Main/Stat/Data', function (require, module, exports) {

    const File = require('File');

    function getPercent(value, total) { 
        if (Array.isArray(value)) {
            value = value.length;
        }

        if (Array.isArray(total)) {
            total = total.length;
        }

        let percent = value / total * 100;

        percent = percent.toFixed(2);

        if (0<percent && percent < 0.2) {
            percent = 0.2;
        }

        return percent;
    }

    return {
        
        get(item) {

            let {
                dirs, exts, files, emptyDirs, emptyFiles, size,
                ext$files, ext$size,
            } = item.data.global;

            let totalCount = dirs.length + files.length;
            let totalSize = size.raw;

            let list = [
                {
                    top: 1,
                    icon: File.getIcon(''),
                    name: '项目',
                    count: {
                        value: totalCount,
                        percent: 0,
                        desc: '个',
                    },

                    size: {
                        ...size,
                        percent: 0,
                    },
                },
                {
                    top: 2,
                    icon: File.getIcon('/'),
                    name: '目录',
                    count: {
                        value: dirs.length,
                        percent: getPercent(dirs, totalCount),
                        desc: '个',
                    },

                    size: {
                        value: emptyDirs.length,
                        percent: getPercent(emptyDirs, dirs),
                        desc: '空',
                    },
                },
                {
                    top: 3,
                    icon: File.getIcon(''),
                    name: '文件',
                    count: {
                        value: files.length,
                        percent: getPercent(files, totalCount),
                        desc: '个',
                    },
                    size: {
                        value: emptyFiles.length,
                        percent: getPercent(emptyFiles, files),
                        desc: '空',
                    },
                },
            ];

            exts.forEach((ext) => {
                let name = ext == '' ? '(无后缀)' : `.${ext}`;
                let size = ext$size[ext];
                let icon = File.getIcon(`.${ext}`);
                let count = ext$files[ext].length;


                list.push({
                    icon,
                    name,
                    size,

                    count: {
                        value: count,
                        percent: getPercent(count, files),
                        desc: '个',
                    },

                    size: {
                        ...size,
                        percent: getPercent(size.raw, totalSize),
                    },
                });
            });
           


            return list;
        },

        

    };

});
