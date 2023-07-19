

define.panel('/FileList/Tree', function (require, module, panel) {
    const SidebarTree = require('SidebarTree');
    const Stat = module.require('Stat');
    const Data = module.require('Data');
 
    let tree = null;


    panel.on('init', function () {
       
        tree = new SidebarTree({
            'container': panel.$,
            'width': panel.$.width(),
        });

        tree.on({
            'item': function (item) {

                panel.fire('item', [item]);
            },
        
            'resize': function () {
                let w = tree.$.outerWidth();

                panel.$.width(w);
                panel.fire('resize', [w]);
            },
        });
       

    });


    /**
    * 渲染。
    */
    panel.on('render', function ({ dir, dir$info, file$info, dirs, files, }) {
        let list = Data.make({ dir, dirs, files, file$info, });

        tree.render(list);

        tree.each(function (item) {
            Stat.parse(item, { dir$info, file$info, });
        });

        
    });


    return {
        open(id) {
            tree.open(id);
        },
    };


});