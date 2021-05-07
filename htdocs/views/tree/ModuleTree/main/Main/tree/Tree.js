

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
                panel.fire('cmd', [cmd, item,]);
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




    panel.on('render', function ({ item, stat, }, $view) {
        let { mid, } = item;
        let { ids, id$children, id$file, id$parents, } = stat.moduleStat;

        //根目录是没有 mid 的。
        if (typeof mid == 'string') {
            let children = id$children[mid];
            let parents = id$parents[mid];

            parents = parents.slice(0).reverse();//需要复制一份再反转，否则会影响原来的。
            ids = [...parents, mid, ...children,];
        }
        

        Main.render({
            id: mid,
            ids,
            id$file,
            $view,
        });
        

    });





});
