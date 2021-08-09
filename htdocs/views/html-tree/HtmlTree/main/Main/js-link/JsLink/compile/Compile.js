

define.panel('/HtmlTree/Main/JsLink/Compile', function (require, module, panel) {
    const API = module.require('API');
    const Header = module.require('Header');
    const MarkDoc = module.require('MarkDoc');



    panel.on('init', function () {
       
        Header.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });
       

        API.on('success', {
            'compile': function (data) {
                MarkDoc.render(data.css);
            },
        });
    });



    /**
    * 渲染。
    */
    panel.on('render', function (node) {
        let { file, dest, } = node.data;

        Header.render(dest.file);

        API.compile({
            'file': file,
            'dest': dest.file,
        });
       
       
    });


    return {

    };

});
