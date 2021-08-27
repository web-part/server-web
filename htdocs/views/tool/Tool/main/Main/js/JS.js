

define.panel('/Tool/Main/JS', function (require, module, panel) {
    const Clipboard = require('Clipboard');

    const Data = module.require('Data');
    const API = module.require('API');
    const Editor = module.require('Editor');
    const Preview = module.require('Preview');
    const Themes = module.require('Themes');
    const Header = module.require('Header');



    let meta = {
        content: '',
        js: '',
    };

    panel.on('init', function () {

        API.on({
            'success': function ({ js, md5, }) {
                meta.js = js;

                Header.set(md5);

                Preview.render({
                    'content': js,
                    'ext': '.js',
                    'minify': true,
                });
            },
            'fail': function (error) {
                Editor.highlight(error.line);
            },
        });


        Header.on({
            'cmd': {
                'themes': function () {
                    Themes.toggle();
                },
                'copy': function () {
                    Clipboard.copy(meta.js);
                },
            },


            'editor': function (cmd) {
                Editor.call(cmd);
            },

            'switch': {
                'crlf': function (on) {
                    Editor.set('lineWrapping', on);
                },
                'fullscreen': function (on) {
                    panel.fire('fullscreen', [on]);
                },
                'column': function (on) {
                    panel.$.toggleClass('full-editor', !on);
                },
            },
            
        });

        Themes.on({
            'item': function (name) {
                Editor.setTheme(name);
            },
        });


        Editor.on({
            'scroll': function (info) {
                Preview.scroll(info);
            },

            //填充内容、修改内容时，都会触发。
            'change': function ({ content, }) {
                meta.content = content;
                Data.set(content);
                Header.set('');
                Preview.render();
            },
        });


        Preview.on({
            'compile': function () {
                API.minify(meta.content);
            },
            'scroll': function (info) {
                Editor.scroll(info);
            },
        });

       


    });


    /**
    * 渲染内容。
    * 处理的优先级如下：
    */
    panel.on('render', function (value) {
        let content = value || Data.get();

        Editor.render({ content, });
        Header.render();
        Themes.render();

        if (value) {
            API.minify(value);
        }

    });



});