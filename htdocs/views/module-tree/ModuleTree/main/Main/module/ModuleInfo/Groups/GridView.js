
define('/ModuleTree/Main/ModuleInfo/Groups/GridView', function (require, module, exports) {
    const GridView = require('GridView');

    let fields = [
        { caption: '序号', name: 'order', width: 40, class: 'order', },
        { caption: '模块ID', name: 'id', width: 400, class: 'name', sort: true, },
        { caption: '定义方法', name: 'method', width: 110, class: 'file', sort: true, },
        { caption: '所在文件', name: 'file', width: 600, class: 'file', sort: true, },
    ];

    return {
        create({ container, tpl, click, }) { 

            let gridview = new GridView({ container, fields, });


            gridview.on('process', 'cell', {
                'order': function (cell, { no, }) {
                    return no + 1;
                },

                'id': function (cell) {
                    let { item, } = cell.row;

                    let html = tpl.fill('group', 'href', {
                        'cmd': 'id',
                        'text': item.id,
                    });

                    return html;
                },

                'file': function (cell) {
                    let { item, } = cell.row;

                    let html = tpl.fill('group', 'href', {
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
                    click(cmd, item);
                    event.stopPropagation();
                }

            });

            gridview.on('sort', {
                'id': function ({ a, b }) {
                    a = a.id.toUpperCase();
                    b = b.id.toUpperCase();
                    return { a, b, };
                },
            });


            return gridview;
        },
    };
  

  



});
