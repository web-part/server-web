
define('/Terminal/Footer/History', function (require, module, exports) {
    const LocalStorage = require('@definejs/local-storage');

    let storage = new LocalStorage(module.id);
    let list = storage.get('list') || [];



    let meta = {
        index: list.length,
    };


    return {
        get(step) {
            let index = meta.index + step;

            if (index < 0 || index >= list.length) {
                return;
            }

            meta.index = index;
            return list[index];
        },

        push(value) {
            list.push(value);
            storage.set('list', list);

            meta.index = list.length;
        },
    };
});