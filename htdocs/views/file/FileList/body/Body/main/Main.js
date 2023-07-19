define.panel('/FileList/Body/Main', function (require, module, panel) {
    const Tabs = module.require('Tabs');
    const Stat = module.require('Stat'); 
    const Tree = module.require('Tree');
    const List = module.require('List');
    const Icon = module.require('Icon');


    let meta = {
        item: null,
    };



    panel.on('init', function () {
        Tabs.map({ Stat, Tree, List, Icon, });

        Tabs.on({
            'change': function (M) {
                M.render(meta.item);
            },
        });


        List.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Icon.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Tree.on('cmd', {
            'key': function (item) {
                panel.fire('item', [item.data.item]);
            },
        })


    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        meta.item = item;

        Tabs.render();

    });





    return {

    };

});
