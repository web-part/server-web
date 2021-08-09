
define.panel('/HtmlTree/Main/Nav', function (require, module, panel) {
    const MenuNav = require('MenuNav');
    const Data = module.require('Data');


    let nav = null;



    let meta = {
        list: [],
        item: null,
        stat: null,
    };


    panel.on('init', function () {

        nav = new MenuNav({
            'container': panel.$,
        });

        nav.on({
            'item': function (names, index) {
                let item = meta.list[index];
                panel.fire('item', [item]);
            },
        });





    });


    /**
    * 渲染内容。
    *   opt = {
    *       
    *   };
    */
    panel.on('render', function (item) {
        
        let { list, names, path, icon, } = Data.make(item);

       
        meta.list = list;


        nav.render({ names, path, icon, });
    });




});
