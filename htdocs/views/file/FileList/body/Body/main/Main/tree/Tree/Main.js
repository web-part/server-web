

define.panel('/FileList/Body/Main/Tree/Main', function (require, module, panel) {
    const TextTree = require('TextTree');
    const Clipboard = require('Clipboard');
 
    let tree = null;


    panel.on('init', function () {
        tree = new TextTree({
            'container': panel.$,
        });

        tree.on('cmd', function (cmd, item, event) {
            panel.fire('cmd', [cmd, item,]);
        });


        
    });

   


    panel.on('render', function (item, dirOnly) {
        let { parents, } = item;
        let root = parents.slice(-1)[0] || item;

        let list = [
            ...parents,
            item,
        ];

        if (dirOnly) {
            list = [...list, ...item.data.global.dirs];
        }
        else {
            list = [...list, ...item.children];
        }


        list = list.map((item) => {
            let { id, type, } = item;
            let keys = id.split('/');

            if (type == 'dir') {
                keys = keys.slice(0, -1); //最后一项是空串。
            }

            if (id == '/') {
                keys = [item.name];
            }
            else {
                keys = [root.name, ...keys];
            }

            return {
                type,
                keys,
                data: { item, },
                dataset: { id, },
            };
        });
        
        

        tree.render(list);

        tree.$.find(`li[data-id="${item.id}"]`).addClass('current');




    });


    return {
        
        check(opt) {
            tree.toggle(opt);
        },

        copy() {
            let value = tree.toString();
            Clipboard.copy(value);
        },
        
    };



});
