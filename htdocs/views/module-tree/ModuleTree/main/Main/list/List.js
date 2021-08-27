

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

                console.log(opt)
                GridView.toggleFields(opt.field$checked);
            },
        });

        GridView.on({
            'cmd': function (cmd, value) {
                panel.fire(cmd, [value]);
            },
        });
        

    });




    panel.on('render', function (opt) {
        let data = Data.init(opt);
        let fields = GridView.fields;

        Header.render();
        Filter.render(data, fields);
        
        panel.show();
    });





});
