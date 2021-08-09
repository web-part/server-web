

define.panel('/HtmlTree/Main/HtmlLink/Content/MarkDoc', function (require, module, panel) {
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
            let lis = [];

            markdoc.$.find(`ul.line-numbers>li`).each(function (index) {
                let li = this;

                if (beginNo <= index && index <= endNo) {
                    $(li).addClass('on');
                    lis.push(li);
                }
            });

            //滚动到可视范围。
            if (lis.length > 0) {
                setTimeout(() => {
                    lis[0].scrollIntoViewIfNeeded();
                }, 200);
            }

        },
    };

});
