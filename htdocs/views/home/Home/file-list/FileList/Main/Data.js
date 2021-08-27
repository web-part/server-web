

define('/Home/FileList/Main/Data', function (require, module, exports) {

    

    const imgExts = new Set([
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.bmp',
    ]);


    function add(key$list, key, item) {
        let list = key$list[key];

        if (!list) {
            list = key$list[key] = [];
        }

        list.push(item);
    }


    return {
        
        parse(list) {
            let dirs = [];
            let files = [];
            let images = [];
            let ext$files = {};
            let size = 0;

            let utf8 = {
                is: 0,
                not: 0,
            };

            list.forEach((item) => {
                let { type, ext, stat, isUTF8, } = item;
                
                if (type == 'dir') {
                    dirs.push(item);
                    return;
                }
                

                files.push(item);
                add(ext$files, ext, item);

                if (imgExts.has(ext)) {
                    images.push(item);
                }

                size += stat.size;

                utf8[isUTF8 ? 'is' : 'not']++;

            });


            let exts = Object.keys(ext$files).map((ext) => {
                let files = ext$files[ext];
                return { ext, files, };
            });

            return {
                list,
                dirs,
                files,
                images,
                ext$files,
                exts,
                size,
                utf8,
            };


        },

    };


});