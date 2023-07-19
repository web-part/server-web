

define('MenuNav/Panel', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const $Icon = module.require('Icon');
    const $List = module.require('List');
    const $Text = module.require('Text');
    const Data = module.require('Data');


    return {
        create($meta) {
            const Icon = $Icon.create($meta);
            const List = $List.create($meta);
            const Text = $Text.create($meta);


            let panel = new Panel(`[data-panel="${$meta.id}"]`);


            let meta = {
                path: '',
                text: '',
                names: [],
            };


            panel.on('init', function () {

                List.on({
                    'item': function (index) {
                        let { names, } = meta;
                        panel.fire('item', [{ names, index, }]);
                    },

                    'text': function () {
                        List.hide();
                        Text.show();
                    },
                });

                Text.on({
                    'blur': function () {
                        List.show();
                        Text.hide();
                    },
                    'change': function (text) {
                        let values = panel.fire('text', [text]);

                        //外部明确返回了 false，则表示归位。
                        if (values.includes(false)) {
                            Text.render(meta.text);
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
            *       text: '',
            *   };
            */
            panel.on('render', function (opt) {
                let { path, text, icon, names, } = Data.parse(opt);
              
                meta.path = path;
                meta.text = text;
                meta.names = names;

                Icon.render(icon);
                List.render(names);
                Text.render(text);

                panel.$.toggleClass('no-icon', !icon);
                panel.fire('render', [opt]);

            });



            return panel.wrap({
                
            });

        },
    };

});