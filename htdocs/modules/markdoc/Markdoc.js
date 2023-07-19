

define.panel('/Markdoc', function (require, module, panel) {
    const File = require('File');
    const Header = module.require('Header');
    const Content = module.require('Content');
    const Url = module.require('Url');
    const Outline = module.require('Outline');
    const Tools = module.require('Tools');


    panel.on('init', function () {

        Header.on({
            'check': function (cmd, checked) {
                panel.$.toggleClass(`no-${cmd}`, !checked);
            },
        });
       


   


        Content.on({
            'render': function ({ title, outlines, }) {
                document.title = title;
                Outline.render(outlines);
                Tools.render();
            },

        });

        Outline.on({
            'item': function (item, index) {
                Content.toOutline(index);
            },
        });

        Tools.on({
            'top': function () { },
            'bottom': function () {
                let h = panel.$.get(0).scrollHeight;
                console.log(module.id, h);

                scrollTo(0, h);
            },
            'outline': function () {
                Outline.toggle();
            },


            'print': function () {
                //切换打印模式和正常模式。
                function print() {
                    panel.$.toggleClass('print');
                }

                print();

                //同步模式，打印窗口关闭后会有返回值。
                document.execCommand('print') && print();
            },

            'font': function (size) {
                
                Content.font(size);
            },
        });

    });


    /**
    *
    */
    panel.on('render', function (url) {
        let info = Url.parse(url);

        console.log(info);

        //切换普通模式和代码模式。
        panel.$.toggleClass('source', info.isCode);

        //针对代码模式的头部工具栏，仅代码模式时显示。
        Header.render(info);


        File.read(info.url, function (content) {
            Content.render(content, info);

            panel.fire('loading', [false]);

        });

       
        
    });




    return {


    };


});