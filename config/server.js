
const stat = require('./stat');
const master = require('./master');
const proxy = require('./server/proxy');


module.exports = {
    port: 'auto',       //必选，端口号。
    beginPort: 3001,    //当 port 为 `auto` 时，开始搜索的端口号。

    file: './output/server.json',

    //可选。
    //要映射生成的静态虚拟目录。
    //支持一对多的关系，会根据目录的添加顺序查找所需的文件。
    statics: {
        // '/': '',
        '/': './htdocs/',
        '/htdocs': './htdocs/',
        '/build': './output/build/htdocs/',
        
        // '/test': [
        //     './a/',
        //     './b/',
        // ],
    },

   
    api: {
        api: '/api',
        sse: '/api/sse',
        allowCrossOrigin: false,

        stat,
        master,
        
    },

    //可选。
    //生成对应的二维码页面。
    qrcode: {
        path: '/qrcode',    //二维码页面的虚拟地址。
        size: 10,           //二维码图片的大小。
        margin: 1,          //周边的空白。
    },


    //可选。
    //代理规则。
    proxy,

    done: function (app, info) {
        // console.log(info);
    },


};