
define.panel('/ModuleTree/Main/Nav', function (require, module, panel) {
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

            'text': function (id) {
                if (id == '/') {
                    panel.fire('item', [{ id, }]);
                    return;
                }

                let item = meta.stat.moduleStat.id$module[id];

                if (!item) {
                    return false; //归位。
                }
                
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
    panel.on('render', function ({ item, stat, }) {
        let { list, names, path, icon, } = Data.make(item);

        meta.item = item;
        meta.stat = stat;
        meta.list = list;

        
        nav.render({ names, path, icon, });
    });



});
