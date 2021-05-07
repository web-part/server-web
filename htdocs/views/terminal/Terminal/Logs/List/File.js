
define('/Terminal/Logs/List/File', function (require, module, exports) {

    const $String = require('@definejs/string');

    let meta = {
        fs: null,
        files: [],
    };


    function make(fs) {

        //已经处理过了。
        if (fs === meta.fs) {
            return meta;
        }


        let { list, root, } = fs;

        if (root.endsWith('/')) {
            root = root.slice(0, -1);
        }

        let files = list.map((item) => {
            let file = `${root}${item.name}`;
            return file;
        });

        //按长度进行倒序，可以避免一个短的文件名无意中成为另一个长的文件名的前缀。
        files = files.sort(function (a, b) {
            return a.length > b.length ? -1 : 1;
        });


      
        meta.fs = fs;
        meta.files = files;

        return meta;

    }



    return {

        render(msg, fs) {
            //不存在文件系统对照数据，则原样返回。
            if (!fs) {
                return msg;
            }


            let { files,  } = make(fs);


            files.forEach((file, index) => {
                let html = `<a data-cmd="file" data-value="{${index}}">{${index}}</a>`;

                msg = $String.replaceAll(msg, file, html);

            });


            msg = $String.format(msg, files);


            return msg;
        },
    };
});

