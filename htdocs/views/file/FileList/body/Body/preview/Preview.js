

define.panel('/FileList/Body/Preview', function (require, module, panel) {
    const Tabs = module.require('Tabs');
    const MarkDoc = module.require('MarkDoc');

    let current = {}; //外面传进来的数据。



    panel.on('init', function () {
        Tabs.on({
            'change': function (type) {
                current.type = type;
                MarkDoc.render(current);
            },
        });

        MarkDoc.on({
            'render': function (titles) {
                panel.fire('render', [titles]);
            },
        });

       
    });



    /**
    * 渲染。
    *   options = {
    *       content: '',    //文件内容。
    *       ext: '',        //如 `.json`。
    *       isImage: false, //是否为图片。
    *   };
    */
    panel.on('render', function (options) {
        let isImage = options.isImage;
        let ext = isImage ? '.md' : options.ext; //如果是图片，则当成 `.md` 来展示。


        current = {
            'content': options.content,
            'ext': ext,
            'isImage': isImage,
            'type': '', //在 Tabs.change 会给写入。
        };

        Tabs.render();
    });


    return {
        get: function () {
            return current;
        },

        outline: function (index) {
            MarkDoc.outline(index);
        },

       
    };


});
