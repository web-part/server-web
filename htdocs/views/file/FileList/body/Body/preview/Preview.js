

define.panel('/FileList/Body/Preview', function (require, module, panel) {
    const File = require('File');
    const Tabs = module.require('Tabs');
    const MarkDoc = module.require('MarkDoc');

    let meta = {
        item: null,
    };


    panel.on('init', function () {
        Tabs.on({
            'change': function (type) {
                let { ext, isImage, content, } = meta.item.data;
                MarkDoc.render({ type, content, ext, isImage, });
            },
        });

        MarkDoc.on({
            'outlines': function (outlines) {
                panel.fire('outlines', [outlines]);
            },
        });

        
       
    });



    /**
    * 渲染。
    */
    panel.on('render', function (item) {
        meta.item = item;

        File.read(item.id, function (content) { 
            item.data.content = content;
            Tabs.render();
        });
    });


    return {

        outline: function (index) {
            MarkDoc.outline(index);
        },

       
    };


});
