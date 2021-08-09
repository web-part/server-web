

define('TextTree/Template', function (require, module, exports) {
    const Template = require('@definejs/template');




    return {
        create: function (meta) {
            let tpl = new Template('#tpl-TextTree');

            function fill(name, data) {
                let html = tpl.fill(name, data);

                html = html.trim();
                html = html.split('\n').join('');
                return html;
            }

            tpl.process({
                '': function (data) {
                    let items = this.fill('item', data.list);

                    return {
                        'id': data.id,
                        'items': items,
                        'hide-tab': meta.showTab ? '' : 'hide-tab',
                        'hide-icon': meta.showIcon ? '' : 'hide-icon',
                        'hide-secondary': meta.showSecondary ? '' : 'hide-secondary',
                        'hide-color': meta.showColor ? '' : 'hide-color',
                        'hide-hover': meta.showHover ? '' : 'hide-hover',
                    };
                },


                'item': function (item, index) {
                    let { tabs, key, linker, id, } = item;
                    let children = meta.id$children[id] || [];
                    let isDir = children.length > 0;

                    key = key || meta.emptyText;
                    tabs = fill('tabs', item);
                    key = fill('key', { key, index, id, isDir, });
                    linker = fill('linker', item);

                    return {
                        id,
                        tabs,
                        linker,
                        key,
                        index,
                        'type': isDir ? 'dir' : 'file',
                        'not-found': meta.id$item[id] ? '' : 'not-found', //该项可能不存在。
                    };
                },

                'tabs': function (data) {
                    let { tabs, } = data;
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

                'key': {
                    '': function (data) {
                        let secondary = this.fill('secondary', data); //可能返回空串。
                        let icon = this.fill('icon', data);

                        return {
                            ...data,
                            icon,
                            secondary,
                        };
                    },

                    'icon': function ({ isDir, }) {

                        return {
                            'type': isDir ? 'dir': 'file',
                            'icon': isDir ? 'fas fa-angle-down' : 'far fa-circle',
                        };

                    },

                    'secondary': function (data) {
                        let { secondaryKey, } = meta;

                        //如果不指定对应的 key，则不生成 html 内容。
                        if (!secondaryKey) {
                            return '';
                        }

                        let index = data.index;
                        let item = meta.id$item[data.id];
                        if (!item) {
                            return {}
                        }

                        let secondary = item[secondaryKey];

                        return { secondary, secondaryKey, index, };
                    },
                },


            });


            return tpl;

        },

    };
});