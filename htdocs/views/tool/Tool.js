
define.view('/Tool', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const Tree = module.require('Tree');
    const Main = module.require('Main');

    let storage = null;


    let meta = {
        item: null,
    };
 

    view.on('init', function () {

        storage = new SessionStorage(module.id);

        Tree.on({
            'item': function (item) {
                console.log(item);
                storage.set('id', item.id); //保存到 storage。
                meta.item = item;
                Main.render(item);

            },
            'resize': function () {
                let w1 = Tree.$.outerWidth();
                Main.resize(w1, 6);
            },
        });




        Main.on({
            

        });

  
    });


    view.on('render', function (id) {
        id = id || storage.get('id') || `1`;
        meta.item = { 'id': id, }; //使用完全重新的方式。

        Tree.render();
        Tree.open(id);

    });



    return {

    };

});
