

define.panel('/ModuleTree/Main/ModuleInfo', function (require, module, panel) {
    const Base = module.require('Base');
    const Childs = module.require('Childs');
    const Children = module.require('Children');
    const Siblings = module.require('Siblings');
    const Publics = module.require('Publics');
    const Privates = module.require('Privates');
    const Dependents = module.require('Dependents');


    panel.on('init', function () {
        [
            Base,
            Childs,
            Children,
            Siblings,
            Publics,
            Privates,
            Dependents,
            
        ].forEach((M) => {
            M.on({
                'cmd': function (cmd, item) {
                    panel.fire('cmd', [cmd, item]);
                },
            });
        });

    });




    panel.on('render', function (data) {
        Base.render(data);
        // Childs.render(data);
        // Children.render(data);
        Siblings.render(data);
        Publics.render(data);
        Privates.render(data);
        Dependents.render(data);
    });





});
