

define.panel('/ModuleTree/Main/ModuleInfo/Children', function (require, module, panel) {

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
        let { id$children, id$file, id$dependents, } = stat.moduleStat;
        let id = item.mid;
        let children = id$children[id] || [];

        if (!children.length) {
            panel.hide();
            return;
        }


        let list = children.map((id) => {
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
