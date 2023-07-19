

define('/Home/FileList/Main/Data', function (require, module, exports) {

    const File = require('File');


    function add(key$list, key, item) {
        let list = key$list[key];

        if (!list) {
            list = key$list[key] = [];
        }

        list.push(item);
    }


    return {
        
        parse({ dir$info, file$info, }) {
            let dirs = Object.keys(dir$info);
            let files = Object.keys(file$info);

            let images = [];
            let ext$files = {};
            let size = 0;

            files.forEach((file) => {
                let { md5, stat, } = file$info[file];
                let ext = File.getExt(file);
                let isImage = File.checkImage(file);
          
                add(ext$files, ext, file);

                if (isImage) {
                    images.push(file);
                }

                size += stat.size;

            });

            


            let types = Object.keys(ext$files).sort().map((ext) => {
                let files = ext$files[ext];
                return { ext, files, };
            });

            size = File.getSize(size);

            return {
                dirs,
                files,
                images,
                types,
                size,
            };


        },

    };


});