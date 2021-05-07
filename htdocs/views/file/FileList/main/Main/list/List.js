
define.panel('/FileList/Main/List', function (require, module, panel) {
    const Filter = module.require('Filter');
    const GridView = module.require('GridView');
    const List = module.require('List');

 


    let meta = {
        'root': '',
        'list': [],
        'item': null,
    };



    panel.on('init', function () {
       
        Filter.on({
            'change': function (filter) {
                let id = filter.dir ? meta.item.id : false;

                filter = Object.assign({}, filter, {
                    'dir': id,
                });


                items = List.filter(meta.list, filter);

                GridView.render(items, {
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
        let list = meta.list = opt.list;
        let types = List.getTypes(list);

        meta.item = opt.item;
        meta.root = opt.root;
        Filter.render(types);


    });




    return {
        
    };

});
