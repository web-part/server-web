

define.panel('/ModuleTree/Main/Dependent', function (require, module, panel) {
    const Header = module.require('Header');
    const List = module.require('List');

    panel.set('show', false);
    

    panel.on('init', function () {
       
        List.on({
            'cmd': function (cmd, item) {
                let value = item[cmd];      //cmd 为 `id`、`file`。
                panel.fire(cmd, [value]);
            },
        });
       
        

    });




    panel.on('render', function (opt) {

        Header.render(opt);
        List.render(opt);

        
        panel.show();
    });





});
