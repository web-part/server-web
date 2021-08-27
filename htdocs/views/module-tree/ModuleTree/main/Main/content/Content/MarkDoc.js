

define.panel('/ModuleTree/Main/Content/MarkDoc', function (require, module, panel) {
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
    panel.on('render', function (info) {
        if (!info) {
            markdoc.render({
                'content': '暂无内容',
                'language': '',
            });
            return;
        }

        let { content, ext, } = info;
        let language = ext.slice(1);


        markdoc.render({
            'content': content,
            'language': language,
            'baseUrl': '',
            'code': {
                'format': false,
            },
        });


       
    });


    return {
       

    };

});
