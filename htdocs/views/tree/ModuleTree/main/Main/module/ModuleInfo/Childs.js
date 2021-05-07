

define.panel('/ModuleTree/Main/ModuleInfo/Childs', function (require, module, panel) {

    const GridView = module.require('GridView');

    panel.set('show', false);


    panel.on('init', function () {
        
        GridView.on({
            'cmd': function (cmd, item) {
                panel.fire('cmd', [cmd, item]);
            },
        });

    });




    panel.on('render', function (data) {
        let { item, stat, } = data;
        let { id$childs, id$file, id$dependents,  } = stat.moduleStat;
        let id = item.mid;
        let childs = id$childs[id] || [];

        if (!childs.length) {
            panel.hide();
            return;
        }


        let list = childs.map((id) => {
            let file = id$file[id];
            let dependents = id$dependents[id];
            let used = typeof dependents == 'string';


            return {
                'id': id,
                'file': file,
                'used': used,
            };
        });

        
        GridView.render(list);
        panel.show();
    });





});
