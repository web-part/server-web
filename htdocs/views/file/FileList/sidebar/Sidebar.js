

define.panel('/FileList/Sidebar', function (require, module, panel) {
    const Stat = module.require('Stat');
    const Operation = module.require('Operation');
    const Outline = module.require('Outline');
    const Tabs = module.require('Tabs');


    let meta = {
        width: 0,
    };

    panel.on('init', function () {
        
        Tabs.on({
            'general': function () {
                Stat.show();
                Operation.show();
                Outline.hide();
            },

            'outline': function () {
                Stat.hide();
                Operation.hide();

                Outline.show();
            },

        });

        Operation.on({
            'cmd': function (cmd) {
                panel.fire('operation', cmd);
            },

            'detail': function (visible) {
                meta.width = meta.width || panel.$.width();

                let w = visible ? meta.width : 0;
                panel.$.width(w);
                panel.fire('hide', [w]);
            },
        });

        Outline.on({
            'item': function (item, index) {
                panel.fire('outline', [item, index]);
            },
        });

     
       
    });



    /**
    * 渲染。
    */
    panel.on('render', function ({ detail, item, }) {
        let hasOutline = item.data.type == 'file' && !detail.isImage;

        Stat.render(detail);
        Operation.render({ detail, item, });


        Tabs.render({
            'outline': hasOutline,
        });


    });

    return {
        outline: function (titles) {
            Outline.render(titles);
        },
    };


});