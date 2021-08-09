
define.panel('/FileList/Body/Main/List', function (require, module, panel) {
    const Tabs = module.require('Tabs');
    const File = module.require('File');
    const Dir = module.require('Dir');



    let meta = {
        opt: null,  //render() 中传进来的 opt。
    };

    panel.on('init', function () {

        Tabs.on({
            'file': function () {
                File.render(meta.opt);
                Dir.hide();
            },
            'dir': function () {
                File.hide();
                Dir.render(meta.opt);
            },
        });

        File.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

        Dir.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
        });

    });


    /**
    * 渲染内容。
    *   opt = {
    *       list:  [],  //文件列表。
    *       item: {},   //当前菜单项。
    *       root: '',   //根目录。
    *   };
    */
    panel.on('render', function (opt) {
        meta.opt = opt;

        Tabs.render();

    });




    return {
        
    };

});
