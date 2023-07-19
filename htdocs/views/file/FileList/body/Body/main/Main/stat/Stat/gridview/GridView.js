
define.panel('/FileList/Body/Main/Stat/GridView', function (require, module, panel) {
    const GridView = require('GridView');

    let gridview = null;
    let tpl = null;

    panel.on('init', function () {
        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,

            fields: [
                { caption: '序号', name: 'order', width: 40, class: 'order', },
                { caption: '图标', name: 'icon', width: 40, class: 'icon', },
                { caption: '类型', name: 'name', width: 200, class: 'name', sort: true, },
                { caption: '个数', name: 'count', width: 400, class: 'count number', sort: true, },
                { caption: '大小', name: 'size', width: 400, class: 'size number', sort: true, },
            ],

        });

        gridview.on('render', function () { 
            gridview.$.find(`tr.item:first`).addClass('group-begin');
        });

        gridview.on('process', 'row', function (row, { no, }) { 
            if (row.item.top) {
                row.class = 'top';
            }
            else {
                row.class = 'item';
            }

            row.dataset.no = no;
        });


        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },

            'icon': function (cell) {
                let { icon, } = cell.row.item;
                return icon.html;
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

        });

        gridview.on('sort', {
            //让置顶的恢复置顶。
            '': function ({ list, }) { 
                let tops = [];
                let items = [];
                
                list.forEach((item) => {
                    if (item.top) {
                        tops.push(item);
                    }
                    else {
                        items.push(item);
                    }
                });

                tops.sort((a, b) => {
                    return a.top - b.top;
                });

             

                return [...tops, ...items,];
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
