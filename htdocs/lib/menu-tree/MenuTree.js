
/**
* 菜单树。
*/
define('MenuTree', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const $ = require('$');
    const Defaults = require('Defaults');
    const Events = module.require('Events');
    const Meta = module.require('Meta');
    const Template = module.require('Template');


    let mapper = new Map();


    function MenuTree(config) {
        config = Defaults.clone(module, config);

        let emitter = new Emitter(this);

        let meta = Meta.create(config, {
            'this': this,
            'emitter': emitter,
        });

        mapper.set(this, meta);


        Object.assign(this, {
            'id': meta.id,
            '$': meta.$,
        });

    }




    MenuTree.prototype = {
        constructor: MenuTree,

        id: '',
        $: null,

        /**
        * 渲染组件。
        */
        render: function (list) {
            let meta = mapper.get(this);

            meta.$ = $(meta.container);
            meta.tpl = Template.create(meta);

            list && this.fill(list);
            
            meta.$.show();
            meta.$.addClass('MenuTree');
            Events.bind(meta);
        },


        /**
        * 填充列表数据。
        * 会触发 `fill` 事件。
        */
        fill: function (list) {
            let meta = mapper.get(this);
            let current = meta.current;

            //深拷贝，避免影响业务层数据，因为组件内部要添加 id 等额外的字段。
            list = JSON.stringify(list);
            list = JSON.parse(list);

            meta.list = list;
            meta.id$item = {};      //清空。
            meta.eid$item = {};     //

            this.each(meta.init);
            this.each(meta.open);

            meta.fill(list);

            //填充后，所有的 eid 可能会重新分配了。
            //如果之前已记录了当前激活的项，则需要根据 id 重新获取对应的项。
            //以便后续可以使用到正确 eid 等字段。
            if (current) {
                meta.current = this.get(current.id);
            }

            meta.emitter.fire('fill', [list]);
        },

        /**
        * 插入一个数据节点到指定位置。
        * 已重载 insert(item, parent, index);  //传入的 parent 是一个 item 对象。
        * 已重载 insert(item, id, index);      //传入的 parent 是一个 id 字符串。
        * 已重载 insert(item, index); 
        * 已重载 insert(item); 
        */
        insert: function (item, parent, index) {
            let meta = mapper.get(this);

            switch (typeof parent) {
                case 'string':   //重载 insert(item, id, index);
                    let pid = parent;
                    parent = meta.id$item[pid];

                    if (!parent) {
                        throw new Error('不存在 id 为 ' + pid + ' 的父节点。');
                    }
                    break;

                case 'number': //重载 insert(item, index); 
                    index = parent;
                    parent = null;
                    break;
            }

            parent = parent || null;
            item.parent = parent;
            meta.init(item);
            meta.open(item);

            MenuTree.each(item.list, meta.init);
            MenuTree.each(item.list, meta.open);

            let list = parent ? parent.list : meta.list;
            let length = list.length;

            if (index === undefined || index >= length) {
                list.push(item);
            }
            else {
                list.splice(index, 0, item);
            }

            meta.fill(); //重新填充。
            meta.emitter.fire('insert', [item]);

        },

        /**
        * 在当前已激话的菜单项后面插入一个数据节点。
        */
        add: function (item) {
            let meta = mapper.get(this);
            let parent = meta.current || null;

            this.insert(item, parent);
            meta.emitter.fire('add', [item]);
        },

        /**
        * 删除一个节点。
        * 已重载 delete(item);     //传入一个具体的 item，里面必须包含 id 字段。
        * 已重载 delete(id);       //传入一个 item 的 id 字符串。
        */
        delete: function (item) {
            let meta = mapper.get(this);
            let oItem = this.get(item);

            if (!oItem) {
                console.error('不存在该节点:', item);
                return;
            }


            let parent = oItem.parent;
            let list = parent ? parent.list : meta.list;

            let index = list.findIndex(function (item) {
                return item.id == oItem.id;
            });

            if (index < 0) {
                throw new Error('在该节点的同级节点列表中找不到自己。');
            }

            //从列表中删除该节点。
            list.splice(index, 1);
           
            delete meta.id$item[oItem.id];
            delete meta.eid$item[oItem.eid];

            //从主键中递归删除。
            MenuTree.each(item.list, function (item) {
                delete meta.id$item[item.id];
                delete meta.eid$item[item.eid];
            });
           
            //删除的是当前激活的项。
            if (meta.current === oItem) {
                meta.current = null;
            }

            meta.fill();
            meta.emitter.fire('delete', [oItem]);
            
        },

        /**
        * 在同层级中移动指定的节点。
        * 已重载 move(item, step);     //传入一个具体的 item，里面必须包含 id 字段。
        * 已重载 move(id, step);       //传入一个 item 的 id 字符串。
        */
        move: function (item, step) {
            let meta = mapper.get(this);
            let oItem = this.get(item);

            if (!oItem) {
                console.error('不存在该节点:', item);
                return;
            }

            let parent = oItem.parent;
            let list = parent ? parent.list : meta.list;

            let index = list.findIndex(function (item) {
                return item.id == oItem.id;
            });

            if (index < 0) {
                throw new Error('在该节点的同级节点列表中找不到自己。');
            }

            //移动后的目标位置。 确保在 0 到 maxIndex 之间。
            //step 可为正，可为负。
            let targetIndex = index + step;
            let maxIndex = list.length - 1;

            targetIndex = Math.max(targetIndex, 0);
            targetIndex = Math.min(targetIndex, maxIndex);

            let targetItem = list[targetIndex];
            let srcItem = list[index];

            list[index] = targetItem;
            list[targetIndex] = srcItem;

            meta.fill();
            meta.emitter.fire('move', [oItem, step]);
            
        },

        /**
        * 打开指定的节点。
        * 这会连同它的所有父节点也一起打开。
        * 已重载 open(item);
        * 已重载 open(id);
        */
        open: function (item) {
            let meta = mapper.get(this);
            let oItem = this.get(item);

            if (!oItem) {
                throw new Error('不存在该节点');
            }
            
            meta.open(oItem, true);
            meta.fill();

            //是一个目录，则先假设是折叠的。
            if (oItem.list) {
                oItem.open = false;
            }

            $('#' + oItem.eid).trigger('click');

        },

        /**
        * 关闭指定的节点。
        * 采用模拟人工操作的方式进行关闭，不会影响父节点。
        * 已重载 close(item);
        * 已重载 close(id);
        */
        close: function (item) {
            let meta = mapper.get(this);
            let oItem = this.get(item);

            if (!oItem) {
                throw new Error('不存在该节点');
            }

            if (oItem.open) {
                $('#' + oItem.eid).trigger('click');
            }
        },



        /**
        * 迭代本实例的每个节点，执行指定的回调函数。
        */
        each: function (fn) {
            let meta = mapper.get(this);
            MenuTree.each(meta.list, fn);
        },

        /**
        * 获取指定的节点或全部节点列表。
        * 已重载 get();        //获取全部节点列表。
        * 已重载 get(id);      //获取指定的节点。
        * 已重载 get(item);    //获取指定的节点。 item = { id, };
        */
        get: function (id) {
            let meta = mapper.get(this);

            if (!id) {
                return meta.list;
            }

            switch (typeof id) {
                case 'string':
                    return meta.id$item[id];

                case 'object':
                    let item = id;
                    id = item.id;

                    if (typeof id == 'string') {
                        return meta.id$item[id];
                    }

                    return meta.list.includes(item) ? item : null;

                default:
                    return null;
            }

        },

        /**
        * 更新指定的节点。
        *   item = {
        *       id: '',     //必选，节点的 id。
        *       name: '',   //必选，节点的文本名称。
        *       data: {},   //可选，节点的用户自定义数据。
        *   };
        */
        update: function (item) {
            let meta = mapper.get(this);
            let oItem = this.get(item);

            if (!oItem) {
                console.error('不存在该节点:', item);
            }

            oItem.data = item.data;
            oItem.name = item.name;

            $('#' + oItem.eid).html(item.name);
        },

        /**
        * 销毁。
        */
        destroy: function () {
            let meta = mapper.get(this);

            //已销毁。
            if (!meta) {
                return;
            }

            meta.emitter.destroy();
            meta.tpl.destroy();
            meta.$.off(); //这个要解除绑定。
            mapper.delete(this);
        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            let meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },

    };




    //静态方法。
    Object.assign(MenuTree, {

        /**
        * 用深度优先的方式迭代树结构的每个节点并执行回调函数。
        */
        each: function (list, fn) {
            if (!list || !fn) {
                return;
            }

            list.map(function (item, index) {
                fn(item, index);

                MenuTree.each(item.list, fn);
            });

        },

        /**
        * 把指定的一维数组构建成一棵树的数据结构。
        */
        tree: function (list, options) {
            let field = options.field;
            let roots = [];     //所有的根节点。
            let id$item = {};   //以 id 作为主键的映射关系。

            list.map(function (item) {
                let id = item[field.id];
                let fname = field.name;
                let name = typeof fname == 'function' ? fname(item) : item[fname];

                id$item[id] = {
                    'name': name,
                    'item': item,
                };
            });

            list.map(function (sitem) {
                let id = sitem[field.id];
                let item = id$item[id];
                let pid = sitem[field.parentId];

                if (options.isRoot(sitem)) {
                    roots.push(item);
                    return;
                }


                let parent = id$item[pid];
                let list = parent.list = parent.list || [];
                list.push(item);
            });


            //$Object.each(id$item, function (id, item) {
            //    let pid = item.item[field.parentId];

            //});

            return roots;

        },

    });


    return MenuTree;
});