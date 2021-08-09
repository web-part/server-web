
define('/ModuleTree/Main/Dependent/List/GridView', function (require, module, exports) {
    const $ = require('$');
    const GridView = require('GridView');


    let fields = [
        { caption: '模块ID', name: 'id', width: 300, class: 'name', dragable: true, delegate: '[data-cmd]', },
        { caption: '定义方法', name: 'method', width: 110, class: 'file', dragable: true, delegate: '[data-cmd]', },
        { caption: '级别', name: 'level', width: 49, class: 'number level', dragable: true, },
        { caption: '所在文件', name: 'file', width: 400, class: 'file', dragable: true, delegate: '[data-cmd]', },
    ];



    return {

        render({ container, list = [], cmdClick, }) {
            // if (list.length == 0) {
            //     $(container).html('该模块没有被任何模块依赖。');
            //     return;
            // }


            let gridview = new GridView({
                container: container,
                primaryKey: 'id',
                check: false,
                order: true,
                class: '',
                footer: false,
                fields: fields,
            });

            gridview.on('process', 'cell', {
                'id': function (cell) {
                    let item = cell.row.data;
                    let html = `<a data-cmd="id" href="javascript:">${item.id}</a>`;

                    return html;
                },

                'file': function (cell) {
                    let item = cell.row.data;
                    let html = `<a data-cmd="file" href="javascript:">${item.file}</a>`;

                    return html;
                },
            });

            gridview.on('click', 'cell', function (cell, event) {
                let cmd = event.target.dataset.cmd;

                if (cmd) {
                    event.stopPropagation();
                    cmdClick(cmd, cell);
                }

            });


            gridview.render();
            gridview.fill(list);

            return gridview;
        },
    };
});