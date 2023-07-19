

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




    panel.on('render', function ({ item, }) {
   
        meta.item = item;

        let { module, } = item.data;
        let { id, parent, name, method, factory, dependents, level, } = module;

        
        if (parent === '') {
            parent = none;
        }


        panel.fill({
            'id': id || none,
            'name': name || none,
            'parent': parent || '',
            'method': method,
            'factory': factory.type,
            'dependents': dependents.length,
            'level': level,
        });

    });





});
