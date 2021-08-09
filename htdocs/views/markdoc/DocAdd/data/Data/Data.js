

define('/DocAdd/Data/Data', function (require, module, exports) {
    const Storage = require('@definejs/local-storage');
    const $Object = require('@definejs/object');

    let storage = new Storage(module.id);

    let meta = {
        item: null,
    };


    return exports = {

        get() {
            let item = meta.item;

            if (!item) {
                item = meta.item = storage.get() || { // name 可能有值。
                    'name': '',
                    'content': '',
                    'ext': '',
                };
            }

            return item;
        },

        set(key, value) {
            let data = $Object.isPlain(key) ?
                { ...key, } :
                { [key]: value, };

            data = $Object.filter(data, ['name', 'content', 'ext',]);
            
           
            let item = meta.item || {};
            let content = data.content;

            //editor 会把 `\r\n` 替换成一个 `\n`。
            //这里也要保持一致，否则会造成 content 一进一出后不相等。
            if (content) {
                data.content = content.split('\r\n').join('\n');
            }

            meta.item = Object.assign(item, data);
            storage.set(item);

            return item;
        },
        

      
    };


});
