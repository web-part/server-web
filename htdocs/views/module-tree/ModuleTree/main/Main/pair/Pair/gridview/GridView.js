
define.panel('/ModuleTree/Main/Pair/GridView', function (require, module, panel) {
    const GridView = require('GridView');
    const File = require('File');

    let tpl = null;
    let gridview = null;

    let fields = [
        { caption: '模块ID', name: 'id', width: 300, class: 'name', dragable: true, delegate: '[data-cmd]', },
        // { caption: '级别', name: 'level', width: 49, class: 'number level', dragable: true, },
        { caption: '所在的 js 文件', name: 'file', width: 400, class: 'file', dragable: true, delegate: '[data-cmd]', },
        { caption: '关联的 html 文件', name: 'htmlFile', width: 400, class: 'file', dragable: true, delegate: '[data-cmd]', },
    ];


    function fillFile(file) {
        if (!file) {
            return '';
        }

        let list = Array.isArray(file) ? file : [file];

        let htmls = list.map((file) => {
            let icon = File.getIcon(file);

            let html = tpl.fill('href', {
                'icon': icon.html,
                'cmd': 'file',
                'text': file,
            });

            return html;
        });

        let html = htmls.join('<br />');



        return {
            'html': html,
            'count': list.length,
        };

    }

    panel.on('init', function () {
        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,
            primaryKey: 'id',
            check: false,
            order: true,
            class: '',
            footer: false,
            fields: fields,
        });

        gridview.on('process', 'row', function (row) {
            let item = row.data;
            if (item.htmlFile && !item.file) {
                row.class = 'error';
            }
        });

        gridview.on('process', 'cell', {
            'id': function (cell) {
                let item = cell.row.data;

                let html = tpl.fill('href', {
                    'icon': '',
                    'cmd': 'id',
                    'text': item.id,
                });

                return html;
            },

            'file': function (cell) {
                let item = cell.row.data;
                let { html, count, } = fillFile(item.file);
                if (count > 1) {
                    cell.class += ' error';
                }

                return html;
            },

            'htmlFile': function (cell) {
                let item = cell.row.data;
                let { html, count, } = fillFile(item.htmlFile);
                if (count > 1) {
                    cell.class += ' error';
                }
                return html;
            },


        });

        gridview.on('click', 'cell', function (cell, event) {
            let cmd = event.target.dataset.cmd;

            if (!cmd) {
                return;
            }

            event.stopPropagation();

            let value = event.target.text;
            panel.fire('cmd', [cmd, value]);
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


    return {
     
    };


});
