

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
            'id': function (id) {
                panel.fire('id', [id]);
            },
            'file': function (file) {
                panel.fire('file', [file]);
            },

            'render': function () {
                Header.render();
            },
        });

    });




    panel.on('render', function ({ item, stat, }) {

        Main.render(item);
        

    });





});
