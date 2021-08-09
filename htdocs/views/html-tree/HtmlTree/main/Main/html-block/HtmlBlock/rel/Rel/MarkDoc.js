

define.panel('/HtmlTree/Main/HtmlBlock/Rel/MarkDoc', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');
    const $ = require('$');

    let markdoc = null;


    panel.on('init', function () {
        markdoc = new MarkDoc({
            'container': panel.$,
        });
        
       
    });



    /**
    * 渲染。
    */
    panel.on('render', function (content) {

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
        highlight(beginNo, endNo) {
            //高亮行号。

            let list = markdoc.$.find(`ul.line-numbers>li`).toArray();
            
            list = list.slice(beginNo, endNo + 1);

            list.forEach((li) => {
                $(li).addClass('on');
            });

            //滚动到可视范围。
            setTimeout(() => {
                list[0].scrollIntoViewIfNeeded();
            }, 200);

        },
    };

});
