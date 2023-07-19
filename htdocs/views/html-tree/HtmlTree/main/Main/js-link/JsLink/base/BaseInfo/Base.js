

define.panel('/HtmlTree/Main/JsLink/BaseInfo/Base', function (require, module, panel) {
    const MarkDoc = require('MarkDoc');

    let markdoc = null;


    let meta = {
        node: null,
        dir: '',
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
                let name = node.data.html ? 'static' : 'block';
                let html = this.fill(name, node);
                return html;
            },

            'static': function (node) {
                let { data, parent, } = node;
                let { file, } = data;
                let dir = file.split('/').slice(0, -1).join('/') + '/';

                let html = getHtml(data.html);

                return {
                    'type': data.link.type,
                    'href': data.href,
                    'file': file,
                    'tabs': data.tabs,
                    'no': data.no + 1,
                    'dir': dir,
                    'rel': html,
                    'parent': `${parent.cid} - ${parent.name}`,
                };
            },

            'block': function (node) {
                let { data, parent, } = node;
                let { file, } = data;
                let dir = file.split('/').slice(0, -1).join('/') + '/';


                return {
                    'type': data.link.type,
                    'file': file,
                    'dir': dir,
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
        console.log({node})
        meta.node = node;
        panel.fill(node);

    });

  




});
