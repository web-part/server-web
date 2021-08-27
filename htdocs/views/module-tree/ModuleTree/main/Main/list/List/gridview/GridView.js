
define.panel('/ModuleTree/Main/List/GridView', function (require, module, panel) {
    const GridView = require('GridView');

    let tpl = null;
    let gridview = null;

    let fields = [
        { caption: '模块ID', name: 'id', width: 300, class: 'name', dragable: true, delegate: '[data-cmd]', },
        { caption: '定义方法', name: 'method', width: 110, class: 'file', dragable: true, delegate: '[data-cmd]', },
        { caption: '级别', name: 'level', width: 49, class: 'number level', dragable: true, },
        { caption: '被依赖模块数', name: 'dependents', width: 61, class: 'number dependents', dragable: true, },
        { caption: '所依赖公共模块数', name: 'publics', width: 73, class: 'number publics', dragable: true, },
        { caption: '所依赖私有模块数', name: 'privates', width: 73, class: 'number privates', dragable: true, },
        { caption: '直接子模块数', name: 'childs', width: 61, class: 'number childs', dragable: true, },
        { caption: '全部子模块数', name: 'children', width: 61, class: 'number children', dragable: true, },
        { caption: '同级模块数', name: 'siblings', width: 61, class: 'number siblings', dragable: true, },
        { caption: '所在的 js 文件', name: 'file', width: 400, class: 'file', dragable: true, delegate: '[data-cmd]', },
        // { caption: '关联的 html 文件', name: 'htmlFile', width: 400, class: 'file', dragable: true, delegate: '[data-cmd]', },
    ];


    function fillFile(file) {
        if (!file) {
            return '';
        }

        let list = Array.isArray(file) ? file : [file];

        let htmls = list.map((file) => {
            let html = tpl.fill('href', {
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
        fields,

        toggleFields(index$checked) {
            gridview.toggleFields(index$checked);
        },
    };


});
