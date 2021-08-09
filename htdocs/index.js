
/*
* 主控制器。
*/
definejs.launch(function (require, module, nav) {
    const Theme = require('Settings.Theme');
    const Router = module.require('Router');
    const Markdoc = module.require('Markdoc');
    const Master = module.require('Master');
    const Loading = module.require('Loading');


    Loading.show();

    Markdoc.on({
        'loading': function (visible) {
            Loading.toggle(visible);
        },
    });

    Master.on({
        'require': function (name) {
            return module.require(name);
        },

        //就绪后需要快速打开的视图，仅供开发使用。
        //每个人提交代码必须注释掉自己的那个视图。
        'ready': function () {
            // Master.open('FileList', []);
            // Master.open('ModuleTree', []);
            // Master.open('MD5', []);
            // Master.open('Terminal', []);
            // Master.open('Log', []);
            // Master.open('QRCode', []);
            // Master.open('DocAdd', []);
        },

        'render': function () {
            Loading.hide();
            Theme.set();
        },
    });

    Router.on({
        'master': function (view) {
            Markdoc.hide();
            Master.render(view);
        },
        'markdoc': function (url) {
            Master.hide();
            Markdoc.render(url);
        },
    });

    Router.render();



    // const Panel = require('Panel');
    // const $ = require('$');

    // let prefix = './';
    // let key = 'panel';
    // let list = $(`[data-${key}^="${prefix}"]`).toArray();

    // console.log(list)

    // Panel.pad(list, { key, prefix, });

    // Panel.pad();
   

  
});



