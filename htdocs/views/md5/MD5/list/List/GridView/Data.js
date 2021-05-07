
define('/MD5/List/GridView/Data', function (require, module, exports) {
    
    return {
        parse(list, onlyMulti) {
            let md5$files = {};
            let file$md5 = {};
            let md5$added = {};

            list.forEach((item) => {
                let { file, md5, } = item;
                let files = md5$files[md5];

                if (!files) {
                    files = md5$files[md5] = [];
                }

                files.push(file);

                file$md5[file] = md5;

            });



            list = [];


            Object.keys(file$md5).sort().forEach((file) => {
                let md5 = file$md5[file];
                let added = md5$added[md5];
                if (added) {
                    return;
                }


                md5$added[md5] = true;


                let files = md5$files[md5];
                
                if (onlyMulti && files.length < 2) {
                    return;
                }
                
                // if (files.length == 1) {
                //     files = files[0];
                // }

                files = files.sort();

                list.push({ md5, files, });


            });


           

            return list;

            return md5$files;
        },
    };
});