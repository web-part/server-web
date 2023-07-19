
define.panel('/FileList/Body/Main/List/File', function (require, module, panel) {
    const Filter = module.require('Filter');
    const GridView = module.require('GridView');
    const Data = module.require('Data');



    let meta = {
        item: null,
    };



    panel.on('init', function () {
       
        Filter.on({
            'change': function (filter) {
                let keyword = filter.name;
                let { list, isRepeatMode, } = Data.filter(meta.item, filter);

                GridView.render(list, { keyword, isRepeatMode, });

            },
        });

        GridView.on({
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
        Filter.render(item);


    });




    return {
        
    };

});
