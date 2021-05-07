

define('MenuTree/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    const Escape = require('@definejs/escape');


    function processItem(item, index) {
        let list = item.list;
        let isDir = Array.isArray(list) && list.length > 0;
        let name = isDir ? 'dir' : 'file';

        let html = this.fill(name, item); //`this` is tpl。

        return html;
    }


    function processIcon(item, index) {
        let icon = item.icon;

        return {
            'index': index,
            'name': item.name || icon,
            'class': item.class || icon,
        };
    }



    return {
        create: function (meta) {
           
            let tpl = new Template('#tpl-MenuTree');


            tpl.process({
                '': function (data) {
                    let items = data.list.map(processItem, tpl);

                    return {
                        'items': items,
                    };
                },

                'dir': {
                    '': function (item) {
                        //当明确指定不可折叠时，必须强制为打开状态。
                        //否则就再也没机会打开了，因为它会屏蔽掉目录菜单项的点击事件。
                        //因此需要再初始时就强制打开。
                        if (item.foldable === false) {
                            item.open = true;
                        }

                        let list = item.list;

                        //是否有子目录。
                        //说明：一个目录里，可能全是文件，也可能含有至少一个目录。
                        let hasDir = list.find(function (item) {
                            return item.list && item.list.length > 0;
                        });

                        let items = list.map(processItem, tpl);
                        let icons = this.fill('icon', item.icons || []);
                        let name = Escape.html(item.name);
                        let current = meta.current;


                        return {
                            'eid': item.eid,
                            'name': name || '',
                            'items': items,
                            'open': item.open ? 'down' : '',
                            'on': current && item.id == current.id ? 'on' : '',
                            'icons': icons,
                            'display': item.open ? 'display: block;' : 'display: none;',
                            'hasDir': hasDir ? 'has-dir' : 'all-files',
                        };
                    },

                    'icon': processIcon,

                },

                'file': {
                    '': function (item, index) {
                        let icons = this.fill('icon', item.icons || []);
                        let name = Escape.html(item.name);
                        let current = meta.current;

                        return {
                            'eid': item.eid,
                            'name': name,
                            'on': current && item.id == current.id ? 'on' : '',
                            'icons': icons,
                        };
                    },

                    'icon': processIcon,
                },
            });


            ////分配随机 id 和相应的 parent。
            //tpl.on('process', function (item) {
    
            //    let id = item.id = item.id || $String.random();
            //    let eid = item.eid = 'eid-' + $String.random();          //用于 DOM 元素的 id。

            //    meta.id$item[id] = item;
            //    meta.eid$item[eid] = item;

            //    item.list && item.list.map(function (node) {
            //        node.parent = item;    //分配 `parent` 字段。
            //    });

            //    item.trace = function (fn) {
            //        let parent = item.parent;

            //        if (!parent) {
            //            return;
            //        }

            //        fn && fn(parent);
            //        parent.trace(fn);
            //    };


            //});


            return tpl;

        },

    };
});