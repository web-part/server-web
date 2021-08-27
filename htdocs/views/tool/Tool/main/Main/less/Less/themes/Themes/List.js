

define.panel('/Tool/Main/Less/Themes/List', function (require, module, panel) {
    const Tabs = require('@definejs/tabs');

    let tabs = null;

    let list = [
        { name: 'default', },
        { name: 'custom', desc: '深色', },
        { name: '3024-day', },
        { name: '3024-night', desc: '深色', },
        { name: 'ambiance-mobile', },
        { name: 'ambiance', desc: '深色', },
        { name: 'base16-dark', desc: '深色', },
        { name: 'base16-light', },
        { name: 'blackboard', desc: '深色', },
        { name: 'cobalt', desc: '深色', },
        { name: 'eclipse', },
        { name: 'elegant', },
        { name: 'erlang-dark', desc: '深色', },
        { name: 'lesser-dark', desc: '深色', },
        { name: 'mbo', desc: '深色', },
        { name: 'mdn-like', },
        { name: 'midnight', desc: '深色', },
        { name: 'monokai', desc: '深色', },
        { name: 'neat', },
        { name: 'neo', },
        { name: 'night', desc: '深色', },
        { name: 'paraiso-dark', desc: '深色', },
        { name: 'paraiso-light', },
        { name: 'pastel-on-dark', desc: '深色', },
        { name: 'rubyblue', desc: '深色', },
        { name: 'solarized', },
        { name: 'the-matrix', desc: '深色', },
        { name: 'tomorrow-night-eighties', desc: '深色', },
        { name: 'twilight', desc: '深色', },
        { name: 'vibrant-ink', desc: '深色', },
        { name: 'xq-dark', desc: '深色', },
        { name: 'xq-light', },
    ];



    panel.set('show', false);

    panel.on('init', function () {
        
        tabs = new Tabs({
            container: panel.$,
            selector: '>li',
            activedClass: 'on',
        });

        tabs.on('change', function (item, index) {
          

            item = list[index];
            panel.fire('item', [item, index]);
        });



        panel.$.on('click', '[data-index]', function (event) {
            let index = + this.dataset.index;
            tabs.active(index);
        });

        panel.template({
            '': function (data) {
                let items = this.fill('item', data.list);

                return {
                    'items': items,
                };
            },

            'item': {
                '': function (item, index) {
                    let desc = this.fill('desc', item);

                    return {
                        'index': index,
                        'name': item.name,
                        'desc': desc,
                    };
                },

                'desc': function (item) {
                    return item.desc ? { 'desc': item.desc, } : '';
                },
            },
        });
    });




    panel.on('render', function (index) {
        
        panel.fill({ 'list': list, });

        if (typeof index == 'number') {
            tabs.active(index);
        }

       
    });


    return {
        active: function (index) {
            tabs.active(index);
        },

        slide: function (visible, fn) {
            if (!visible) {
                panel.$.slideUp('fast', fn);
                return;
            }

            //向下弹出以展示。
            panel.$.slideDown('fast', function () {
                //把当前选中的项滚到可视范围内。
                let index = tabs.getActivedIndex();
                let li = panel.$.find(`li[data-index="${index}"]`).get(0);
              
                li.scrollIntoViewIfNeeded();

                fn && fn();
            });
        },
    };


});