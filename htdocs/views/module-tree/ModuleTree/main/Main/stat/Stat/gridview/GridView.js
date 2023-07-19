
define.panel('/ModuleTree/Main/Stat/GridView', function (require, module, panel) {
    const GridView = require('GridView');

    let gridview = null;
    let tpl = null;


    panel.on('init', function () {
        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,

            fields: [
                { caption: '', name: 'group', width: 5, class: 'group', minWidth: 5, maxWidth: 5, dragable: false, },
                { caption: '序号', name: 'order', width: 40, class: 'order', },
                { caption: '类型', name: 'name', width: 200, class: 'name', sort: true, },
                { caption: '个数', name: 'count', width: 300, class: 'count number', sort: true, },
                { caption: '大小', name: 'size', width: 300, class: 'size number', sort: true, },
                { caption: '行数', name: 'line', width: 300, class: 'line number', sort: true, },
            ],

        });

        let lastGroup = '';

        gridview.on('process', 'row', function (row, { no, }) { 
            row.class = row.item.group;

            let { group, } = row.item;
            row.class = group;

            if (lastGroup != group) {
                row.class += ' group-begin';
                lastGroup = group;
            }

            
        });


        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no;
            },

            'group': function (cell) {
                return '';
            },
            'count': function (cell) {
                let { count, } = cell.row.item;
                let html = tpl.fill('cell', count);
                return html;
            },

            'size': function (cell) {
                let { size, } = cell.row.item;
                let html = tpl.fill('cell', size);
                return html;
            },


            'line': function (cell) {
                let { line, } = cell.row.item;
                let html = tpl.fill('cell', line);
                return html;
            },

        });

        gridview.on('sort', {
            //恢复分组。
            '': function ({ list, }) { 
                const $Array = require('@definejs/array');

                let group$items = {};
                let newList = [];

                list.forEach((item) => {
                    let { group, } = item;
                    $Array.add(group$items, group, item);
                });

                //让 `all` 这组置顶。
                newList = [...group$items['all']];

                Object.entries(group$items).forEach(([group, items]) => {
                    if (group == 'all') {
                        return;
                    }

                    newList = [...newList, ...items];
                });

                return newList;


            },

            'name': function ({ a, b, }) {
                a = a.name.toUpperCase();
                b = b.name.toUpperCase();
                return { a, b, };
            },

            'count': function ({ a, b, }) {
                a = a.count.value;
                b = b.count.value;
                return { a, b, };
            },

            'size': function ({ a, b, }) {
                a = a.size.raw;
                b = b.size.raw;
                return { a, b, };
            },

            'line': function ({ a, b, }) {
                a = a.line.value;
                b = b.line.value;
                return { a, b, };
            },


        });



    });


    /**
    * 渲染内容。
    *   list: [],                   //必选，数据列表。
    */
    panel.on('render', function (list) {


        gridview.render(list);



    });



});
