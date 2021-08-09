
define('/Master/Sidebar/List/Data', function (require, module, exports) {
    const Language = require('Settings.Language');


    return {

        make(items) {
            let language = Language.get();

            let list = items.map((item, index) => {
                item = { ...item, };

                item.id = item.view;    //这里以 view 作为 id，需要具有唯一性。
                item.index = index;
                item.name = item.language$name[language];

                return item;
            });

            return list;
        },

        set(list, language) {
            list.forEach((item) => {
                item.name = item.language$name[language];
            });
        },

       
    };
});