﻿

define.panel('/Master', function (require, module, panel) {
    const Sidebar = module.require('Sidebar');
    const PageTabs = module.require('PageTabs');
    const PageList = module.require('PageList');
    const Views = module.require('Views');



    panel.on('init', function () {
        Sidebar.on({
            'render': function (list) {
                PageTabs.render();
            },

            'item': function (item) {
                let index = PageTabs.open(item);
                PageList.active(index);


                // Views.open(item.view, {
                //     'title': item.name,
                //     'id': item.id,
                //     'render': true,
                // });
            },

            'toggle': function (visible) {
                panel.$.toggleClass('hide', !visible);
            },

        });

        PageTabs.on({
            'render': function (list) {
                PageList.render(list);
            },
            'active': function (item, index) {
               
                Sidebar.active(item);
                PageList.active(index);

                Views.open(item.view, {
                    'title': item.name,
                    'id': item.id,
                });
            },
            'ready': function () {
                setTimeout(function () {
                    panel.fire('ready');
                }, 100);
            },
            //关闭前触发。
            'close': function (item, index) {
                return Views.close(item.view, [index]);
            },
        });

        PageList.on({
            'render': function (list) {
                
            },
            'active': function (item, index) {
                Sidebar.active(item);
                PageTabs.active(index);
                Views.open(item.view, {
                    'title': item.name,
                    'id': item.id,
                });
            },

            'clear': function () {
                PageTabs.clear();
            },

            'refresh': function () {
                Views.refresh();
            },

            'close': function (item, index) {
                PageTabs.close(index);
            },
        });



        Views.on({
            'require': function (name) {
                let values = panel.fire('require', [name]);
                return values[0];
            },

            //当前视图确实要关闭时触发。
            'close': function () {
                PageTabs.close(...arguments);
                //PageList.close(...arguments);
            },

            '404': function (options) {
                Views.open('404', {
                    'args': [options.title],
                    'render': true,
                    'title': '404-' + options.title,
                });
            },

            'error': function (opt, ex) {
                Views.open('Error', {
                    'args': [opt, ex],
                    'render': true,
                    'title': 'error-' + opt.title,
                });
            },

            'active': function (options) {
                document.title = options.title;
            },

            'title': function (id, title) {
                PageTabs.set(id, title);
            },

            'fullscreen': function () {
                panel.$.toggleClass('fullscreen');
            },
        });

    });


    /**
    *
    */
    panel.on('render', function () {
        Sidebar.render();
    });


    //让 panel 先 show 出来再触发外界绑定的 render 事件。
    panel.on('after-render', function () {
        panel.fire('render');

    });

    return {

        open: function (view, name, args) {
            // debugger

            //重载 open(view, args); 未指定页签标题的情况。
            if (Array.isArray(name)) {
                args = name;
                name = '';
            }

            let item = { 'view': view };
            let sitem = Sidebar.get(view);

            //尝试根据 view 从菜单栏中查找，看能否对得上。
            if (sitem) {
                item = Object.assign({}, sitem);
                Sidebar.active(sitem);
            }

            item.name = name || item.name || view;
            item.id = item.id || view;

            let index = PageTabs.open(item);
            PageList.active(index);


            Views.open(view, {
                'args': args,
                'render': true,
                'title': item.name,
                'id': item.id,
            });
        },

        close: function () {
            //todo
        },

        refresh: function (view) {
            Views.refresh(...arguments);
        },

    };


});