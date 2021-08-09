

define('File/Ext', function (require, module, exports) {
    

    return {
        //从名称中提取出后缀名
        get(name) {
            if (!name.includes('.')) {
                return '';
            }


            let ext = name.split('.').slice(-1)[0];
            
            ext = ext ? `.${ext}` : '';
            ext = ext.toLowerCase();

            return ext;
        },
    };
});