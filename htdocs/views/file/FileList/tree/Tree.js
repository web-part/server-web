

define.panel('/FileList/Tree', function (require, module, panel) {
    const SidebarTree = require('SidebarTree');
    const Data = module.require('Data');

 
    let tree = null;

    panel.on('init', function () {
       
        tree = new SidebarTree({
            'container': panel.$,
            'width': panel.$.width(),
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
    *   opt = {
    *       dir$dirs: {},   //某个目录对应的子目录列表（仅当前层级，不包括子目录的）。
    *       dir$files: {},  //某个目录对应的文件列表（仅当前层级，不包括子目录的）。
    *   };
    */
    panel.on('render', function (opt) {
        let list = Data.make(opt);

        tree.render(list);
        
    });

    return {
        open: function (id) {
            tree.open(id);
        },
    };


});