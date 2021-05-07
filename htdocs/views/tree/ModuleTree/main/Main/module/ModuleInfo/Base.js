

define.panel('/ModuleTree/Main/ModuleInfo/Base', function (require, module, panel) {

    let none = module.data.none;

    let meta = {
        parent: '', //点击跳转到父模块时用到。
    };

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd]': function (event) {
                let cmd = event.target.dataset.cmd;
                let item = { 'id': meta.parent, };

                panel.fire('cmd', [cmd, item]);
            },
        })

    });




    panel.on('render', function (data) {
        let { item, stat, } = data;
        let { id$module, id$parent, } = stat.moduleStat;
        let id = item.mid;
        let module = id$module[id];
        let parent = id$parent[id];

        //这里要用全等。
        if (parent === '') {
            parent = none;
        }
        

        meta.parent = parent;
        
        panel.fill({
            'id': module.id,
            'name': module.name,
            'parent': parent || '',
            'method': module.method,
            'factory-type': module.factory.type,

        });

    });





});
