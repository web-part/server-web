

define.panel('/HtmlTree/Main/HtmlLink/BaseInfo/Base', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');

    let markdoc = null;


    let meta = {
        node: null,
    };







    panel.on('init', function () {

        function getHtml(html) {
            markdoc = markdoc || new MarkDoc({
                'container': document.createElement('div'),
            });

            markdoc.render({
                'content': html,
                'language': 'html',
                'code': {
                    numbers: false,
                    language: false,
                },
            });

            html = markdoc.$.html();
            return html;
        }

        panel.template({
            '': function (node) {
                let name = node.data.href ? 'static' : 'block';
                let html = this.fill(name, node);
                return html;
            },

            'static': function (node) {
                let { data, parent, } = node;
                let html = getHtml(data.item);
              

                return {
                    'href': data.href,
                    'file': data.file,
                    'tabs': data.tabs,
                    'no': data.no + 1,
                    'dir': data.link.dir,
                    'rel': html,
                    'parent': `${parent.cid} - ${parent.name}`,
                };
            },

            'block': function (node) {
                let { data, parent, } = node;

                return {
                    'file': data.file,
                    'dir': data.link.dir,
                    'parent': `${parent.cid} - ${parent.name}`,
                };
            },
            
        });
       

        panel.$on('click', {

            '[data-cmd="parent"]': function (event) {
                let id = meta.node.parent.id;
                panel.fire('id', [id]);
            },

            '[data-cmd="file"]': function (event) {
               
                let file = this.innerText;

                panel.fire('file', [file]);
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
