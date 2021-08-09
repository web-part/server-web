

define('MenuNav/Panel', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const $Icon = module.require('Icon');
    const $List = module.require('List');
    const $Text = module.require('Text');


    return {
        create($meta) {
            const Icon = $Icon.create($meta);
            const List = $List.create($meta);
            const Text = $Text.create($meta);


            let panel = new Panel(`[data-panel="${$meta.id}"]`);


            let meta = {
                names: [],
                path: '',
            };


            panel.on('init', function () {

                List.on({
                    'item': function (index) {
                        let names = meta.names.slice(0, index + 1);
                        panel.fire('item', [names, index]);
                    },

                    'text': function () {
                        if (typeof meta.path == 'string') {
                            List.hide();
                            Text.show();
                        }
                    },
                });

                Text.on({
                    'blur': function () {
                        List.show();
                        Text.hide();
                    },
                    'change': function (path) {
                        let values = panel.fire('text', [path]);

                        //外部明确返回了 false，则表示归位。
                        if (values.includes(false)) {
                            Text.render(meta.path);
                        }
                    },
                });

            });


            /**
            * 渲染内容。
            *   opt = {
            *       names: [],
            *       path: '',
            *       icon: '',
            *   };
            */
            panel.on('render', function (opt) {
                let { names, path, icon, } = opt;

              
               
                meta.names = names;
                meta.path = path;

                Icon.render(icon);
                List.render(names);
             

                if (typeof path == 'string') {
                    Text.render(path);
                }

                panel.$.toggleClass('no-icon', !icon);
                panel.fire('render', [opt]);

            });

            return panel.wrap({
                
            });

        },
    };

});