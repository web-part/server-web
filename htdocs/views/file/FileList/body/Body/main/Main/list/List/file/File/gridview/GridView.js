
define.panel('/FileList/Body/Main/List/File/GridView', function (require, module, panel) {
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
                { caption: '大小', name: 'size', width: 70, class: 'size number', dragable: true, },
                { caption: '编码', name: 'isUTF8', width: 80, class: 'utf8', dragable: true, },
                { caption: 'MD5', name: 'md5', width: 285, class: 'md5', dragable: true, },
            ],

        });

        gridview.on('process', 'row', function (row) {
            row.class = row.data.item.type;
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

            'md5': function (cell) {
                let item = cell.row.data.item;
                let { md5, files, } = item;
                let lastItem = files.slice(-1)[0];

                if (files.length > 1) {
                    cell.class += ' repeat';

                    if (item === lastItem) {
                        cell.row.class += ' md5-group-bottom';
                    }
                }
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

        gridview.$.toggleClass('md5-repeat-mode', opt.isMd5Mode);



        list = list.map(function (item, index) {
            let stat = item.stat;


            let birthtime = $Date.format(stat.birthtime, 'yyyy-MM-dd HH:mm:ss');
            let mtime = $Date.format(stat.mtime, 'yyyy-MM-dd HH:mm:ss');

            let isFile = item.type == 'file';
            let size = File.getSizeDesc(stat.size);
            let { isUTF8, name, } = item;

            if (isFile) {
                //name = name.startsWith('/') ? name.slice(1) : name; //根目录的文件，去掉首字符的 `/`。
            }
            else { //目录。
                name += '/';
            }


            return {
                'name': root + name,
                'typeDesc': isFile ? item.ext.slice(1) + ' 文件' : '目录',
                'size': size.value + ' ' + size.desc,
                'birthtime': birthtime,
                'mtime': mtime,
                'isUTF8': isFile ? (isUTF8 ? 'UTF8' : '其它') : '',
                'md5': item.md5,
                'item': item, //点击时会用到。
            };

        });




        gridview.fill(list);

    });



});
