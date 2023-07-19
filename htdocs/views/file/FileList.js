
define.view('/FileList', function (require, module, view) {
    const SessionStorage = require('@definejs/session-storage');
    const Clipboard = require('Clipboard');
    const API = module.require('API');
    const Tree = module.require('Tree');
    const Sidebar = module.require('Sidebar');
    const Body = module.require('Body');
    
    let storage = null;

    view.on('init', function () {

        storage = new SessionStorage(module.id);

        API.on('success', {
            'get': function (data, fromCache) {
                let id = storage.get('id') || '/';
                
                if (!fromCache) {
                    Tree.render(data); //这个渲染很费时。
                }

                Tree.open(id);
            },
            'delete': function (item) {
                storage.set('id', item.parent.id); 
                API.get(true);
            },
        });

        Tree.on({
            'item': function (item) {
                storage.set('id', item.id); 
                Body.render(item);
                Sidebar.render(item);
            },
            'resize': function (w1) {
                let w2 = Sidebar.$.outerWidth();
                Body.resize(w1, w2, 6);
            },
        });



        Body.on({
            'outlines': function (outlines) {
                Sidebar.outline(outlines);
            },
            'item': function (item) {
                Tree.open(item.id);
            },

            'path': function (path) {
                Tree.open(path);
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
                API.get(true);
            },
            'open': function (item) {
                view.fire('open', [item.id]);
            },
            'edit': function (item) {
                view.fire('edit', [item.id]);
            },
            'demo': function (item) {
                view.fire('demo', [item.id]);
            },

            'copy': function (item) {
                Clipboard.copy(item.data.content);
            },

            'delete': function (item) {
                API.delete(item);
            },
            
            'compile-less': function (item) {
                view.fire('compile-less', [item.data.content]);
            },
            'minify-js': function (item) {
                view.fire('minify-js', [item.data.content]);
            },
        });

       
       
    });


    /**
    * 渲染内容。
    *   id: '',   //渲染完成后要打开的文件。
    */
    view.on('render', function (id) {
        if (id) {
            storage.set('id', id);
        }

        API.get();
       

       
    });




});
