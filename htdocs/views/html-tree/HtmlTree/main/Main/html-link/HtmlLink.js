
define.panel('/HtmlTree/Main/HtmlLink', function (require, module, panel) {
    const Tabs = module.require('Tabs');
    const Content = module.require('Content');
    const FileInfo = module.require('FileInfo');
    const BaseInfo = module.require('BaseInfo');
    const Rel = module.require('Rel');
    const Render = module.require('Render');


    let meta = {
        item: null,
    };

    panel.on('init', function () {

        Tabs.map({
            'base': BaseInfo,
            'file': FileInfo,
            'content': Content,
            'rel': Rel,
            'render': Render,
        });

        Tabs.on({
            'change': function (M) {
                M.render(meta.item);
            },
        });



        [FileInfo, BaseInfo, Rel, Content, ].forEach((M) => {
            M.on({
                'file': function (file) {
                    panel.fire('file', [file]);
                },
                'id': function (id) {
                    panel.fire('id', [id]);
                },
            });
        });

        BaseInfo.on({
            'rel': function () {
                Tabs.active('rel');
            },
        });



    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        meta.item = item;

        Tabs.render();

    });




    return {
        
    };

});
