
/**
* 
*/
define('TextTree/Data', function (require, module, exports) {
    const $String = require('@definejs/string');
    const Tree = require('@definejs/tree');

    return {

        /**
        * 
        */
        make(raws, trimLeft) {
            let tree = new Tree();

            raws.forEach((raw) => {
                tree.set(raw.keys, raw);
            });

            let item$node = new Map();
            let node$item = new Map();
            let id$item = {};

            let list = tree.render(function (node, info) {
                let raw = node.value || {};
                let id = raw.id || $String.random();
                let { tabs, linker, } = info;

                if (trimLeft) {
                    if (tabs) {
                        tabs = tabs.slice(4);
                    }
                    else {
                        linker = linker.slice(4);
                    }
                }

                let item = {
                    'id': id,
                    'class': raw.class,
                    'dataset': raw.dataset,
                    'title': raw.title,
                    'style': raw.style,
                    'value': raw.value,
                    'icon': raw.icon,
                    'data': raw.data, //节点的自定义数据，仅用来存储在当前节点，以便后续用户再读取出来使用。
                    'type': raw.type, //`dir` 或 `file`，如果未指定，则自动推算。

                    'isRoot': node.isRoot,
                    'key': node.key,
                    'keys': node.keys,
                    'x': node.x,
                    'y': node.y,
                    'tabs': tabs,
                    'linker': linker,

                    'parent': null,
                    'childs': [],
                    'siblings': [],

                    'closed': false,            //记录主动关闭的项。 即由用户手动关闭的，而非程序关闭的。
                    'raw': node.value,          //如果为空，则为虚拟节点。 即由于适应树形结构而必须构造出的辅助节点。
                };

                id$item[id] = item;    //
                item$node.set(item, node);
                node$item.set(node, item);

                return item;
            });

            list.forEach((item) => {
                let node = item$node.get(item);

                let childs = node.nodes.map((node) => {
                    return node$item.get(node);
                });

                if (!item.type) {
                    item.type = childs.length > 0 ? 'dir' : 'file';
                }

                item.childs = childs;

                item.parent = node$item.get(node.parent);

                item.siblings = node.siblings.map((node) => {
                    return node$item.get(node);
                });
            });

            return {
                list,
                id$item,
            };

        },


    };

});


