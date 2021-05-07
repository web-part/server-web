


module.exports = {
    //可选。
    //代理规则。
    proxy: require('./server/proxy'),

    port: 'auto',       //必选，端口号。
    beginPort: 3001,    //当 port 为 `auto` 时，开始搜索的端口号。
    open: false,        //可选，是否自动打开浏览器。

    //可选。
    //生成对应的二维码页面。
    qr: {
        path: '/qr',    //二维码页面的虚拟地址。
        size: 10,       //二维码图片的大小。
    },

    //可选。
    //要映射生成的静态虚拟目录。
    //支持一对多的关系，会根据目录的添加顺序查找所需的文件。
    statics: {
        // '/': './htdocs/',
        '/htdocs': './htdocs/',
        '/build': './output/build/htdocs/',

        // '/test': [
        //     './a/',
        //     './b/',
        // ],
    },

    api: {
        allowCrossOrigin: true,
        stat: require('./stat'),
    },


    done: function (app, server) {
        // const api = require('@webpart/server-api');
        // const stat = require('./stat');

        // api.start(app, {
        //     'server': server,
        //     'stat': stat,
        // });
    },


};