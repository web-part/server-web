
define.panel('/FileList/Body/Nav', function (require, module, panel) {
    const MenuNav = require('MenuNav');
    const Data = module.require('Data');



    let nav = null;

    let meta = {
        root: '',
    };


    panel.on('init', function () {
        
        nav = new MenuNav({
            'container': panel.$,
        });

        nav.on({
            'item': function (names, index) {
                console.log(index, names)

                let name = names.slice(1).join('/');
                let item = { 'name': `/${name}`, };
                
                panel.fire('item', [item]);
            },

            'text': function (path) {
                if (!path.startsWith(meta.root)) {
                    return false;
                }

                if (path.endsWith('/')) {
                    path = path.slice(0, -1);
                }

                let name = path.slice(meta.root.length);
                let item = { 'name': `/${name}`, };

                panel.fire('item', [item]);

            },

            'render': function (path) {
                panel.fire('render', [path]);
            },
        });
    });


    /**
    * 渲染内容。
    *   opt = {
    * 
    *   };
    */
    panel.on('render', function (data) {
        meta.root = data.root;

        data = Data.make(data);
        nav.render(data);

    });



});
