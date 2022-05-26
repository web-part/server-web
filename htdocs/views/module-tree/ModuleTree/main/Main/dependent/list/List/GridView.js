
define('/ModuleTree/Main/Dependent/List/GridView', function (require, module, exports) {
    const $ = require('$');
    const GridView = require('GridView');


    let fields = [
        { caption: '序号', name: 'order', width: 40, class: 'order', },
        { caption: '模块ID', name: 'id', width: 300, class: 'name', },
        { caption: '定义方法', name: 'method', width: 110, class: 'file', },
        { caption: '级别', name: 'level', width: 49, class: 'number level', },
        { caption: '所在文件', name: 'file', width: 400, class: 'file', },
    ];



    return {

        render({ container, list = [], cmdClick, }) {
            // if (list.length == 0) {
            //     $(container).html('该模块没有被任何模块依赖。');
            //     return;
            // }


            let gridview = new GridView({
                container: container,
                fields: fields,
            });

            gridview.on('process', 'cell', {
                'order': function (cell, { no, }) {
                    return no + 1;
                },

                'id': function (cell) {
                    let { item, } = cell.row;
                    let html = `<a data-cmd="id">${item.id}</a>`;

                    return html;
                },

                'file': function (cell) {
                    let { item, } = cell.row;
                    let html = `<a data-cmd="file">${item.file}</a>`;

                    return html;
                },
            });

            gridview.on('click', 'cell', function (cell, { event, }) {
                let { cmd, } = event.target.dataset;

                if (cmd) {
                    event.stopPropagation();
                    cmdClick(cmd, cell);
                }

            });


            gridview.render(list);

            return gridview;
        },
    };
});