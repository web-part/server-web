

define.panel('/HtmlTree/Tree', function (require, module, panel) {
    const SidebarTree = require('SidebarTree');
    const Data = module.require('Data');

    let tree = null;

    panel.on('init', function () {

        tree = new SidebarTree({
            'container': panel.$,
            'width': panel.$.width(),
            // 'fileIcon': 'fas fa-file-alt',
            'dirIcon': {
                close: 'fas fa-file-alt',
                open: 'far fa-file-alt',
            },
        });

        tree.on({
            'item': function (...args) {

                panel.fire('item', args);
            },
            'dir': function (...args) {
                panel.fire('dir', args);
            },
            'resize': function () {
                let w = tree.$.outerWidth();

                panel.$.width(w);
                panel.fire('resize');
            },
            'fill': {
                'name': function (item) {

                    let { name, cid, list, } = item;
                    let text = `${cid} - ${name}`;

                    if (list.length > 0) {
                        text = `${text} <b class="child-count">(${list.length})</b>`
                    }

                    return text;
                },
            },
        });


    });

   


    /**
    * 渲染。
    *   
    */
    panel.on('render', function (json) {
        let list = Data.make(json);

        tree.render(list);
        
    });



    return {
        open: function (id) {
            tree.open(id);
        },
    };


});