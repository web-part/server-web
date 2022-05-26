

define.panel('/ModuleTree/Main/ModuleInfo/Base', function (require, module, panel) {

    let none = module.data.none;

    let meta = {
        item: null,
    };

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="item"]': function (event) {
                let item = meta.item.parent;
                panel.fire('item', [item]);
            },
        });

    });




    panel.on('render', function ({ item, stat, }) {
        let { module, parent, dependents = [], } = item.data;

        if (typeof dependents == 'string') {
            dependents = [dependents];
        }

        //这里要用全等。
        if (parent === '') {
            parent = none;
        }
        

        meta.item = item;
        
        panel.fill({
            'id': module.id || none,
            'name': module.name || none,
            'parent': parent || '',
            'method': module.method,
            'factory-type': module.factory.type,
            'dependents': dependents.length,
            'level': module.level,
        });

    });





});
