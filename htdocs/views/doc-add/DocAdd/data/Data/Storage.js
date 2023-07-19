

define('/DocAdd/Data/Storage', function (require, module, exports) {
    const Storage = require('@definejs/local-storage');

    let storage = new Storage(module.id);


    return exports = {

        get() {
            let data = storage.get() || {
                file: '',
                content: '',
                ext: '',
            };

            return data;
        },

        set({ file, content, ext, }) {
            file = file || '';
            content = content || '';
            ext = ext || '';

            
            //editor 会把 `\r\n` 替换成一个 `\n`。
            //这里也要保持一致，否则会造成 content 一进一出后不相等。
            if (content) {
                content = content.split('\r\n').join('\n');
            } 

            let data = { file, content, ext, };
            storage.set(data);

            return data;
        },
        

      
    };


});
