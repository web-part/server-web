

define.panel('/ModuleTree/Tree', function (require, module, panel) {
    const SidebarTree = require('SidebarTree');
    const Data = module.require('Data');
    const none = module.data.none;


    let tree = null;

    panel.on('init', function () {

        tree = new SidebarTree({
            'container': panel.$,
            'width': panel.$.width(),
            'dirIcon': {
                close: 'fas fa-file-alt',
                open: 'far fa-file-alt',
            },
            'fileIcon': 'fas fa-file',
        });

        tree.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
            'dir': function (item) {
                panel.fire('dir', [item]);
            },
            'resize': function () {
                let w = tree.$.outerWidth();

                panel.$.width(w);
                panel.fire('resize');
            },
        });


    });




    /**
    * 渲染。
    *   
    */
    panel.on('render', function (stat) {
        let list = Data.make(stat);


        tree.render(list);

    });


    return {
        open: function (id) {
            tree.open(id);
        },
    };


});