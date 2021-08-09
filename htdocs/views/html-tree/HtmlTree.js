
define.view('/HtmlTree', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Main = module.require('Main');

    let storage = new SessionStorage(module.id);

    let meta = {
        cid: 0,
    };


    view.on('init', function () {
        

        API.on('success', {
            'get': function (json) {
                Tree.render(json);
                Tree.open(meta.cid);
            },
        });

        Tree.on({
            'item': function (item) {
                console.log(item);

                meta.cid = item.cid;
                storage.set('cid', item.cid); //保存到 storage。

                Main.render(item);
            },
            'resize': function () {
                let w1 = Tree.$.outerWidth();
                Main.resize(w1, 6);
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
        
        meta.cid = storage.get('cid') || 1;


        API.get();

       
    });



});
