

define.panel('/ModuleTree/Main/Tree', function (require, module, panel) {
    const Header = module.require('Header');
    const Main = module.require('Main');



    panel.on('init', function () {
        Header.on('check', function (opt) {
            Main.check(opt);
        });

        Header.on('cmd', {
            'copy' : function () {
                Main.copy();
            },
        });


        Main.on({
            'cmd': function (cmd, item) {
                let value = item[cmd];      //cmd 为 `id`、`file`。
                panel.fire(cmd, [value]);
            },

            'render': function () {
                Header.render({
                    'secondary': false,
                    'icon': false,
                    'tab': true,
                    'color': true,
                    'hover': false,
                });
            },
        });

    });




    panel.on('render', function ({ item, stat, }) {
        let { id, parents, children, } = item.data;
        let { ids,  id$file, } = stat.moduleStat;

        //针对非根节点。
        if (item.parent) {
            parents = parents.slice(0).reverse();//需要复制一份再反转，否则会影响原来的。
            ids = [...parents, id, ...children,];
        }
        

        Main.render({
            id,
            ids,
            id$file,
        });
        

    });





});
