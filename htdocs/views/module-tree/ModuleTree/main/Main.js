
define.panel('/ModuleTree/Main', function (require, module, panel) {
    const Nav = module.require('Nav');
    const Tabs = module.require('Tabs');

    const Stat = module.require('Stat');
    const Content = module.require('Content');
    const Dependent = module.require('Dependent');
    const FileInfo = module.require('FileInfo');
    const List = module.require('List');
    const ModuleInfo = module.require('ModuleInfo');
    const Tree = module.require('Tree');

    let meta = {
        item: null,
        stat: null,
    };

    

    panel.on('init', function () {
        let modules = { Stat, Content, Dependent, FileInfo, List, ModuleInfo, Tree, };

        Nav.on({
            'path': function (path) {
                panel.fire('path', [path]);
            },
        });
      

        Tabs.map(modules);

        Tabs.on({
            'change': function (M) {
                M.render(meta);
            },
        });


        Object.values(modules).forEach((M) => {
            M.on({
                'item': function (item) {
                    panel.fire('item', [item]);
                },
                'id': function (id) {
                    panel.fire('id', [id]);
                },
                'file': function (file) {
                    panel.fire('file', [file]);
                },
            });
        });


    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item, stat) {
        
        meta.item = item;
        meta.stat = stat;

        Nav.render(item);
        Tabs.render(item);

    });




    return {

        resize(...args) {
            let w = args.reduce(function (sum, value) {
                return sum + value;
            }, 0);

            panel.$.css({
                width: `calc(100% - ${w}px)`,
            });

        },
    };

});
