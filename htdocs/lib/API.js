
/**
* API。 
* 主要实现自动加上 token 字段。
*/
define('API', function (require, module, exports) {
    const $API = require('@definejs/api');
    

    function API(name, config) {
        let api = new $API(name, config);
        let get = api.get.bind(api);
        let post = api.post.bind(api);

      

        api.post = function (data, query) {
            return post({ 'data': data, }, query);
        };



        return api;
    }

    return API;
   

});