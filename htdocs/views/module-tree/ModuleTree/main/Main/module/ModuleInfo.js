

define.panel('/ModuleTree/Main/ModuleInfo', function (require, module, panel) {
    const Base = module.require('Base');


    const Groups = module.require('Groups');


    panel.on('init', function () {
        [Base, Groups,].forEach((M) => {
            M.on({
                'item': function (item) {
                    panel.fire('item', [item]);
                },
                'id': function (id) {
                    panel.fire('id', [id]);
                },
                'file': function (file) {
                    panel.fire('file', [file]);
                },
            });
        });

    });




    panel.on('render', function ({ item, stat, }) {
        Base.render({ item, stat, });

        Groups.render({ item, stat, });;


    });





});
