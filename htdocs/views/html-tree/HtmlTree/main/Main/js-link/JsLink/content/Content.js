

define.panel('/HtmlTree/Main/JsLink/Content', function (require, module, panel) {
    const File = require('File');
    const API = module.require('API');
    const Header = module.require('Header');
    const MarkDoc = module.require('MarkDoc');

    let meta = {
        file: '',
    };


    panel.on('init', function () {
       
        Header.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });
       

        API.on('success', {
            'read': function (content) {
                let { file, } = meta;
                MarkDoc.render({ file, content, });

            },
        });
    });



    /**
    * 渲染。
    */
    panel.on('render', function (node) {
        let { file, } = node.data;

        if (file == meta.file) {
            return;
        }
        
        meta.file = file;
        Header.render(file);
        API.read(file);
       
       
    });


    return {

    };

});
