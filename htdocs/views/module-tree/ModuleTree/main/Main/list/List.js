

define.panel('/ModuleTree/Main/List', function (require, module, panel) {
    const Header = module.require('Header');
    const Data = module.require('Data');
    const Filter = module.require('Filter');
    const GridView = module.require('GridView');

    panel.set('show', false);
    

    panel.on('init', function () {
       

        Filter.on({
            'change': function (filter) {
                let { keyword, } = filter;
                let list = Data.filter(filter);

                Header.render(list);
                GridView.render(list, { keyword, });

                // GridView.toggleFields(opt.field$checked);
            },
        });

        GridView.on({
            'cmd': function (cmd, value) {
                panel.fire(cmd, [value]);
            },
        });
        

    });




    panel.on('render', function ({ item, stat, }) {
        let data = Data.init({ item, stat, });
        let fields = GridView.fields;

       
        Filter.render(data, fields);
        
        panel.show();
    });





});
