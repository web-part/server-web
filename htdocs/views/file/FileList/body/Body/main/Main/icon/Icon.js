
define.panel('/FileList/Body/Main/Icon', function (require, module, panel) {

    const List = module.require('List');




    panel.on('init', function () {
       
        List.on({
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

        List.render(opt.item.list);

    });




    return {
        
    };

});
