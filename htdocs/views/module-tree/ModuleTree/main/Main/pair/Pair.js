

define.panel('/ModuleTree/Main/Pair', function (require, module, panel) {
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
            'cmd': function (cmd, value) {
                panel.fire(cmd, [value]);
            },
        });
        

    });




    panel.on('render', function (opt) {
        
        Data.init(opt);

        Header.render();
        Filter.render();
        
        panel.show();
    });





});
