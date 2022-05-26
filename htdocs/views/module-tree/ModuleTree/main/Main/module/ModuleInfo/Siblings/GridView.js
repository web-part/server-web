
define.panel('/ModuleTree/Main/ModuleInfo/Siblings/GridView', function (require, module, panel) {
    const GridView = require('GridView');
 

    let gridview = null;
    let tpl = null;
  

    panel.on('init', function () {
        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,

            fields: [
                { caption: '序号', name: 'order', width: 40, class: 'order', },
                { caption: '模块ID', name: 'id', width: 400, class: 'name', },
                { caption: '所在文件', name: 'file', width: 400, class: 'file', },
            ],

        });


        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },

            'id': function (cell) {
                let { item, } = cell.row;

                let html = tpl.fill('href', {
                    'cmd': 'id',
                    'text': item.id,
                });

                return html;
            },

            'file': function (cell) {
                let { item, } = cell.row;

                let html = tpl.fill('href', {
                    'cmd': 'file',
                    'text': item.file,
                });

                return html;
            },


        });

        gridview.on('click', 'cell', function (cell, { event, }) {
            let { cmd, } = event.target.dataset;
            let { item, } = cell.row;

            if (cmd) {
                panel.fire('cmd', [cmd, item]);
                event.stopPropagation();
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
