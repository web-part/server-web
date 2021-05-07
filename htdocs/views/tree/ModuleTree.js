
define.view('/ModuleTree', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Main = module.require('Main');

    let storage = new SessionStorage(module.id);

    let meta = {
        item: { id: '/', },  //当前激活的菜单项。在菜单树填充后首先激活根节点。
        stat: null,         //从后台获取到的所有统计数据。
    };


    view.on('init', function () {
        

        API.on('success', {
            'get': function (stat, tree) {
                meta.stat = stat;

                Tree.render(tree);
                Tree.open(meta.item.id);
            },
           
           
        });

        Tree.on({
            'item': function (item) {
                
                storage.set('id', item.id); //保存到 storage。
                meta.item = item;

                Main.render(meta);
                
            },
            'resize': {
                'change': function (dx, width) {
                    Main.resize(dx, width);

                },

                'stop': function () {
                    Main.resize(true);
                },
            },
        });


        

        Main.on({
            'cmd': function (cmd, item) {
                if (cmd == 'id') {
                    Tree.open(item.id, true);
                }
                else {
                    view.fire('cmd', cmd, [item]);
                }
            },
        });

       
    });


    /**
    * 渲染内容。
    *   file: '',   //渲染完成后要打开的文件。
    */
    view.on('render', function (file) {
        
        let id = file || storage.get('id') || `/`;

        meta.item = { 'id': id, }; //使用完全重新的方式。

        API.get();

       
    });



});
