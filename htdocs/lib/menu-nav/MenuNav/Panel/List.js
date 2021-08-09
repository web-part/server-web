
define.panel('MenuNav/Panel/List', function (require, module, panel) {
    const Panel = require('@definejs/panel');


    
    return {
        create($meta) {
            
            let panel = new Panel(`[data-panel="${$meta.id}/List"]`);

            panel.on('init', function () {

                panel.$on('click', {
                    '[data-index]': function (event) {
                        let index = +this.dataset.index;

                        panel.fire('item', [index]);

                        event.stopPropagation();
                    },
                });

                panel.$.on('click', function (event) {
                    panel.fire('text', []);
                });




            });


            /**
            * 渲染内容。
         
            */
            panel.on('render', function (list) {

                let html = $meta.tpl.fill('item', list);
               
                panel.$.html(html);

            });

            return panel.wrap({

            });

        },
    };


});
