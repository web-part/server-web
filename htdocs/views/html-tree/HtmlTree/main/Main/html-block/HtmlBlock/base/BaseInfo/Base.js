

define.panel('/HtmlTree/Main/HtmlBlock/BaseInfo/Base', function (require, module, panel) {
    const Escape = require('@definejs/escape');

    let meta = {
        node: null,
    };







    panel.on('init', function () {

       

        panel.template(function (node) {
            let { data, parent, } = node;
           
            let beginTag = Escape.html(data.tags.begin);
            let endTag = Escape.html(data.tags.end);
            let patterns = JSON.stringify(data.patterns, null, 4);

            return {
                'tabs': data.tabs,
                'beginNo': data.begin + 1,
                'endNo': data.end + 1,
                'beginTag': beginTag,
                'endTag': endTag,
                'patterns': patterns,
                'parent': `${parent.cid} - ${parent.name}`,
            };
        });
       

        panel.$on('click', {

            '[data-cmd="parent"]': function (event) {
                let id = meta.node.parent.id;
                panel.fire('id', [id]);
            },

            '[data-cmd="file"]': function (event) {
                let file = meta.node.data.file;

                panel.fire('file', [file]);
            },

            '[data-cmd="dir"]': function (event) {
                let dir = meta.node.data.link.dir;

                if (dir.endsWith('/')) {
                    dir = dir.slice(0, -1);
                }

                panel.fire('file', [dir]);
            },

            '[data-cmd="rel"]': function (event) {
                panel.fire('rel');
            },
        });




    });




    panel.on('render', function (node) {
        meta.node = node;
        panel.fill(node);

    });

  




});
