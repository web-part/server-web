
define.panel('/FileList/Body/Nav', function (require, module, panel) {
    const MenuNav = require('MenuNav');


    let nav = null;


    panel.on('init', function () {
        nav = new MenuNav({
            'container': panel.$,
        });

        nav.on({
            'item': function ({ names, index, }) {
                console.log({ index, names, });

                let path = names.slice(1, index + 1).join('/');

                //不是最后一级，说明是一个目录。
                if (index < names.length - 1) {
                    path += '/';
                }
              
                panel.fire('path', [path]);
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
        let { id, parents, name, } = item;
        let root = parents.slice(-1)[0];
        let path = root ? `${root.name}/${id}` : `${name}/`;
        let text = id;


        nav.render({ path, text, });

    });



});
