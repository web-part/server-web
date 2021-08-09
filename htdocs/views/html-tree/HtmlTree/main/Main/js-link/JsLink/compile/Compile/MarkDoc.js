

define.panel('/HtmlTree/Main/JsLink/Compile/MarkDoc', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');

    let markdoc = null;


    panel.on('init', function () {
        markdoc = new MarkDoc({
            'container': panel.$,
        });
        
       
    });



    /**
    * 渲染。
    */
    panel.on('render', function (css) {

        markdoc.render({
            'content': css,
            'language': 'css',
        });

        
       
    });


    return {
        
    };

});
