
define.panel('/ModuleTree/Main', function (require, module, panel) {
    const Tabs = module.require('Tabs');
    const MarkDoc = module.require('MarkDoc');
    const FileInfo = module.require('FileInfo');
    const ModuleInfo = module.require('ModuleInfo');
    const Tree = module.require('Tree');
    const List = module.require('List');

    let meta = {
        item: null,
        stat: null,
    };

    panel.on('init', function () {
       
        Tabs.on({
            'module': function () {
                ModuleInfo.render(meta);
                FileInfo.hide();
                MarkDoc.hide();
                Tree.hide();
                List.hide();
            },
            'file': function () {
                ModuleInfo.hide();
                FileInfo.render(meta);
                MarkDoc.hide();
                Tree.hide();
                List.hide();
            },

            'content': function () {
                ModuleInfo.hide();
                FileInfo.hide();
                MarkDoc.render(meta);
                Tree.hide();
                List.hide();
            },

            'tree': function () {
                ModuleInfo.hide();
                FileInfo.hide();
                MarkDoc.hide();
                Tree.render(meta, panel.$);
                List.hide();
            },

            'list': function () {
                ModuleInfo.hide();
                FileInfo.hide();
                MarkDoc.hide();
                Tree.hide();
                List.render(meta);
            },

        });

        FileInfo.on('cmd', function (cmd, item) {
            panel.fire('cmd', [cmd, item]);
        });
        
        ModuleInfo.on('cmd', function (cmd, item) {
            panel.fire('cmd', [cmd, item]);
        });

        Tree.on('cmd', function (cmd, item) {
            panel.fire('cmd', [cmd, item]);
        });

        List.on('cmd', function (cmd, item) {
            panel.fire('cmd', [cmd, item]);
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
        meta.item = opt.item;
        meta.stat = opt.stat;

        let isRoot = meta.item.mid === undefined;

        Tabs.render(isRoot);

    });




    return {
        resize: function (dx, width) {
            let calc = `calc(100% - ${width}px)`;

            panel.$.css({
                'width': calc,
            });
           
        },
    };

});
