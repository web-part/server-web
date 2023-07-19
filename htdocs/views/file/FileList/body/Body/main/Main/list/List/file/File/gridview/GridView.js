
define.panel('/FileList/Body/Main/List/File/GridView', function (require, module, panel) {
    const GridView = require('GridView');

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
                { caption: '路径', name: 'name', width: 600, class: 'name', click: '[data-cmd]', sort: true, },
                { caption: '大小', name: 'size', width: 70, class: 'size number', sort: true, },
                { caption: 'MD5', name: 'md5', width: 285, class: 'md5', sort: true, },
            ],

        });



        gridview.on('process', 'cell', {
            'order': function (cell, { no, }) {
                return no + 1;
            },
            'name': function (cell) {
                let item = cell.row.item;
                let { name, icon, } = item;

                if (meta.keyword) {
                    name = name.split(meta.keyword).join(meta.keywordHtml);
                }

                let html = tpl.fill('name', { name, icon, });

                return html;
            },

            'md5': function (cell) {
                let { repeat, isNewGroup, } = cell.row.item;
                
                if (repeat) {
                    cell.class += ' repeat';
                }

                if (isNewGroup) {
                    cell.row.class += ' md5-group';
                }

            },
        });

        gridview.on('sort', {
            'name': function ({ a, b, }) {
                a = a.name.toUpperCase();
                b = b.name.toUpperCase();
                return { a, b, };
            },

            'size': function ({ a, b, }) {
                a = a.raw.data.size.raw;
                b = b.raw.data.size.raw;
                return { a, b, };
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
    *   list: [],                   //必选，数据列表。
    *   opt: {                      //可选。
    *       keyword: ''             //高亮的关键词。
    *       isRepeatMode: false,    //
    *   },    
    */
    panel.on('render', function (list, { keyword, isRepeatMode, }) {

        meta.keyword = keyword;
        meta.keywordHtml = `<span class="keyword">${keyword}</span>`;

        let prevMd5 = '';
        

        list = list.map(function (item, index) {
            let { md5, repeats, size, icon, } = item.data;
            let isNewGroup = index == 0;

            if (prevMd5 != md5) {
                isNewGroup = true;
                prevMd5 = md5;
            }


            return {
                'name': item.id,
                'size': `${size.value} ${size.desc}`,
                'repeat': repeats.length > 1,
                'isNewGroup': isNewGroup,
                'icon': icon.html,
                'md5': md5,
                'raw': item,       //点击时会用到。
            };

        });

        gridview.render(list);

        // //内部分页。
        // gridview.render(list, {
        //     no: 1,
        //     size: 20,
        // });

        gridview.$.toggleClass('md5-repeat-mode', !!isRepeatMode);

    });



});
