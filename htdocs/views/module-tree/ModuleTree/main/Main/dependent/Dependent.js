

define.panel('/ModuleTree/Main/Dependent', function (require, module, panel) {
    const Data = module.require('Data');
    const Tabs = module.require('Tabs');
    const Header = module.require('Header');
    const Outers = module.require('Outers');
    const List = module.require('List');


    panel.set('show', false);
    

    panel.on('init', function () {
        Tabs.on({
            'inner': function () { 
                List.show();
                Outers.hide();
            },

            'outer': function () { 
                List.hide();
                Outers.show();
            },
        });
       

        [List, Outers, ].forEach((M) => {
            M.on({
                'show': function (list) { 
                    Header.render(list);
                },
                'cmd': function (cmd, item) {
                    let value = item[cmd];      //cmd 为 `id`、`file`。
                    panel.fire(cmd, [value]);
                },
            });
        });
       
        

    });




    panel.on('render', function ({ item, stat, }) {
        let { publics, outers, } = Data.get({ item, stat, });

        List.render(publics);
        Outers.render(outers);
        Tabs.render();
        
        panel.show();
    });





});
