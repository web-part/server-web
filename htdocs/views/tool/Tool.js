
define.view('/Tool', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const Tree = module.require('Tree');
    const Main = module.require('Main');

    let storage = null;


    let meta = {
        item: null,
        args: null,
    };
 

    view.on('init', function () {

        storage = new SessionStorage(module.id);

        Tree.on({
            'item': function (item) {
                console.log(item);

                let args = meta.args;

                meta.item = item;
                meta.args = null;

                storage.set('id', item.id); //保存到 storage。
                Main.render(item, args);

            },
            'resize': function () {
                let w1 = Tree.$.outerWidth();
                Main.resize(w1, 6);
            },
        });




      

        Main.on({
            'fullscreen': function (on) {
                view.$.toggleClass('fullscreen', on);
                view.fire('fullscreen', [on]);
            },
        });

  
    });


    view.on('render', function (id, args) {
        id = id || storage.get('id') || 1;
        meta.args = args || null;

        Tree.render();
        Tree.open(id);

    });



    return {

    };

});
