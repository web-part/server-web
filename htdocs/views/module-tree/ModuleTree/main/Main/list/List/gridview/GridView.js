
define.panel('/ModuleTree/Main/List/GridView', function (require, module, panel) {
    const GridView = require('GridView');

    let tpl = null;
    let gridview = null;

    let fields = [
        { caption: '序号', name: 'order', width: 40, class: 'order', },
        { caption: '模块ID', name: 'id', width: 300, class: 'name', },
        { caption: '定义方法', name: 'method', width: 110, class: 'file', },
        { caption: '级别', name: 'level', width: 49, class: 'number level', },
        { caption: '被依赖模块数', name: 'dependents', width: 61, class: 'number dependents', },
        { caption: '所依赖公共模块数', name: 'publics', width: 73, class: 'number publics', },
        { caption: '所依赖私有模块数', name: 'privates', width: 73, class: 'number privates', },
        { caption: '直接子模块数', name: 'childs', width: 61, class: 'number childs', },
        { caption: '全部子模块数', name: 'children', width: 61, class: 'number children', },
        { caption: '同级模块数', name: 'siblings', width: 61, class: 'number siblings', },
        { caption: '所在的 js 文件', name: 'file', width: 400, class: 'file', },
        // { caption: '关联的 html 文件', name: 'htmlFile', width: 400, class: 'file', },
    ];


    function fillFile(file) {
        if (!file) {
            return '';
        }

        let list = Array.isArray(file) ? file : [file];

        let htmls = list.map((file) => {
            let html = tpl.fill('href', {
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
            let item = row.data;
            let list = [];

            if (item.dependents == 0) {
                list.push('error dependents');
            }

            if (item.childs != item.privates) {
                list.push('error childs privates');
            }

            list = list.join(' ');
            list = list.split(' ');
            list = [...new Set(list)];
            row.class = list.join(' ');
        });

        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },

            'id': function (cell) {
                let { item, } = cell.row;

                let html = tpl.fill('href', {
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

        // //内部分页。
        // gridview.render(list, {
        //     no: 1,
        //     size: 20,
        // });

    });


    return {
        fields,

        // toggleFields(index$checked) {
        //     gridview.toggleFields(index$checked);
        // },
    };


});
