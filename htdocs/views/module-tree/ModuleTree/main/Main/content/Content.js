

define.panel('/ModuleTree/Main/Content', function (require, module, panel) {
    const Header = module.require('Header');
    const Tabs = module.require('Tabs');
    const MarkDoc = module.require('MarkDoc');



    let meta = {
        jsInfo: null,
        htmlInfo: null,
    };

    panel.on('init', function () {
        function render(info) {
            Header.render(info.file);
            MarkDoc.render(info);
        }

        
        Header.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });

        Tabs.on({
            'js': function () {
                render(meta.jsInfo);
            },
            'html': function () {
                render(meta.htmlInfo);
            },
        });

        MarkDoc.on({
            'render': function (titles) {
                panel.fire('render', [titles]);
            },
        });


    });



    /**
    * 渲染。
    *   options = {
    *       content: '',    //文件内容。
    *       ext: '',        //如 `.json`。
    *       isImage: false, //是否为图片。
    *   };
    */
    panel.on('render', function ({ item, stat, }) {
        meta.item = item;
        meta.stat = stat;

        let { id, } = item.data;
        let jsInfo = stat.moduleStat.id$info[id];
        let htmlInfo = stat.htmlStat.id$info[id];

        meta.jsInfo = jsInfo;
        meta.htmlInfo = htmlInfo;


        Tabs.render({
            'js': jsInfo,
            'html': htmlInfo,
        });
    });


    return {


    };
});
