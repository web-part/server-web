
define.panel('/FileList/Main/List/GridView', function (require, module, panel) {
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
                { caption: '路径', name: 'name', width: 500, class: 'name', dragable: true, delegate: '[data-cmd]', },
                { caption: '类型', name: 'typeDesc', width: 80, class: 'type', dragable: true, },
                { caption: '大小', name: 'size', width: 70, class: 'size', dragable: true, },
                // { caption: '创建时间', name: 'birthtime', width: 150, class: 'time', dragable: true, },
                // { caption: '修改时间', name: 'mtime', width: 150, class: 'time', dragable: true, },
            ],

        });


        gridview.on('process', 'cell', {
            'name': function (cell) {
                let item = cell.row.data;
                let name = item.name;
                
                let parts = name.split('/');
                let filename = parts.slice(-1)[0];      //取最后一段作为短名称。
                let dir = parts.slice(0, -1).join('/');

                dir += '/';


                let fullname = dir + filename;
                let keyword = meta.keyword;

                if (keyword) {
                    dir = dir.split(keyword).join(meta.keywordHtml);
                    filename = filename.split(keyword).join(meta.keywordHtml);
                }

                let html = tpl.fill('name', {
                    'dir': dir,
                    'filename': filename,
                    'fullname': fullname, //用于 input 里的。
                });

                return html;
            },
        });

        gridview.on('process', 'row', function (row) {
            row.class = row.data.item.type;
        });


        gridview.on('click', 'cell', {
            'name': {
                '': function (cell, event) {
                    event.stopPropagation();

                    cell.column.cells.forEach(function (cellObj) {
                        $(cellObj.element).toggleClass('text', cellObj === cell);
                    });

                    $(cell.element).find('input').get(0).select();
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
            let stat = item.stat;


            let birthtime = $Date.format(stat.birthtime, 'yyyy-MM-dd HH:mm:ss');
            let mtime = $Date.format(stat.mtime, 'yyyy-MM-dd HH:mm:ss');

            let isFile = item.type == 'file';

            let size = File.getSizeDesc(stat.size);
            let name = item.name;

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
                'item': item, //点击时会用到。
            };

        });

        gridview.fill(list);

    });



});
