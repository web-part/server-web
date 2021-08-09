
define.panel('/FileList/Body/Main/List/Dir/GridView', function (require, module, panel) {
    const $Date = require('@definejs/date');
    const GridView = require('GridView');
    const File = require('File');


    let gridview = null;
    let tpl = null;

    let meta = {
        keyword: '',
        keywordHtml: '',
    };

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
                { caption: '路径', name: 'name', width: 600, class: 'name', dragable: true, delegate: '[data-cmd]', },
                { caption: '大小', name: 'size', width: 95, class: 'size number', dragable: true, },
                { caption: '文件数', name: 'files', width: 74, class: 'files number', dragable: true, },
                { caption: '目录数', name: 'dirs', width: 74, class: 'dirs number', dragable: true, },
            ],

        });

        gridview.on('process', 'row', function (row) {
            
        });

        gridview.on('process', 'cell', {
            'name': function (cell) {
                let item = cell.row.data;
                let name = item.name;
                let icon = File.getIcon(item.item);
                
                if (meta.keyword) {
                    name = name.split(meta.keyword).join(meta.keywordHtml);
                }

                let html = tpl.fill('name', {
                    'icon': icon.html,
                    'name': name,
                });

                return html;
            },
            'files': function (cell) {
                let item = cell.row.data;

                cell.class += ` files-${item.files}`;
            },
        });


        gridview.on('click', 'cell', {
            'name': {
                '': function (cell, event) {

                },

                '[data-cmd]': function (cell, event) {
                    event.stopPropagation();
                    let item = cell.row.data.item;
                    panel.fire('item', [item]);

                },
            },
        });

        gridview.on('click', 'table', function (table, event) {
            table.column('name', function (cell) {
                $(cell.element).removeClass('text');
            });
        });


        gridview.render();


    });


    /**
    * 渲染内容。
    *   list: [],       //必选，数据列表。
    *   opt: {          //可选。
    *       keyword: '' //高亮的关键词。
    *       root: '',   //根目录。
    *   },    
    */
    panel.on('render', function (list, opt = {}) {
        let keyword = meta.keyword = opt.keyword || '';
        let root = opt.root || '';

        if (keyword) {
            meta.keywordHtml = '<span class="keyword">' + keyword + '</span>';
        }

        list = list.map(function (item, index) {
            let isFile = item.type == 'file';
            let size = File.getSizeDesc(item.size);
            let {  name, } = item;

            if (isFile) {
      
            }
            else { //目录。
                name += '/';
            }


            return {
                'name': root + name,
                'size': size.value + ' ' + size.desc,
                'dirs': item.dirs.length,
                'files': item.files.length,
                'item': item, //点击时会用到。
            };

        });

        gridview.fill(list);

    });



});
