

define('SidebarTree/Panel', function (require, module, exports) {
    const Panel = require('@definejs/panel');
    const $Header = module.require('Header');
    const $Main = module.require('Main');
    const $Resizer = module.require('Resizer');


    return {
        create($meta) {
            const Header = $Header.create($meta);
            const Main = $Main.create($meta);
            const Resizer = $Resizer.create($meta);


            let panel = new Panel(`[data-panel="${$meta.id}"]`);

            panel.on('init', function () {
                Main.on({
                    'item': function (item, status) {
                        panel.fire('item', [item]);

                        Header.render(status);

                    },

                    'dir': function (item) {
                        panel.fire('dir', [item]);
                    },

                    'file': function (item) {
                        panel.fire('dir', [item]);
                    },

                    'fill': {
                        'name': function (item) {
                            let names = panel.fire('fill', 'name', [item]);
                            return names.slice(-1)[0];
                        },
                    },
                });

                Header.on({
                    'back': function () {
                        Main.back();
                    },
                    'forward': function () {
                        Main.forward();
                    },
                    'up': function () {
                        Main.up();
                    },
                    'root': function () {
                        Main.root();
                    },
                    'dir-only': function (sw) {
                        Main.dirOnly(sw);
                    },
                });



            });

            panel.on('init', function () {
                function get() {
                    let width = panel.$.outerWidth();
                    return width;
                }

                function set(width) {
                    panel.$.outerWidth(width);
                }

                let width = get();

                Resizer.on({
                    'change': function (dx) {
                        let w = width + dx;

                        if (w < $meta.minWidth) {
                            set($meta.minWidth)
                            return;
                        }

                        set(w);

                        panel.fire('resize');
                    },

                    'stop': function () {
                        width = get();
                    },
                });
            });


            /**
            * 渲染。
            */
            panel.on('render', function (list) {
                Header.render();
                Main.render(list);
                Resizer.render();


                if ($meta.header) {
                    Header.show();
                }

                if ($meta.resizer) {
                    Resizer.show();
                }
               


            });

            return panel.wrap( {
                open: function (id) {
                    Main.open(id);
                },
            });

        },
    };

});