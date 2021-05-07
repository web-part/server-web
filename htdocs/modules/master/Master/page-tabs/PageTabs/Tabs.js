

define.panel('/Master/PageTabs/Tabs', function (require, module, panel) {
    const $ = require('$');
    const Tabs = require('@definejs/tabs');


    let tabs = null;
    let list = [];



    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>li',
            eventName: 'click',
            indexKey: 'data-index',
            activedClass: 'on',
        });

        tabs.on('change', function (item, index) {
            panel.fire('active', [item, index]);
        });

    });


    panel.on('init', function () {

        //点击关闭按钮
        panel.$.on('click', '[data-cmd="close"]', function (event) {
            event.stopPropagation();

            let li = this.parentNode;
            let index = +li.getAttribute('data-index');
            let item = list[index];

            if (!item || item.isHome) {
                return;
            }

            //视图中的 close 事件中有返回 false 时，取消关闭。
            let values = panel.fire('close', [item, index]);

            if (values.includes(false)) {
                return false;
            }

            exports.close(index);
        });

    });




    panel.on('render', function (items) {

        list = items;

        tabs.render(list, {
            '': function (item, index) {
                let name = item.isHome ? 'home' : 'item'; 
                let html = this.fill(name, item, index);

                return {
                    'item': html,
                };
            },

            'home': function (item, index) {
                return {
                    'index': index,
                };
            },

            'item': function (item, index) {
                return {
                    'index': index,
                    'name': item.name,
                    'actived-class': item.actived ? 'hover' : '',
                    'title': item.name, //test
                    'icon': item.icon,
                };
            },
        });

        panel.fire('render', [list]);
       
    });




    let next = null;

    let exports = {

        active: function (index, fireEvent) {

            tabs.active(index, !fireEvent);

            let li = panel.$.find('>li').get(index);
            let scroll = li.scrollIntoViewIfNeeded || li.scrollIntoView;   //优先使用前者，但在 IE 下不存在该方法。
            scroll.call(li);
        },

        index: function () {
            return tabs.getActivedIndex();
        },

        close: function (index) {

            //未指定 index，则关闭当前激活的。
            if (index === undefined) {
                index = exports.index();
            }

            let li = '>li[data-index="' + index + '"]';

            panel.$.find(li).animate({
                width: 0,
                padding: 0,

            }, function () {
                $(this).hide();
                tabs.remove(index); //让 tabs 设置到正确的状态
                next && next();

                panel.fire('after-close', [index]);
            });
        },



        clear: function () {

            let max = list.length - 1;
            close(max);


            function close(index) {
                if (index < 0) {
                    next = null;
                    return;
                }


                next = function () {
                    close(index - 1);
                };

                let item = list[index];

                if (!item || item.isHome) {
                    next();
                    return;
                }


                //视图中的 close 事件中有返回 false 时，取消关闭。
                let values = panel.fire('close', [item, index]);
                if (values.includes(false)) {
                    return;
                }

                exports.close(index);
            }


        },
    };

    return exports;
});