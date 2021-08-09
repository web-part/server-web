

define('File', function (require, module, exports) {
    const API = module.require('API');
    const Ext = module.require('Ext');
    const Icon = module.require('Icon');
    const Size = module.require('Size');




    return {
        API: API.create,

        /**
        * 获取文件大小的描述。
        */
        getSizeDesc(...args) {
            return Size.getDesc(...args);
        },

        /**
        * 获取文件类型的图标。
        */
        getIcon(opt) {
            if (typeof opt == 'string') {
                opt = { 'name': opt, };
            }

            let { ext, type, name, } = opt;

            ext = ext || Ext.get(name);

            let icon = Icon.get({ ext, type, });
            return icon;
        },

        /**
        * 从文件名中获取后缀名。
        * @param {string} name 必选，文件名。
        * @returns 返回文件名的后缀名，以 `.` 开头，且已转换为小写。 如 `.json`。
        */
        getExt(name) {
            return Ext.get(name);
        },


    };

});






