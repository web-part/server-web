

define.panel('/ModuleTree/Main/ModuleInfo/Privates', function (require, module, panel) {

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
        let { id$privates, id$file,  } = stat.moduleStat;
        let id = item.mid;
        let privates = id$privates[id] || [];

        if (!privates.length) {
            panel.hide();
            return;
        }


        let mid = id;

        let list = privates.map((id) => {
            let sid = `${mid}/${id}`;
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
