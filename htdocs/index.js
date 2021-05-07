
/*
* 主控制器。
*/
definejs.launch(function (require, module, nav) {
    const Master = module.require('Master');
    const Loading = module.require('Loading');

    Loading.hide();



    Master.on({
        'require': function (name) {
            return module.require(name);
        },

        //就绪后需要快速打开的视图，仅供开发使用。
        //每个人提交代码必须注释掉自己的那个视图。
        'ready': function () {
            // Master.open('Home', []);
            Master.open('FileList', []);
            // Master.open('ModuleTree', []);
            // Master.open('MD5', []);
            // Master.open('Terminal', []);
            // Master.open('Log', []);
        },

        'render': function () {

        },
    });

    
    Master.render();








  
});



