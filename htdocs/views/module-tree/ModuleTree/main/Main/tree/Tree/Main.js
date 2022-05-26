

define.panel('/ModuleTree/Main/Tree/Main', function (require, module, panel) {
    const TextTree = require('TextTree');
    const Clipboard = require('Clipboard');
 
    let tree = null;




    panel.on('init', function () {
        tree = new TextTree({
            'container': panel.$,
        });

        tree.on('cmd', function (cmd, item) {
            
            panel.fire('cmd', [cmd, item,]);
        });

        tree.on('click', {
            'key': function (item, event) { 
                panel.fire('cmd', ['id', item.data.id]);
            },
            'value': function (item, event) { 
              
                panel.fire('cmd', ['file', item.data.file]);
            },
        });

     
    });

   


    panel.on('render', function (opt) {
        let { id, ids, id$file, } = opt;

        let list = ids.map((id) => {
            let file = id$file[id];
            let keys = id.split('/');

            keys = keys.map((key) => {
                return key || module.data.none;
            });

            return {
                'keys': keys,
                'value': file,

                //自定义数据，方便后续访问。
                'data': {
                    id,
                    file,
                },

            };
        });

       
        
        tree.render(list);

        if (typeof id == 'string') {
            // tree.highlight(id);
        }


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
