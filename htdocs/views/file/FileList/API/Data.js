

define('/FileList/API/Data', function (require, module, exports) {
    const $Array = require('@definejs/array');
    const $Date = require('@definejs/date');
    const File = require('File');

    return {
        
        make({ dir, dir$info, file$info, }) {
            let md5$files = {};
            let dir$files = {};
          
            let baseUrl = `${location.origin}/${dir}`;


            let dirs = Object.entries(dir$info).map(([dir, info]) => {
                let { stat, } = info;
                let size = File.getSize(stat.size);
                let atime = $Date.format(stat.atimeMs, 'yyyy-MM-dd HH:mm:ss');
                let birthtime = $Date.format(stat.birthtimeMs, 'yyyy-MM-dd HH:mm:ss');
                let ctime = $Date.format(stat.ctimeMs, 'yyyy-MM-dd HH:mm:ss');
                let mtime = $Date.format(stat.mtimeMs, 'yyyy-MM-dd HH:mm:ss');
                let icon = File.getIcon(dir);
                let url = `${baseUrl}${dir}`;

                Object.assign(info, {
                    size,
                    atime,
                    birthtime,
                    ctime,
                    mtime,
                    icon,
                    url,
                });

                return dir;
            });


            let files = Object.entries(file$info).map(([file, info]) => {
                let { md5, stat, } = info;
                let url = `${baseUrl}${file}`;
                let { names, dir, name, ext, isImage, icon, } = File.getInfo(file);

                let size = File.getSize(stat.size);
                let atime = $Date.format(stat.atimeMs, 'yyyy-MM-dd HH:mm:ss');
                let birthtime = $Date.format(stat.birthtimeMs, 'yyyy-MM-dd HH:mm:ss');
                let ctime = $Date.format(stat.ctimeMs, 'yyyy-MM-dd HH:mm:ss');
                let mtime = $Date.format(stat.mtimeMs, 'yyyy-MM-dd HH:mm:ss');


                $Array.add(md5$files, md5, file);
                $Array.add(dir$files, dir, file);

                let repeats = md5$files[md5];
                let siblings = dir$files[dir];

                Object.assign(info, {
                    url,
                    name,
                    names,
                    ext,
                    dir,
                    size,
                    atime,
                    birthtime,
                    ctime,
                    mtime,
                    icon,
                    isImage,
                    repeats,
                    siblings,
                    content: undefined, //预留一个字段。 调用后端接口读取后，会写入到此字段。
                });

                return file;
            });


           
            dirs.sort(function (a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a > b ? 1 : -1;
            });

            files.sort(function (a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a > b ? 1 : -1;
            });


            return { dirs, files, };

        },

     
     

    };


});