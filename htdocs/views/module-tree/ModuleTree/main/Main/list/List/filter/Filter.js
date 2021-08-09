
define.panel('/ModuleTree/Main/List/Filter', function (require, module, panel) {
    const ChildDependents = module.require('ChildDependents');
    const Dependents = module.require('Dependents');
    const Levels = module.require('Levels');
    const Methods = module.require('Methods');

    let meta = {
        childDependent$checked: null,
        dependent$checked: null,
        level$checked: null,
        method$checked: null,
    };

    panel.on('init', function () {

        function make(list) {
            let key$checked = {};

            list.forEach((item) => {
                key$checked[item.value] = item.checked;
            });

            return key$checked;
        }

        ChildDependents.on({
            'check': function (list) {
                meta.childDependent$checked = make(list);
                panel.fire('change', [meta]);
            },
        });

        Dependents.on({
            'check': function (list) {
                meta.dependent$checked = make(list);
                panel.fire('change', [meta]);
            },
        });

        Levels.on({
            'check': function (list) {
                meta.level$checked = make(list);
                panel.fire('change', [meta]);
            },
        });


        Methods.on({
            'check': function (list) {
                meta.method$checked = make(list);
                panel.fire('change', [meta]);
            },
        });

        
  
    });



    panel.on('render', function (data) {
        
        ChildDependents.render();
        Dependents.render();
        Levels.render(data.levels);
        Methods.render(data.methods);

        panel.fire('change', [meta]);

    });

    

    return {
        
        
    };






});
