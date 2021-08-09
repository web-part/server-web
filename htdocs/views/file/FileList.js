
define.view('/FileList', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Sidebar = module.require('Sidebar');
    const Body = module.require('Body');
    


    let storage = new SessionStorage(module.id);

    let meta = {
        item: { id: '/', },     //当前激活的菜单项。 在菜单树填充后首先激活根节点。
        detail: null,           //API.read(item) 的结果。
    };


    function formatId(root, id) {
        if (id == root) {
            return '/';
        }

        if (id.startsWith(`${root}/`)) {
            id = id.slice(root.length);
        }

        return id;
    }

    view.on('init', function () {

        API.on('success', {
            'get': function (data) {
                let id = formatId(data.root, meta.item.id);

                meta.item.id = id;

                Tree.render(data);
                Tree.open(id);
            },
            'read': {
                'dir': function ({ detail, item, }) {
                    Body.render('dir', {
                        'list': detail.list,
                        'item': item,
                        'root': detail.root,
                    });

                    Sidebar.render({ detail, item, });
                },

                'file': function ({ detail, item, }) {
                    meta.detail = detail;

                    Body.render('file', detail);
                    Sidebar.render({ detail, item, });
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
            'resize': function () {
                let w1 = Tree.$.outerWidth();
                let w2 = Sidebar.$.outerWidth();
                Body.resize(w1, w2, 6);
            },
        });



        Body.on({
            'outline': function (titles) {
                Sidebar.outline(titles);
            },
            'item': function (item) {
                Tree.open(item.name);
            },

            //path 发生变化时触发。
            'path': function (path) {
             
            },
        });

        Sidebar.on({
            'outline': function (item, index) {
                Body.outline(index);
            },

            'hide': function (w2) {
                let w1 = Tree.$.outerWidth();
                Body.resize(w1, w2, 6);
            },
        });

        Sidebar.on('operation', {
            'refresh': function () {
                API.get();
            },
            'delete': function () {
                API.delete(meta.item);
            },
            'open': function () {
                view.fire('open', [meta.detail.url]);
            },
            'edit': function () {
                view.fire('edit', [meta.item.id]);
            },
            'demo': function () {
                view.fire('demo', [meta.item.id]);
            },
        });

       
       
    });


    /**
    * 渲染内容。
    *   file: '',   //渲染完成后要打开的文件。
    */
    view.on('render', function (file) {
        let id = file || storage.get('id') || '/';

        meta.path = id; //避免 view.show 事件中再次实际执行。
        meta.item = { 'id': id, }; //使用完全重新的方式。
        API.get();

       
    });




});
