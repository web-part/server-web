

define.panel('/ModuleTree/Main/ModuleInfo/Dependents', function (require, module, panel) {

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
        let { id$dependents, id$file,  } = stat.moduleStat;
        let id = item.mid;
        let dependents = id$dependents[id];

        if (!dependents) {
            panel.hide();
            return;
        }


        if (!Array.isArray(dependents)) {
            dependents = [dependents];
        }

        let list = dependents.map((id) => {
            let file = id$file[id];

            return {
                'id': id,
                'file': file,
            };
        });

        
        GridView.render(list);
        panel.show();
    });





});
