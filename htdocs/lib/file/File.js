

define('File', function (require, module, exports) {
    const API = module.require('API');
    const Type = module.require('Type');
    const Icon = module.require('Icon');
    const Size = module.require('Size');




    return {

        getInfo(file) { 
            let names = file.split('/');
            let dir = names.slice(0, -1).join('/') + '/';
            let name = names.slice(-1)[0];
            let ext = Type.get(file);
            let isImage = Type.checkImage(file);
            let icon = Icon.get(ext);

            return { names, dir, name, ext, isImage, icon, };
        },

        /**
        * 获取文件大小的描述。
        */
        getSize(size) {
            let raw = size;
            let { value, desc, } = Size.get(size);
            return { value, desc, raw, };
        },

        /**
        * 获取文件类型或目录的图标。
        */
        getIcon(file) {
            let ext = Type.get(file);
            let icon = Icon.get(ext);
            return icon;
        },



        /**
        * 从文件名中获取后缀名。
        * @param {string} file 必选，文件名。
        * @returns 返回文件名的后缀名，不包含 `.`。
        */
        getExt(file) {
            return Type.get(file);
        },


        checkImage(file) { 
            return Type.checkImage(file);
        },


        read(file, fn) { 
            let isImage = Type.checkImage(file);

            if (!isImage) {
                API.read(file, function (content) { 
                    fn && fn(content);
                });
            }
            else {
                let url = `${location.origin}${location.pathname}${file}`;
                let content = `![](${url})`;
                fn && fn(content);
            }
        },

        


    };

});






