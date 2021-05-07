

define('/Master/PageTabs/List', function (require, module, exports) {
    const List = require('List');

    let list = new List([
        {
            view: 'Home',
            id: 'Home',
            name: '首页',
            isHome: true,
        },
    ]);

    return list;

});