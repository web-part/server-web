
define.panel('/HtmlTree/Main/HtmlLink/BaseInfo/Childs/GridView', function (require, module, panel) {
    const GridView = require('GridView');


    let gridview = null;
    let tpl = null;

    panel.on('init', function () {
        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,
            fields: [
                { caption: '序号', name: 'order', width: 40, class: 'order', },
                // { caption: 'id', name: 'id', width: 200, class: 'name', },
                { caption: '节点名称', name: 'name', width: 300, class: 'name', },
                { caption: '所在文件', name: 'file', width: 500, class: 'file', },
                // { caption: '内容行数', name: 'lines', width: 74, class: 'number', },
                // { caption: '下级个数', name: 'list', width: 74, class: 'number', },
            ],

        });

        gridview.on('process', 'row', function (row) {


        });


        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },

            'name': function (cell) {
                let { item, } = cell.row;;

                let html = tpl.fill('href', {
                    'cmd': 'id',
                    'text': item.name,
                });

                return html;
            },

            'file': function (cell) {
                let { item, } = cell.row;;

                let html = tpl.fill('href', {
                    'cmd': 'file',
                    'text': item.file,
                });

                return html;
            },




        });

        gridview.on('click', 'cell', function (cell, { event, }) {
            let { cmd, } = event.target.dataset;

            if (cmd) {
                event.stopPropagation();
                panel.fire('cmd', [cmd, cell.row.item]);
            }

        });




    });


    /**
    * 渲染内容。
    *   list: [],       //必选，数据列表。
   
    */
    panel.on('render', function (list) {



        gridview.render(list);

    });



});
