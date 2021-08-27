
define.panel('/ModuleTree/Main', function (require, module, panel) {
    const Nav = module.require('Nav');
    const Tabs = module.require('Tabs');
    const Content = module.require('Content');
    const FileInfo = module.require('FileInfo');
    const ModuleInfo = module.require('ModuleInfo');
    const Tree = module.require('Tree');
    const List = module.require('List');
    const Dependent = module.require('Dependent');
    const Pair = module.require('Pair');

    let meta = {
        item: null,
        stat: null,
    };

    panel.on('init', function () {
        Nav.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Tabs.map({
            'module': ModuleInfo,
            'file': FileInfo,
            'content': Content,
            'tree': Tree,
            'list': List,
            'dependent': Dependent,
            'pair': Pair,
        });

        Tabs.on({
            'change': function (M) {
                M.render(meta);
            },
        });



        [ModuleInfo, FileInfo, Tree, List, Dependent, Content, Pair, ].forEach((M) => {

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
    *   opt = {
    *       item: {},   //当前菜单项。
    *       stat: {},   //
    *   };
    */
    panel.on('render', function (opt) {
        let item = meta.item = opt.item;
        let isRoot = !item.parent;

        meta.stat = opt.stat;

        Nav.render(opt);

        Tabs.render(isRoot);

    });




    return {
        

        resize(...args) {
            let w = args.reduce(function (sum, value) {
                return sum + value;
            }, 0);


            let calc = 'calc(100% - ' + w + 'px)';

            panel.$.css({
                'width': calc,
            });

        },
    };

});
