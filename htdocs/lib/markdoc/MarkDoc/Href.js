﻿
/**
* 
*/
define('MarkDoc/Href', function (require, module, exports) {
    const Url = module.require('Url');

    return {
        format: function (meta, baseUrl) {

            if (!baseUrl) {
                return;
            }

            //改写 a 标签。
            meta.$.find('a').each(function () {
                let a = this;

                //不要用 a.href，因为 a.href 在浏览器中会给自动补充成完整的 url，而我们是要获取最原始的。
                let href = a.getAttribute('href');

                if (href.startsWith('#') || href.startsWith('?')) {
                    a.setAttribute('target', '_self');
                }

                if (href.startsWith('?')) {

                    href = Url.getHref(href, baseUrl);
                    href = Url.getHash(href);

                    a.setAttribute('href', href);
                }


            });

        },
    };
    
});


