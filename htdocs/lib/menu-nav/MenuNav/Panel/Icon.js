
define.panel('MenuNav/Panel/Icon', function (require, module, panel) {
    const Panel = require('@definejs/panel');
    const File = require('File');

    


    return {
        create($meta) {
            let panel = new Panel(`[data-panel="${$meta.id}/Icon"]`);


            panel.on('init', function () {

            });


            /**
            * 渲染内容。
            */
            panel.on('render', function (icon) {
                let html = icon;

                if (icon && typeof icon == 'object') {
                    icon = File.getIcon(icon);
                    html = icon.html;
                }

                panel.$.html(html);


            });

            return panel.wrap({

            });
        },
    };




});
