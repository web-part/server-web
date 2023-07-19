

define.panel('/FileList/Body/Preview/MarkDoc', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');

    let markdoc = null;

    let previewExts = [
        'md',
        'markdown',
        'txt',
        // 'html',
    ];

    

    panel.on('init', function () {
        markdoc = new MarkDoc({
            container: panel.$,
        });

        markdoc.on('render', function (info) {
           
            let list = markdoc.getOutlines();

            panel.fire('outlines', [list]);

        });
       
    });



    /**
    * 渲染。
    */
    panel.on('render', function ({ content, type, ext, isImage, }) {
        console.log({ type })
        
        if (isImage) {
            ext = 'md';
        }

        let language = '';
        let format = true;

        if (previewExts.includes(ext)) {
            if (type == 'code') {
                language = ext;
            }
        }
        else {
            language = ext;
            if (type == 'code') {
                format = false;
            }
        }


        markdoc.render({
            content,
            language,
            code: { format, },
        });

        panel.$.toggleClass('image', !!isImage);

       
    });


    return {
        outline: function (index) {
           

            markdoc.toOutline(index);


        },

    };

});
