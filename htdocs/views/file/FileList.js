
define.view('/FileList', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Preview = module.require('Preview');
    const Sidebar = module.require('Sidebar');
    const Dialog = module.require('Dialog');
    const Main = module.require('Main');


    let storage = new SessionStorage(module.id);

    let meta = {
        item: { id: '/', },     //当前激活的菜单项。 在菜单树填充后首先激活根节点。
        detail: null,           //读取文件请求后台时拿到的数据。
    };


    view.on('init', function () {

        API.on('success', {
            'get': function (data) {
                let { root, } = data;
                let id = meta.item.id;

                if (id.startsWith(`${root}/`)) {
                    meta.item.id = id = id.slice(root.length);
                }


                Tree.render(data);
                Tree.open(id);
            },
            'read': {
                'dir': function (data) {
                    Preview.hide();

                    Main.render({
                        'list': data.detail.list,
                        'item': data.item,
                        'root': data.detail.root,
                    });

                    Sidebar.render(data);
                },

                'file': function (data) {
                    meta.detail = data.detail;
                    Preview.render(data.detail);
                    Main.hide();
                    Sidebar.render(data);
                },
            },
            'delete': function (data) {
                meta.item.id = data.parent;
                API.get();
            },
        });

        Tree.on({
            'item': function (item) {
                storage.set('id', item.id); //保存到 storage。
                meta.item = item;
                API.read(item);
            },
            'resize': {
                'change': function (dx) {
                    Main.resize(dx);
                    Preview.resize(dx);
                },

                'stop': function () {
                    Main.resize(true);
                    Preview.resize(true);
                },
            },
        });


        Main.on({
            'item': function (item) {
                Tree.open(item.name);
            },
            
        });


        Preview.on({
            'render': function (titles) {
                Sidebar.outline(titles);
            },
        });

        Sidebar.on('outline', function (item, index) {
            Preview.outline(index);
        });

        Sidebar.on('operation', {
            'refresh': function () {
                API.get();
            },
           
            'open': function () {
                window.open(meta.detail.url);
            },
            
            'demo': function () {
                view.fire('demo', [meta.item.id]);
            },
            'sidebar': function () {
                view.fire('sidebar', [meta.item.id]);
            },
        });

        Dialog.on({
            'success': function (data) {
                meta.item = { 'id': data.dest, };
                API.get(); //刷新。
            },
        });
       
    });


    /**
    * 渲染内容。
    *   file: '',   //渲染完成后要打开的文件。
    */
    view.on('render', function (file) {

        let id = file || storage.get('id') || '/';

        meta.item = { 'id': id, }; //使用完全重新的方式。

        API.get();

       
    });



});
