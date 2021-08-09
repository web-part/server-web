

define.panel('/ModuleTree/Main/List', function (require, module, panel) {
    const Header = module.require('Header');
    const Data = module.require('Data');
    const Filter = module.require('Filter');
    const GridView = module.require('GridView');

    panel.set('show', false);
    

    panel.on('init', function () {
       

        Filter.on({
            'change': function (opt) {
                let list = Data.filter(opt);
                GridView.render(list);
            },
        });

        GridView.on({
            'cmd': function (cmd, item) {
                let value = item[cmd];      //cmd 为 `id`、`file`。
                panel.fire(cmd, [value]);
            },
        });
        

    });




    panel.on('render', function (opt) {
        let data = Data.init(opt);

        console.log('==============', module.id, opt, data);

        Header.render();

        Filter.render(data);
        
        
        panel.show();
    });





});
