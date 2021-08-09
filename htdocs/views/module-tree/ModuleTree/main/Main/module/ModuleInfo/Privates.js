

define.panel('/ModuleTree/Main/ModuleInfo/Privates', function (require, module, panel) {

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
        let { id, privates = [], } = item.data;



        let list = privates.map((itemId) => {
            let sid = `${id}/${itemId}`;
            let file = id$file[sid];

            return {
                'id': sid,
                'file': file,
            };
        });

        
        GridView.render(list);
        panel.show();
    });





});
