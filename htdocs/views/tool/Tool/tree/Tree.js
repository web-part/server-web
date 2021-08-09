

define.panel('/Tool/Tree', function (require, module, panel) {
    const SidebarTree = require('SidebarTree');
    const Data = module.require('Data');

 
    let tree = null;

    panel.on('init', function () {
       
        tree = new SidebarTree({
            'container': panel.$,
            'width': panel.$.width(),
            'header': false,
            'resizer': false,
        });

        tree.on({
            'item': function (...args) {

                panel.fire('item', args);
            },
            'dir': function (...args) {
                panel.fire('dir', args);
            },
            'resize': function (...args) {
                let w = tree.$.outerWidth();

                panel.$.width(w);
                panel.fire('resize', args);
            },
        });
       

    });

   


    /**
    * 渲染。
    */
    panel.on('render', function () {
        let list = Data.make();

        tree.render(list);
        
    });

    return {
        open: function (id) {
            tree.open(id);
        },
    };


});