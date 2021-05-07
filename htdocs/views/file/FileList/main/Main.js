
define.panel('/FileList/Main', function (require, module, panel) {
    const Tabs = module.require('Tabs');
    const Tree = module.require('Tree');
    const List = module.require('List');

 


    let meta = {
        'root': '',
        'list': [],
        'item': null,
    };



    panel.on('init', function () {
        Tabs.on({
            'tree': function () {
                Tree.render(meta, panel.$);
                List.hide();
            },

            'list': function () {
                Tree.hide();
                List.render(meta);
            },

        });

        List.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Tree.on('cmd', {
            'id': function (item) {
                let name = item.id.slice(meta.root.length);

                panel.fire('item', [{
                    'name': name,
                }]);
            },
        })
        

    });


    /**
    * 渲染内容。
    *   opt = {
    *       list:  [],  //文件列表。
    *       item: {},   //当前菜单项。
    *       root: '',   //根目录。
    *   };
    */
    panel.on('render', function (opt) {
        let root = opt.root;

        if (root.endsWith('/')) {
            root = root.slice(0, -1); //去掉后缀 `/`。
        }

        meta.root = root;
        meta.list = opt.list;
        meta.item = opt.item;

        Tabs.render();

    });



    let width = 638;

    return {
        resize: function (dx) {
            if (dx === true) {
                width = panel.$.get(0).style.width;
                width = width.slice(12, -3);
                width = Number(width);
                return;
            }


            let w = width + dx;
            let calc = 'calc(100% - ' + w + 'px)';

            panel.$.css({
                'width': calc,
            });
           
        },
    };

});
