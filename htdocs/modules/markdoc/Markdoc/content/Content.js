
define.panel('/Markdoc/Content', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');

    let markdoc = null;
   

    panel.on('init', function () {

        markdoc = new MarkDoc({
            'container': panel.$.find('[data-id="content"]'),
        });


        
        markdoc.on('render', function (data) {
            let outlines = markdoc.getOutlines();

            panel.fire('render', [{
                'title': data.title,
                'outlines': outlines,
            }]);

        });


        markdoc.on('hash', function (href) {
            panel.fire('hash', [href]);
        });
    });




    /**
    * 
    */
    panel.on('render', function (content, info) {
       
        markdoc.render({
            'content': content,
            'baseUrl': info.url,
            'language': info.isCode ? info.ext : '',
        });

    });






    return {

        'toOutline': function (index) {
            markdoc.toOutline(index);
        },

        'font': function (size) {
            markdoc.$.css({
                'font-size': size + 'px',
            });
        },

    };

});
