
define.panel('/FileList/Body/Main/List/Dir/GridView', function (require, module, panel) {
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
            fields: [
                { caption: '序号', name: 'order', width: 40, class: 'order', },
                { caption: '路径', name: 'name', width: 600, class: 'name', click: '[data-cmd]', },
                { caption: '大小', name: 'size', width: 95, class: 'size number', },
                { caption: '文件数', name: 'files', width: 74, class: 'files number', },
                { caption: '目录数', name: 'dirs', width: 74, class: 'dirs number', },
            ],

        });


        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },

            'name': function (cell) {
                let { name, raw, } = cell.row.item;
                let icon = File.getIcon(raw);

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
                '[data-cmd]': function (cell, { event, }) {
                    let item = cell.row.item.raw;
                    panel.fire('item', [item]);
                    event.stopPropagation();

                },
            },
        });




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
            let { name, } = item;

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
                'raw': item,       //点击时会用到。
            };

        });


        //内部分页。
        gridview.render(list, {
            no: 1,
            size: 20,
        });

    });



});
