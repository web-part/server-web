

define.panel('/ModuleTree/Main/ModuleInfo/Publics', function (require, module, panel) {

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
        let { id$publics, id$file,  } = stat.moduleStat;
        let id = item.mid;
        let publics = id$publics[id] || [];

        if (!publics.length) {
            panel.hide();
            return;
        }


        let list = publics.map((id) => {
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
