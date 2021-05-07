

define.panel('/ModuleTree/Main/List', function (require, module, panel) {

    const GridView = module.require('GridView');

    panel.set('show', false);
    

    panel.on('init', function () {
        GridView.on({
            'cmd': function (cmd, item) {
                panel.fire('cmd', [cmd, item]);
            },
        });
        

    });




    panel.on('render', function ({ item, stat, }) {
        let { mid, } = item;
        let { ids, id$file, id$dependents, id$children, } = stat.moduleStat;
        
        if (typeof mid == 'string') {
            let children = id$children[mid];
            ids = [mid, ...children,];
        }


        let list = ids.map((id) => {
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
