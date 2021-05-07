
/**
* 
*/
define('TextTree/Meta', function (require, module, exports) {
    const $String = require('@definejs/string');
    const Tree = require('@definejs/tree');

    let count = 0;

    
    function makeData(list, seperator) {
        let id$item = {};
        let id$parent = {};
        let id$parents = {};
        let id$childs = {};
        let id$children = {};
        let id$siblings = {};
        let id$index = {};

        let ids = list.map((item, index) => {
            let { id, } = item;
            let names = id.split(seperator);
            let name = names.slice(-1)[0];
            let parent = null;
            let parents = [];

            id$item[id] = item;

            if (names.length > 1) {
                let pid = parent = names.slice(0, -1).join(seperator); //父模块 id。
                let childs = id$childs[pid] || [];

                childs.push(id);
                id$childs[pid] = childs;

                parents = names.map((name, index) => {
                    return names.slice(0, index + 1).join('/');
                });
                parents = parents.reverse();
                parents = parents.slice(1);
            }

            id$parent[id] = parent;
            id$parents[id] = parents;


            return id;
        });



        ids.forEach((id, index) => {
            //收集指定模块下的所有子模块（包括间接子模块）。
            let children = ids.filter((mid) => {
                return mid.startsWith(`${id}${seperator}`);
            });

            id$children[id] = children;
            id$index[id] = index;

            let parent = id$parent[id];

            if (typeof parent == 'string') {
                let childs = id$childs[parent] || [];

                //从兄弟结点中过滤掉自己。
                let siblings = childs.filter((mid) => {
                    return mid != id;
                });

                id$siblings[id] = [...new Set(siblings)];
            }
        });


        let info = { ids, id$item, id$children, id$childs, id$parent, id$parents, id$siblings, id$index, };

        console.log(info);
        return info;
    }



    return {

        create: function (config, others) {
            let id = `TextTree-${count++}-${$String.random(4)}`;

            let meta = {
                id,
                'seperator': config.seperator,
                'secondaryKey': config.secondaryKey,
                'container': config.container,
                'emptyText': config.emptyText,

                'showSecondary': config.showSecondary,
                'showIcon': config.showIcon,
                'showTab': config.showTab,
                'showColor': config.showColor,
                'showHover': config.showHover,
                
                'highlightIndex': -1, //当前高亮的项。


                'items': [],        //tree 渲染后对应的列表，排序可能跟传入的 list 不同，以渲染后的为准。
                'id$item': {},
                'id$index': {},
                'id$children': {},
                'id$childs': {},
                'id$parent': {},
                'id$parents': {},
                'id$siblings': {},

                'tree': null,
                '$': null,
                'this': null,
                'emitter': null,
                'tpl': null,

                'makeData': function (list, seperator) {
                    list = list || [];
                    seperator = seperator || meta.seperator;

                    let data = makeData(list, seperator);

                    Object.assign(meta, {
                        'id$item': data.id$item,
                        'id$index': data.id$index,
                        'id$children': data.id$children,
                        'id$childs': data.id$childs,
                        'id$parent': data.id$parent,
                        'id$parents': data.id$parents,
                        'id$siblings': data.id$siblings,
                    });

                    return data;
                },

                'toggleHideClass': function (cls, visible) {
                    if (!meta.$) {
                        return;
                    }

                    if (typeof visible == 'boolean') {
                        meta.$.toggleClass(cls, !visible);
                    }
                    else {
                        meta.$.toggleClass(cls);
                    }
                },


            };

            let { ids, } = meta.makeData(config.list);
            meta.tree = new Tree(ids, meta.seperator);

            Object.assign(meta, others);



            return meta;
           
        },


    };
    
});


