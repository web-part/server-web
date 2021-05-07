

define.panel('/ModuleTree/Tree', function (require, module, panel) {
    const Header = module.require('Header');
    const Main = module.require('Main');
    const Resizer = module.require('Resizer');

    const none = module.data.none;
 

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
        let minWidth = 220;

        Resizer.on({
            'change': function (dx) {
                let w = width + dx;

                if (w < minWidth) {
                    set(minWidth)
                    return;
                }

                set(w);

                panel.fire('resize', 'change', [dx, w]);
            },

            'stop': function () {
                width = get();
                panel.fire('resize', 'stop');
            },
        });
    });


    /**
    * 渲染。
    *   options = {
    *       dir$dirs: {},   //某个目录对应的子目录列表（仅当前层级，不包括子目录的）。
    *       dir$files: {},  //某个目录对应的文件列表（仅当前层级，不包括子目录的）。
    *   };
    */
    panel.on('render', function (options) {

        Header.render();
        Main.render(options);
        Resizer.render();
        
    });

    return {
        open: function (id, isMid) {

            //传进来的是模块 id，需要特殊处理一下。
            if (isMid) {
                if (id.startsWith('/')) {
                    let prefix = `/${none}`;

                    if (!id.startsWith(prefix)) {
                        id = `${prefix}${id}`;
                    }
                }
                else {
                    id = `/${id}`;
                }
            }

            Main.open(id);
        },
    };


});