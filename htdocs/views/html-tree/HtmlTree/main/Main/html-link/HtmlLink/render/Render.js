

define.panel('/HtmlTree/Main/HtmlLink/Render', function (require, module, panel) {
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
    panel.on('render', function (node) {
        let content = node.data.link.render;
        let tabs = node.data.tabs;

        if (tabs > 0) {
            let lines = content.split('\n').map((line) => {
                return line.slice(tabs);
            });

            content = lines.join('\n');
        }

        
        markdoc.render({
            'content': content,
            'language': 'html',
            'baseUrl': '',
            'code': {
                'format': true,
            },
        });


        
    });


    return {

    };

});
