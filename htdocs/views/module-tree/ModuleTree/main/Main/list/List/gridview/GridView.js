
define.panel('/ModuleTree/Main/List/GridView', function (require, module, panel) {
    const GridView = require('GridView');

    let tpl = null;
    let gridview = null;

    let meta = {
        keyword: '',
        keywordHtml: '',
    };

    let fields = [
        { caption: '序号', name: 'order', width: 40, class: 'order', },
        { caption: '模块ID', name: 'id', width: 300, class: 'name', sort: true, },
        { caption: '模块名称', name: 'name', width: 71, class: 'name', sort: true, },
        { caption: '定义方法', name: 'method', width: 110, class: 'file', sort: true, },
        { caption: '级别', name: 'level', width: 48, class: 'number level', sort: true, },
        { caption: '消费者', name: 'dependents', width: 59, class: 'number dependents', sort: true, },
        { caption: '公共生产者', name: 'publics', width: 48, class: 'number publics', sort: true, },
        { caption: '私有生产者', name: 'privates', width: 48, class: 'number privates', sort: true, },
        { caption: '直接子模块', name: 'childs', width: 48, class: 'number childs', sort: true, },
        { caption: '全部子模块', name: 'children', width: 48, class: 'number children', sort: true, },
        { caption: '同级模块', name: 'siblings', width: 71, class: 'number siblings', sort: true, },
        { caption: '所在的 js 文件', name: 'file', width: 520, class: 'file', sort: true, },
        { caption: '关联的 html 文件', name: 'htmlFile', width: 520, class: 'file', sort: true,},
    ];



    panel.on('init', function () {
        tpl = panel.template();

        gridview = new GridView({
            container: panel.$,
            fields: fields,
            meta: true,
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
                let { id, } = cell.row.item;
                let text = module.data.none;
                let { keyword, keywordHtml, } = meta;

                if (id) {
                    text = id;

                    if (keyword) {
                        text = text.split(keyword).join(keywordHtml);
                    }
                }

                
                let html = tpl.fill('href', {
                    'cmd': 'id',
                    'value': id,
                    'text': text,
                });

                return html;
            },
            'file': function (cell) {
                let { file, } = cell.row.item;
                let text = file;
                let { keyword, keywordHtml, } = meta;

                if (keyword) {
                    text = text.split(keyword).join(keywordHtml);
                }


                let html = tpl.fill('href', {
                    'cmd': 'file',
                    'value': file,
                    'text': text,
                });

                return html;
            },
            'htmlFile': function (cell) {
                let { htmlFile, } = cell.row.item;
                let text = htmlFile;
                let { keyword, keywordHtml, } = meta;

                if (keyword) {
                    text = text.split(keyword).join(keywordHtml);
                }

                let html = tpl.fill('href', {
                    'cmd': 'file',
                    'value': htmlFile,
                    'text': text,
                });

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

        gridview.on('sort', {
            'id': function ({ a, b, }) {
                a = a.id.toUpperCase();
                b = b.id.toUpperCase();
                return { a, b, };
            },

            'name': function ({ a, b, }) {
                a = a.name.toUpperCase();
                b = b.name.toUpperCase();
                return { a, b, };
            },

            'file': function ({ a, b, }) {
                a = a.file.toUpperCase();
                b = b.file.toUpperCase();
                return { a, b, };
            },
            'htmlFile': function ({ a, b, }) {
                a = a.htmlFile.toUpperCase();
                b = b.htmlFile.toUpperCase();
                return { a, b, };
            },
        });


    });


    /**
    * 渲染内容。
    *   list: [],       //必选，数据列表。
   
    */
    panel.on('render', function (list, { keyword, }) {

        meta.keyword = keyword;
        meta.keywordHtml = `<span class="keyword">${keyword}</span>`;

        gridview.render(list);

        // //内部分页。
        // gridview.render(list, {
        //     no: 1,
        //     size: 20,
        // });

        console.log(gridview);

        // setInterval(function () { 
        //     gridview.meta.table.toggleColumn('id');

        // },2000);

    });


    return {
        fields,
    };


});
