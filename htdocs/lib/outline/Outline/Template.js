

define('Outline/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    const $String = require('@definejs/string');




    return {
        create: function () {
           
            let tpl = new Template('#tpl-Outline');


            tpl.process({
                '': function (data) {
                    let list = data.list;
                    let items = this.fill('item', list);

                    return {
                        'items': items,
                    };
                },

                'item': {
                    '': function (item, index) {
                        let level = item.level;
                        let tabs = level - 1;
                        let children = item.children || [];


                        //创建一个指定长度的数组。
                        tabs = $String.random(tabs).split('');

                        tabs = tabs.map(function () {
                            return {};
                        });

                        tabs = this.fill('tab', tabs);

                        return {
                            'index': index,
                            'level': level,
                            'tabs': tabs,
                            'text': item.text,
                            'opened': children.length > 0 ? 'opened' : '',
                            'folder-title': children.length > 0 ? '点击收起子级' : '',
                        };
                    },

                    'tab': function (item, index) {
                        return {};
                    },
                },
            });

            return tpl;

        },

    };
});