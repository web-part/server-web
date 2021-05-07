

define.panel('{MenuTreeSidebar.id}/Header', function (require, module, panel) {

    panel.on('init', function () {
        let dirOnly = false;


        panel.$.on('click', '[data-cmd]', function () {
            let cmd = this.getAttribute('data-cmd');

            if (cmd == 'dir-only') {
                dirOnly = !dirOnly;
                panel.$.find('i').toggleClass('checked', dirOnly);
                panel.fire('dir-only', [dirOnly]);
            }
            else {
                panel.fire(cmd);
            }

        });
        
    });


    /**
    * 渲染。
    *   options = {
    *       
    *   };
    */
    panel.on('render', function (options) {
        options = options || {};

        panel.$.toggleClass('back', !!options.back);
        panel.$.toggleClass('forward', !!options.forward);
        panel.$.toggleClass('up', !!options.up);
        panel.$.toggleClass('root', !!options.root);
        panel.$.toggleClass('dir-only', !!options.dirOnly);
        
    });

   


});