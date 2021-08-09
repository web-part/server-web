
define.panel('/FileList/Body/Main/List/Dir', function (require, module, panel) {
    const Filter = module.require('Filter');
    const GridView = module.require('GridView');
    const Data = module.require('Data');



    let meta = {
        'root': '',
        'item': null,
    };



    panel.on('init', function () {
       
        Filter.on({
            'change': function (filter) {
                
                filter = Object.assign({}, filter, {
                    'cwd': filter.cwd ? meta.item.id : '',
                });


                let list = Data.filter(filter);

                GridView.render(list, {
                    'keyword': filter.name,
                    'root': meta.root,
                });

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
    panel.on('render', function (opt) {
        if (opt.item === meta.item) {
            panel.show();
            return;
        }

        
        meta.item = opt.item;
        meta.root = opt.root;

        Data.init(opt.list);
        Filter.render(opt.item);


    });




    return {
        
    };

});
