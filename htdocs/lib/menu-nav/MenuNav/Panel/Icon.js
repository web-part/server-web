
define.panel('MenuNav/Panel/Icon', function (require, module, panel) {
    const Panel = require('@definejs/panel');
  

    


    return {
        create($meta) {
            let panel = new Panel(`[data-panel="${$meta.id}/Icon"]`);

            panel.on('init', function () {

            });


            /**
            * 渲染内容。
            */
            panel.on('render', function (icon) {
                panel.$.html(icon.html);

            });


            
            return panel.wrap({

            });
        },
    };




});
