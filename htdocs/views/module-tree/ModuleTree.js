
define.view('/ModuleTree', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Main = module.require('Main');

    let storage = new SessionStorage(module.id);

    let meta = {
        item: null,         //当前激活的菜单项。在菜单树填充后首先激活根节点。
        stat: null,         //从后台获取到的所有统计数据。
    };


    view.on('init', function () {
        

        API.on('success', {
            'get': function (stat, tree) {
                meta.stat = stat;

                Tree.render(stat);
                Tree.open(meta.item.id);
            },
        });

        Tree.on({
            'item': function (item) {
                meta.item = item;
                storage.set('id', item.id); //保存到 storage。
                Main.render(meta);
                
            },
            'resize': function () {
                let w1 = Tree.$.outerWidth();
                Main.resize(w1, 6);
            },
        });


        

        Main.on({
            'item': function (item) {
                Tree.open(item.id);
            },

            'id': function (id) {
                if (id.startsWith('@definejs/')) {
                    let file = `/f/definejs/src/${id}`;
                    view.fire('file', [file]);
                }
                else {
                    Tree.open(id);
                }

            },

            'file': function (file) {
                view.fire('file', [file]);
            },



        });

       
    });


    /**
    * 渲染内容。
    *   id: '',   //渲染完成后要打开的节点。
    */
    view.on('render', function (id) {
        
        id = id || storage.get('id') || 1;

        meta.item = { id, };

        API.get();

       
    });



});
