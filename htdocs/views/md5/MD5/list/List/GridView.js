
define.panel('/MD5/List/GridView', function (require, module, panel) {
    const GridView = require('GridView');
    const Data = module.require('Data');

    let tpl = null;
    let gridview = null;
  

    panel.on('init', function () {

        panel.template({
            'file': function (item) {
                return {
                    'index': 0,
                    'file': item.file,
                };
            },

            'files': {
                '': function (data) {
                    let items = this.fill('item', data.list);

                    return {
                        'items': items,
                    };
                },

                'item': function (item, index) {
                    return {
                        'index': index,
                        'file': item.file,
                    };
                },
            },
        });

        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,
            primaryKey: 'md5',
            check: false,
            order: true,
            class: '',
            footer: false,

            fields: [
                { caption: 'MD5', name: 'md5', width: 300, class: 'name', dragable: true, },
                { caption: '文件', name: 'file', width: 700, class: 'file', dragable: true, delegate: '[data-cmd]', },
            ],

        });

        gridview.on('process', 'row', function (row) {
            let item = row.data;
            row.class = item.files.length > 1 ? 'multi' : '';
        });


        gridview.on('process', 'cell', {
           
            'file': function (cell) {
                let item = cell.row.data;

                let list = item.files.map((file) => {
                    return { 'file': file, };
                });


                if (list.length > 1) {
                    html = tpl.fill('files', { 'list': list, });
                }
                else {
                    html = tpl.fill('file', list[0]);
                }

                return html;
            },

        });



        gridview.on('click', 'cell', function (cell, event) {
            let { cmd, index, } = event.target.dataset;
            

            if (cmd) {
                event.stopPropagation();

                let file = cell.row.data.files[+index];

                panel.fire('cmd', [cmd, file]);
            }

        });

        gridview.render();


    });


    /**
    * 渲染内容。
    *   list: [],       //必选，数据列表。
   
    */
    panel.on('render', function (list, onlyMulti) {

        list = Data.parse(list, onlyMulti);

        gridview.fill(list);

    });


    return {
        setHeight(h) {
            panel.$.height(h);
        },
    };


});
