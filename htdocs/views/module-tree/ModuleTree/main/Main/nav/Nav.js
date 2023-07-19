
define.panel('/ModuleTree/Main/Nav', function (require, module, panel) {
    const MenuNav = require('MenuNav');


    let meta = {
        item: null,
    };

    let nav = null;



    panel.on('init', function () {
        nav = new MenuNav({
            'container': panel.$,
        });

        nav.on({
            'item': function ({ names, index, }) {
                console.log({ index, names, });

                let parents = meta.item.parents.slice(0).reverse(); //复制一份再反转。
                let target = parents[index];
                let { id, } = target.data;

                panel.fire('path', [id]);
            },

            'text': function (text) {
                panel.fire('path', [text]);
            },
        });
    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        let { id, parents, name, data, } = item;
        let root = parents.slice(-1)[0];
        let path = root ? `${root.name}/${id}` : `${name}/`;
        let text = data.id;

        meta.item = item;

        nav.render({ path, text, });

    });



});
