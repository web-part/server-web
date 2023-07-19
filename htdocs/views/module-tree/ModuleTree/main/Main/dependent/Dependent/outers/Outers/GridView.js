
define('/ModuleTree/Main/Dependent/Outers/GridView', function (require, module, exports) {
    const $ = require('$');
    const GridView = require('GridView');


    let fields = [
        { caption: '序号', name: 'order', width: 40, class: 'order', },
        { caption: '模块ID', name: 'id', width: 300, class: 'name', sort: true, },
        { caption: '定义方法', name: 'method', width: 110, class: 'file', sort: true, },
        { caption: '级别', name: 'level', width: 49, class: 'number level', sort: true, },
        { caption: '所在文件', name: 'file', width: 565, class: 'file', sort: true, },
        { caption: '所在行号', name: 'no', width: 75, class: 'number', sort: true, },

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

                'no': function (cell) {
                    let { item, } = cell.row;

                    let requires = item.requires.map((item) => {
                        return item.no + 1;
                    });

                    return requires.join(', ');
                },
            });

            gridview.on('click', 'cell', function (cell, { event, }) {
                let { cmd, } = event.target.dataset;

                if (cmd) {
                    event.stopPropagation();
                    cmdClick(cmd, cell);
                }

            });

            gridview.on('sort', {
                'id': function ({ a, b }) {
                    a = a.id.toUpperCase();
                    b = b.id.toUpperCase();
                    return { a, b, };
                },
                'no': function ({ a, b, }) { 
                    a = a.requires[0].no;
                    b = b.requires[0].no;
                    return { a, b, };
                },
            });


            gridview.render(list);

            return gridview;
        },
    };
});