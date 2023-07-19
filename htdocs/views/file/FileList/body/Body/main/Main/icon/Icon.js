
define.panel('/FileList/Body/Main/Icon', function (require, module, panel) {

    const List = module.require('List');


    let meta = {
        item: null,
    };


    panel.on('init', function () {
       
        List.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });
    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        if (item === meta.item) {
            panel.show();
            return;
        }

        meta.item = item;
        List.render(item.list);

    });




    return {
        
    };

});
