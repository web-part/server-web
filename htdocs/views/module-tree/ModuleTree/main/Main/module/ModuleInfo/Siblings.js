

define.panel('/ModuleTree/Main/ModuleInfo/Siblings', function (require, module, panel) {

    const GridView = module.require('GridView');

    panel.set('show', false);


    panel.on('init', function () {
        
        GridView.on({
            'cmd': function (cmd, item) {
                let value = item[cmd];      //cmd 为 `id`、`file`。
                panel.fire(cmd, [value]);
            },
        });


    });




    panel.on('render', function ({ item, stat, }) {
        let { id$file, } = stat.moduleStat;
        let { siblings = [], } = item.data;


        let list = siblings.map((id) => {
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
