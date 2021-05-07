
/**
* 标题相关的。
*/
define('MarkDoc/Titles', function (require, module, exports) {
    const $ = require('$');


    return {

        render: function (meta) {
            let sample = meta.samples['title'];
            let selector = meta.titles.selector;
            let title = ''; //取第一个 title 作为浏览器标题。

            meta.$.find(selector).each(function () {
                let $this = $(this);
                let list = $this.nextUntil(selector);

                title = title || $this.text();
                $this.wrapInner(sample);
                $this.toggleClass('title', list.length > 0);

            });

            return title;

        },
    };
    
});


