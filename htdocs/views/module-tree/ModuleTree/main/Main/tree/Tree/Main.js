

define.panel('/ModuleTree/Main/Tree/Main', function (require, module, panel) {
    const $String = require('@definejs/string');
    const $ = require('$');
    const TextTree = require('TextTree');
    const Clipboard = require('Clipboard');

    const { none, } = module.data;

 
    let tree = null;




    panel.on('init', function () {
        tree = new TextTree({
            'container': panel.$,
        });


        tree.on('cmd', {
            'key': function (item, event) { 
                panel.fire('id', [item.data.id]);
            },
            'value': function (item, event) { 
                panel.fire('file', [item.data.file]);
            },
        });

     
    });

   


    panel.on('render', function (item) {
        let currentId = null;
        let nodeId = 'current-' + $String.random();
        let list = [];

        //非根节点
        if (item.parent) {
            let { parents, } = item;
            list = parents.slice(0).reverse();//需要复制一份再反转，否则会影响原来的。
            list = [...list, item,];
            currentId = item.data.module.id;
        }


        list = [...list, item, ...item.children,];

        list = list.slice(1).map((item, index) => {
            let { id, file, names, } = item.data.module;

            let keys = names.map((key) => {
                return key || none;
            });


            return {
                'id': id === currentId ? nodeId : '',
                'keys': keys,
                'value': file,
                'data': { id, file, }, //自定义数据，方便后续访问。
            };
        });

        tree.render(list);

        
        if (typeof currentId == 'string') {
            $(`#${nodeId}`).addClass('on');
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
