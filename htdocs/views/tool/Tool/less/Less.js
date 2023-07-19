

define.panel('/Tool/Less', function (require, module, panel) {
    const Clipboard = require('Clipboard');

    const Data = module.require('Data');
    const API = module.require('API');
    const Editor = module.require('Editor');
    const Preview = module.require('Preview');
    const Themes = module.require('Themes');
    const Header = module.require('Header');



    let meta = {
        content: '',
        minify: false,
        css: '',
    };

    panel.on('init', function () {

        API.on({
            'success': function ({ css, md5, }) {
                meta.css = css;

                Header.set(md5);

                Preview.render({
                    'content': css,
                    'ext': '.css',
                    'minify': meta.minify,
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
                    Clipboard.copy(meta.css);
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

            'check': function (key$checked) {
                meta.minify = key$checked['minify'];
                Header.set('');
                Preview.render();
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
                API.compile(meta);
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
            API.compile(meta);
        }

    });



});