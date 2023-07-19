

define('File/Type', function (require, module, exports) {
    let images = [
        'bmp',
        'gif',
        'jpg',
        'jpeg',
        'png',
    ]



    return exports = {

        //从文件名中提取出后缀名。
        get(file) {
            if (file.endsWith('/')) {
                return '/';
            }

            // `a/b.c/e`
            file = file.split('/').slice(-1)[0];
            
            if (!file.includes('.')) {
                return '';
            }

            let ext = file.split('.').slice(-1)[0];
            return ext;
        },

        checkImage(file) { 
            let ext = exports.get(file);

            ext = ext.toLowerCase();

            return images.includes(ext);

        },

        
    };
});