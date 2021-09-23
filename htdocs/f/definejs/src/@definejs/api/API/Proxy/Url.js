/**
* src: @definejs/api/modules/API/Proxy/Url.js
* pkg: @definejs/api@2.0.1
*/
define('API/Proxy/Url', function (require, module, exports) { 
    
    const Url = require('Url');
    const Query = require('Query');
    
    
    function make(file, base) {
        //file 是绝对地址
        if (Url.isFull(file)) {
            return file;
        }
    
        //file 是相对地址
    
        //base 是绝对地址。
        if (Url.isFull(base)) {
            return base + file;
        }
    
        //base 是相对地址。
        
        let root = Url.root();
    
        //如果 file 是以 `/` 开头，则表示它相对于网站的根目录。
        //否则，就要加上 base。
        //例如：
        //  root = `http://localhost:3001/htdocs/`;
        //  base = `api/`;
        //  如果 file = `getUsers.js`，则返回 `http://localhost:3001/htdocs/api/getUsers.js`。
        //  如果 file = `/getUsers.js`，则返回 `http://localhost:3001/htdocs/getUsers.js`。
        if (!file.startsWith('/')) {
            root = root + base;
        }
    
        return root + file;
    }
    
    
    module.exports = {
    
        get(file, base) {
            let url = make(file, base);
            url = Query.random(url, 4); //增加随机查询字符串，确保拿到最新的
    
            return url;
        },
    
        isExt(url, ext) {
            return Url.isExt(url, ext);
        },
    };
});