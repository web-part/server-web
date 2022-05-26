
define.panel('/FileList/Body/Main/List/File/GridView', function (require, module, panel) {
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
                { caption: '大小', name: 'size', width: 70, class: 'size number', },
                { caption: '编码', name: 'isUTF8', width: 80, class: 'utf8', },
                { caption: 'MD5', name: 'md5', width: 285, class: 'md5', },
            ],

        });



        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },
            'name': function (cell) {
                let item = cell.row.item;
                let name = item.name;
                let icon = File.getIcon(item.raw);

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
                let item = cell.row.item.raw;
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
            let stat = item.stat;
            let size = File.getSizeDesc(stat.size);
            let { isUTF8, name, } = item;

            return {
                'name': root + name,
                'size': size.value + ' ' + size.desc,
                'isUTF8': isUTF8 ? 'UTF8' : '其它',
                'md5': item.md5,
                'raw': item,       //点击时会用到。
            };

        });

        //内部分页。
        gridview.render(list, {
            no: 1,
            size: 20,
        });

        gridview.$.toggleClass('md5-repeat-mode', opt.isMd5Mode);

    });



});
