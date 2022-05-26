

define('TextTree/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    const Class = module.require('Class');
    const DataSet = module.require('DataSet');
    const Style = module.require('Style');
    const Title = module.require('Title');



    return {
        create: function (meta) {
            let tpl = new Template(meta.template);

            function fill(name, data) {
                let html = tpl.fill(name, data);

                html = html.trim();
                html = html.split('\n').join('');
                return html;
            }


            tpl.process({
                '': function () {
                    this.fix(['class', 'title', 'dataset', 'style',]);

                    let classList = [
                        meta.class,
                        meta.showTab ? '' : 'hide-tab',
                        meta.showIcon ? '' : 'hide-icon',
                        meta.showValue ? '' : 'hide-value',
                        meta.showColor ? '' : 'hide-color',
                        meta.showHover ? '' : 'hide-hover',
                    ];

                    let cssClass = Class.stringify(classList);
                    let dataset = DataSet.stringify(meta.dataset);
                    let style = Style.stringify(meta.style);
                    let items = this.fill('item', meta.list);

                    return {
                        'id': meta.id,
                        'class': cssClass,
                        'dataset': dataset,
                        'style': style,
                        'items': items,
                    };
                },


                'item': function (item, index) {
                    this.fix(['class', 'title', 'dataset', 'style',]);
                    
                    meta.emitter.fire('process', 'item', [item]);

                    let cssClass = Class.stringify([item.class, item.type]);
                    let dataset = DataSet.stringify(item.dataset);
                    let style = Style.stringify(item.style);
                    let title = Title.stringify(item.title);

                    let tabs = fill('tabs', item);
                    let linker = fill('linker', item);
                    let key = fill('key', item);


                    return {
                        'id': item.id,
                        'class': cssClass,
                        'dataset': dataset,
                        'style': style,
                        'title': title,
                        'tabs': tabs,
                        'linker': linker,
                        'key': key,
                    };
                },

                'tabs': function (item) {
                    let { tabs, } = item;
                    let count = 0;

                    tabs = tabs.split('').map(function (item, index) {
                        item = item.trim();
                        count++;

                        if (item.length > 0) {
                            count = 0;
                        }

                        let cls = '';


                        //首项没有内容的，也当是一个分组。
                        if ((!item && index == 0) || count == 4) {
                            cls = 'grouper';
                            count = 0;
                        }

                        let b = fill('b', {
                            'class': cls,
                            'text': item,
                        });

                        return b;
                    });

                    return { tabs, };
                },

                'linker': function (item) {
                    return item.linker ? item : '';
                },

                'key': {
                    '': function (item) {
                        let icon = this.fill('icon', item);
                        let value = this.fill('value', item); //可能返回空串。

                        return {
                            'id': item.id,
                            'key': item.key,
                            'type': item.type,
                            'icon': icon,
                            'value': value,
                        };
                    },

                    'icon': function (item) {
                        let { id, type, } = item;
                        let icon = Object.assign({}, meta.icon, item.icon);

                        icon = icon[type];

                        return icon ? { id, type, icon, } : '';
                    },

                    'value': function (item) {
                        return item.value ? item : '';
                    },
                },




            });


            return tpl;

        },

    };
});