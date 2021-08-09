

define.panel('/FileList/Body/Main/Tree', function (require, module, panel) {
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
                panel.fire('cmd', cmd, [item,]);
            },

            'render': function () {
                Header.render({
                    // 'file': false,
                    'icon': false,
                    'tab': true,
                    'color': true,
                    'hover': false,
                });
            },
        });

    });




    panel.on('render', function (opt) {
        let { item, list, root, } = opt;

        
        list = list.map((item) => {
            let id = root + item.name;
            return {id,};
        });

        //要把当前节点向上所有的父节点都加进来。
        let id = item.id == '/' ? root : root + item.id;
        let names = id.split('/');

        let parents = names.map((name, index) => {
            let id = names.slice(0, index + 1).join('/');
            return {id,};
        });

        list = [...parents, ...list,];
        

        Main.render({
            'id': id,
            'list': list,
        });
        

    });





});
