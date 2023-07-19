
define.view('/ModuleTree', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Main = module.require('Main');

    let storage = null;

    let meta = {
        id: '',
        stat: null,         //从后台获取到的所有统计数据。
    };


    view.on('init', function () {
        storage = new SessionStorage(module.id);

        API.on('success', {
            'get': function (stat) {
                let id = storage.get('id') || '/';

                meta.stat = stat;

                Tree.render(stat);
                Tree.open(id);
            },
        });

        Tree.on({
            'item': function (item) {
                storage.set('id', item.data.id); //这里取的是 mid，保存到 storage。
                Main.render(item,  meta.stat);
                
            },
            'resize': function (w) {
                Main.resize(w, 6);
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

            'path': function (id) {
                Tree.open(id);
            },

            'file': function (file) {
                view.fire('file', [file]);
            },
        });

       
    });


    /**
    * 渲染内容。
    *   id: '',   //渲染完成后要打开的模块 id。
    */
    view.on('render', function (id) {
        
        if (id) {
            storage.set('id', id);
        }


        API.get();

       
    });



});
