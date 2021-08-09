

define.panel('/Master', function (require, module, panel) {
    const Sidebar = module.require('Sidebar');
    const Container = module.require('Container');
    const PageTabs = module.require('PageTabs');
    const PageList = module.require('PageList');
    const Views = module.require('Views');


  
    let meta = {
        rendered: false,
        view: '', //记录在 Sidebar 就绪后要进一步打开的视图。
    };

    function open(view) {
        if (!view) {
            return;
        }

        console.log(view);

        let item = Sidebar.active(view);

        PageTabs.open(item);
        PageList.open(item);
        Views.render(item);
    }


    panel.on('init', function () {
        Sidebar.on({
            'render': function (list) {
                let home = list[0].view;
                PageTabs.render();
                PageList.render();


                open(home);

                if (meta.view != home.view) {
                    open(meta.view);
                    meta.view = '';
                }

                panel.fire('ready');
            },

            'item': function (item) {
                location.hash = '#' + item.view;
            },

            'refresh': function (item) {
                Views.refresh();
            },

            'toggle': function (visible) {
                panel.$.toggleClass('hide', !visible);
            },

        });

        PageTabs.on({
            'active': function (item, index) {
                location.hash = '#' + item.view;
            },
            //主动关闭前触发。
            'before-close': function (item, index) {
                return Views.close(item.view, [index]);
            },

            //主动关闭后触发。
            'after-close': function (item, index) {
                PageList.close(item.id);
            },
        });

        PageList.on({
            'active': function (item, index) {
                location.hash = '#' + item.view;
            },
            //关闭前触发。
            'before-close': function (item, index) {
                return Views.close(item.view, [index]);
            },

            'after-close': function (item, index) {
                PageTabs.close(item.id);
            },

            'refresh': function () {
                Views.refresh();
            },

        });

        Views.on({
            'require': function (name) {
                let values = panel.fire('require', [name]);
                return values[0];
            },

            '404': function (name, opt) {
                Views.render('404', {
                    'args': [name],
                    'render': true,
                    'title': `404 - ${opt.title}`,
                });
            },

            'close': function (name) {
                PageTabs.close(name);
                PageList.close(name);
            },

            'title': function (title) {
                document.title = `webpart - ${title}`;
            },

            'fullscreen': function (...args) {
                panel.$.toggleClass('fullscreen', ...args);
            },
        });

    });


    /**
    *
    */
    panel.on('render', function (view) {
        if (!view) {
            location.hash = '#Home';
            return;
        }

        if (meta.rendered) {
            open(view);
            return;
        }
        
        
        meta.view = view;
        meta.rendered = true;

        Sidebar.render();
        Container.render();
        
      
    });


    //让 panel 先 show 出来再触发外界绑定的 render 事件。
    panel.on('after-render', function () {
        panel.fire('render');

    });



    return {
        open: function (view, args) {
            Views.render(view, {
                'args': args,
                'render': true,
            });

            location.hash = '#' + view;

        },

    };


});