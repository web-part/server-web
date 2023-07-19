
define.panel('/FileList/Body/Main/List/Dir', function (require, module, panel) {
    const Filter = module.require('Filter');
    const GridView = module.require('GridView');
    const Data = module.require('Data');



    let meta = {
        item: null,
    };



    panel.on('init', function () {
       
        Filter.on({
            'change': function (filter) {
                let { item, } = meta;
                let keyword = filter.name;
                let list = Data.filter(item, filter);

                console.log({ list, });


                GridView.render(list, { keyword, item, });

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
    *   opt = {
    *       list:  [],  //文件列表。
    *       item: {},   //当前菜单项。
    *       root: '',   //根目录。
    *   };
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
