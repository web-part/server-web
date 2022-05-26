

define.panel('/FileList/Body/Main/Tree/Main', function (require, module, panel) {
    const TextTree = require('TextTree');
    const Clipboard = require('Clipboard');
 
    let tree = null;

    let meta = {
        $view: null,
    };



    panel.on('init', function () {
        tree = new TextTree({
            'container': panel.$,
        });

        tree.on('cmd', function (cmd, item) {
            panel.fire('cmd', [cmd, item,]);
        });

        
    });

   


    panel.on('render', function (opt) {
        let { id, list, } = opt;

        list = list.map((item) => {
            let keys = item.id.split('/');

            return {
                'keys': keys,
            };
        });


        tree.render(list);

        // if (typeof id == 'string') {
        //     tree.highlight(id);
        // }


        panel.fire('render');


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
