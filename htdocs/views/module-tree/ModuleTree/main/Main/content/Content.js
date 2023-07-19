

define.panel('/ModuleTree/Main/Content', function (require, module, panel) {
    const Header = module.require('Header');
    const Tabs = module.require('Tabs');
    const MarkDoc = module.require('MarkDoc');
    const API = module.require('API');



    let meta = {
        js: null,
        html: null,
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
                render(meta.js);
            },
            'html': function () {
                render(meta.html);
            },
        });

        MarkDoc.on({
            'render': function (titles) {
                panel.fire('render', [titles]);
            },
        });


        API.on('success', {
            'read': function (file$item) {
                
                let { js, html, } = meta;

                if (js) {
                    js.content = file$item[js.file].content;
                }

                if (html) {
                    html.content = file$item[html.file].content;
                }

                console.log(meta)

                Tabs.render({ js, html, });
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


        let { id, file, } = item.data.module;
        let { moduleStat, htmlStat, } = stat;
        let html = htmlStat.id$module[id];
        let files = [file];

        meta.js = { file, };
        meta.html = null;

        if (html) {
            let { file, } = html;

            files.push(file);
            meta.html = { file, };
        }

       

        API.read(files);
    });


    return {


    };
});
