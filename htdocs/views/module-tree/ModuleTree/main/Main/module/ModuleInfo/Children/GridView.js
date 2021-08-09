
define.panel('/ModuleTree/Main/ModuleInfo/Children/GridView', function (require, module, panel) {
    const GridView = require('GridView');
 

    let gridview = null;
    let tpl = null;
  

    panel.on('init', function () {
        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,
            primaryKey: 'id',
            check: false,
            order: true,
            class: '',
            footer: false,

            fields: [
                { caption: '模块ID', name: 'id', width: 400, class: 'name', dragable: true, delegate: '[data-cmd]', },
                { caption: '所在文件', name: 'file', width: 400, class: 'file', dragable: true, delegate: '[data-cmd]', },
            ],

        });

        gridview.on('process', 'row', function (row) {
            
            
        });

        gridview.on('process', 'cell', {
            'id': function (cell) {
                let item = cell.row.data;

                let html = tpl.fill('href', {
                    'cmd': 'id',
                    'text': item.id,
                });

                return html;
            },

            'file': function (cell) {
                let item = cell.row.data;

                let html = tpl.fill('href', {
                    'cmd': 'file',
                    'text': item.file,
                });

                return html;
            },


        });

        gridview.on('click', 'cell', function (cell, event) {
            let cmd = event.target.dataset.cmd;

            if (cmd) {
                event.stopPropagation();
                panel.fire('cmd', [cmd, cell.row.data]);
            }

        });

        gridview.render();


    });


    /**
    * 渲染内容。
    *   list: [],       //必选，数据列表。
   
    */
    panel.on('render', function (list) {

      

        gridview.fill(list);

    });



});
