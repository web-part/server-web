

define.panel('/Master/PageList/Tabs', function (require, module, panel) {
    const $ = require('$');
    const Tabs = require('@definejs/tabs');
    const Language = require('Settings.Language');



    let tabs = null;


    let meta = {
        index: 0,
        list: [],
    };

    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>li',
            eventName: 'click',
            indexKey: 'data-index',
            activedClass: 'on',
        });

        tabs.on('change', function (item, index) {
            meta.index = index;
            panel.fire('active', [item, index]);
        });


        tabs.template(function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'icon': item.icon,
                'close-display': item.view == 'Home' ? 'display: none;' : '',
            };
        });


        Language.on('change', function (value, old) {
            panel.render(meta.list);
            tabs.reset();
            tabs.active(meta.index);
        });

        panel.$on('click', {
            '[data-cmd="close"]': function (event) {
                event.stopPropagation();

                let li = this.parentNode;
                let index = +li.getAttribute('data-index');
                let item = meta.list[index];

                //发出信号告诉外面即将要关闭了。
                let values = panel.fire('before-close', [item, index]);

                //外面有返回 false 时，取消关闭。
                if (values.includes(false)) {
                    return false;
                }

                exports.close(index, true); //主动关闭的，需要触发事件。
            },
        });

    });




    panel.on('render', function (items) {
        let language = Language.get();

        let list = meta.list = items.map((item) => {
            item.name = item.language$name[language];
            return item;
        });


        tabs.render(list);

    });


    let exports = null;

    return exports = {

        active(index, fireEvent) {
            meta.index = index;
            tabs.active(index, fireEvent);

            let li = panel.$.find('>li').get(index);

            if (li) {
                let scroll = li.scrollIntoViewIfNeeded || li.scrollIntoView;   //优先使用前者，但在 IE 下不存在该方法。
                scroll.call(li);
            }
        },

        index() {
            return tabs.getActivedIndex();
        },

        close(index, fireEvent) {
            //这两句不要放在动画的回调函数内，因为外面可能已给更改了 list。
            let item = meta.list[index]; 
            tabs.remove(index); //让 tabs 设置到正确的状态

            panel.$.find(`>li[data-index="${index}"]`).animate({
                height: 0,  //这里是高度。
            }, function () {

                $(this).hide();
                if (fireEvent) {
                    panel.fire('after-close', [item, index]);
                }

            });
        },

        
    };


});