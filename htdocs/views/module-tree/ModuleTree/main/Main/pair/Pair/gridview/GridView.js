
define.panel('/ModuleTree/Main/Pair/GridView', function (require, module, panel) {
    const GridView = require('GridView');
    const File = require('File');

    let tpl = null;
    let gridview = null;

    let fields = [
        { caption: '序号', name: 'order', width: 40, class: 'order', },
        { caption: '模块ID', name: 'id', width: 300, class: 'name', },
        // { caption: '级别', name: 'level', width: 49, class: 'number level',  },
        { caption: '所在的 js 文件', name: 'file', width: 400, class: 'file', },
        { caption: '关联的 html 文件', name: 'htmlFile', width: 400, class: 'file', },
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
                'value': file,
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
            fields: fields,
        });

        gridview.on('process', 'row', function (row) {
            let { item, } = row;

            if (item.htmlFile && !item.file) {
                row.class = 'error';
            }
        });

        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },

            'id': function (cell) {
                let { item, } = cell.row;

                let html = tpl.fill('href', {
                    'icon': '',
                    'cmd': 'id',
                    'value': item.id,
                    'text': item.id || module.data.none,
                });

                return html;
            },

            'file': function (cell) {
                let { item, } = cell.row;
                let { html, count, } = fillFile(item.file);
                if (count > 1) {
                    cell.class += ' error';
                }

                return html;
            },

            'htmlFile': function (cell) {
                let { item, } = cell.row;
                let { html, count, } = fillFile(item.htmlFile);
                if (count > 1) {
                    cell.class += ' error';
                }
                return html;
            },


        });

        gridview.on('click', 'cell', function (cell, { event, }) {
            let { cmd, value, } = event.target.dataset;

            if (!cmd) {
                return;
            }



            panel.fire('cmd', [cmd, value]);
            event.stopPropagation();
        });



    });


    /**
    * 渲染内容。
    *   list: [],       //必选，数据列表。
   
    */
    panel.on('render', function (list) {

        gridview.render(list);


    });


    return {

    };


});
