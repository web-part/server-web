

define.panel('/HtmlTree/Main/HtmlLink/Content', function (require, module, panel) {
    const Data = module.require('Data');
    const Header = module.require('Header');
    const MarkDoc = module.require('MarkDoc');



    panel.on('init', function () {
       
        Header.on({
            'file': function (file) {
                panel.fire('file', [file]);
            },
        });
       
    });



    /**
    * 渲染。
    */
    panel.on('render', function (node) {
        let { file, content, } = Data.get(node);
        
        Header.render(file);
        MarkDoc.render(content);
       
       
    });


    return {

    };

});
