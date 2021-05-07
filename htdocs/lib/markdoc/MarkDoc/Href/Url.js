
/**
*/
define('MarkDoc/Href/Url', function (require, module, exports) {
    const Query = require('@definejs/query');
    const Hash = require('@definejs/hash');
    const resolveUrl = require('resolveUrl');


    //获取相对路径
    function relative(baseUrl, file) {

        //不是以 './' 或 '../' 开头的，不处理
        if (file.indexOf('.') != 0) {
            return file;
        }

        let dir = baseUrl.split('/').slice(0, -1).join('/') + '/';  //提取出目录
        let url = resolveUrl(dir, file);    //获取完整 url
        let root = resolveUrl('./');        //当前页面的目录，因为是单页，所以是网站根目录。

        url = url.slice(root.length);

        return url;
    }


  


    return {
        /**
        * 根据相对路径获取最终路径。
        */
        getHref: function (href, baseUrl) {

            let qs = Query.get(href) || {};
            let file = qs.file;
            let dir = qs.dir;

            if (!file) {
                return href; //原样返回
            }

            if (dir) {
                dir = relative(baseUrl, dir);
            }

            let list = file.split(',');

            list = list.map(function (file) {
                file = relative(baseUrl, file);
                return file;
            });

            file = list.join(',');
            

            if (dir) {
                href = Query.add(href, 'dir', dir);
            }

            href = Query.add(href, 'file', file);

            return href;
        },



        //把超链接中以查询字符串开头的 url 改成以 hash 开头。
        //主要是为了方便用户写链接，因为查询字符串比复合结构的 hash 容易写。
        getHash: function (href) {
            let qs = Query.get(href);
            let hash = Hash.set('', qs); //把查询字符串变成 hash

            return hash;
        },
    };




   




});
