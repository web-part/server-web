
define('MenuTree/Data', function (require, module, exports) {
    const IDMaker = require('@definejs/id-maker');

    let idmaker = new IDMaker('MenuTree');


    function make(list, parent, context, fn) {
        if (!list) {
            return [];
        }
        

        list = list.map((item) => {
            let id = item.id;

            //针对非字符串类型的 id，尝试转成 json 字符串。
            if (typeof id != 'string') {
                id = JSON.stringify(id);

                //如果转换后依然不是字符串，则自动分配。
                if (typeof id != 'string') {
                    id = idmaker.next('item');
                }
            }

            context.cid++;

            let node = {
                'id': id,
                'cid': context.cid,
                'level': 0,
                'type': item.type,
                'name': item.name,
                'open': item.open,
                'dirIcon': item.dirIcon,
                'fileIcon': item.fileIcon,
                'style': item.style,
                'dataset': item.dataset,
                'data': item.data || {},
                'list': [],
                'parent': parent || null,
                'parents': [],      //向上追溯所有的父节点。
                'children': [],     //全部子节点，包括直接的和间接的。

            };

            node.list = make(item.list, node, context, fn);


            //向上追溯找出所有的父节点。
            exports.trace(node, function (parent) {
                parent.children.push(node);
                node.parents.push(parent);
            });

            node.level = node.parents.length;

            node.children.sort((a, b) => {
                return a.cid - b.cid;
            });
            

            fn(node);

            return node;

        });

        return list;
    }


    return exports = {

        make(list) {
            let id$item = {};
            let cid$item = {};
            let items = [];
            let context = { cid: 0, };

            list = make(list, null, context, function (node) {
                id$item[node.id] = node;
                cid$item[node.cid] = node;
                items.push(node);
            });
            

            let data = { list, items, id$item, cid$item, };

            return data;

        },


        /**
        * 向上追溯指定节点的所有父节点直到根节点，迭代执行指定的回调函数。
        * @param {Object} node 树节点。
        * @param {function} fn 要执行的回调函数。
        */
        trace(node, fn) {
            let parent = node.parent;

            if (!parent) {
                return;
            }

            fn(parent);

            exports.trace(parent, fn);
        },


        each(node, fn) { 
            fn(node);

            node.list.forEach((node, index) => {
                exports.each(node, fn);
            });
           
        },
       
    };

});
