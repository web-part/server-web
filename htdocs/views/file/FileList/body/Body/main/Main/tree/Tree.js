

define.panel('/FileList/Body/Main/Tree', function (require, module, panel) {
    const Header = module.require('Header');
    const Main = module.require('Main');


    let meta = {
        item: null,
        dirOnly: true, //仅显示目录。
    };

    panel.on('init', function () {
      

        Header.on({
            'check': function (key$checked) {
                Main.check(key$checked);
            },
            'dirOnly': function (checked) { 
                meta.dirOnly = checked;
                Main.render(meta.item, checked);
            },
            'cmd': {
                'copy': function () {
                    Main.copy();
                },
            },
        });


        Main.on({
            'cmd': function (cmd, item) {
                panel.fire('cmd', cmd, [item,]);
            },
        });

    });




    panel.on('render', function (item) {
        if (item === meta.item) {
            panel.show();
            return;
        }

        console.log(item);

        meta.item = item;

        // Main.render(item, meta.dirOnly);

        Header.render({
            // 'file': false,
            'icon': false,
            'tab': true,
            'color': true,
            'hover': true,
            'dirOnly': meta.dirOnly,
        });
        

    });





});
