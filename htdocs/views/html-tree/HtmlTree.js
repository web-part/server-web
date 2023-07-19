
define.view('/HtmlTree', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Main = module.require('Main');

    let storage = new SessionStorage(module.id);


    view.on('init', function () {
        

        API.on('success', {
            'get': function (data) {
                let cid = storage.get('cid') || 1;

                Tree.render(data);
                Tree.open(cid);
            },
        });

        Tree.on({
            'item': function (item) {
                storage.set('cid', item.cid); //保存到 storage。
                Main.render(item);
            },
            'resize': function (w) {
                Main.resize(w, 6);
            },
        });

        Main.on({
            'file': function (file) {
                view.fire('file', [file]);
            },
            'id': function (id) {
                Tree.open(id);
            },
        })

        

       
    });


    /**
    * 渲染内容。
    */
    view.on('render', function () {
        
        API.get();

       
    });



});
