
/**
* 具有事件触发的通用列表类。
* 列表的每一项都必须具有唯一 id 值。
*/
define('List', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    let mapper = new Map();


    function List(list) {

        let emitter = new Emitter(this);
        list = list || [];
       
        let meta = {
            'emitter': emitter,
            'list': list.slice(0),
            'reserves': list.slice(0),
        };

        mapper.set(this, meta);

    }




    List.prototype = {
        constructor: List,

        /**
        * 添加一项到列表中。
        * 如果已存在该项，则不重复添加。
        * @param {Object} item 要添加的项。
        * @return 返回该项在列表中的索引位置。
        */
        add: function (item) {
            let index = this.index(item);
            if (index >= 0) { //已存在该项。
                return index;
            }

            let meta = mapper.get(this);
            let list = meta.list;
            let emitter = meta.emitter;

            list.push(item);
            index = list.length - 1;

            emitter.fire('change', [list.slice(0)]);
            emitter.fire('add', [item, index]);

            return index;

        },

        /**
        * 在列表中指定的索引位置处插入一项。
        * @param {number} 要插入的索引位置。
        * @param {Object} 要插入的项。
        * @return 返回该项在列表中的索引值。
        */
        insert: function (index, item) {
            let meta = mapper.get(this);
            let list = meta.list;
            let emitter = meta.emitter;

            index = index + 1;
            list.splice(index, 0, item);
            emitter.fire('change', [list.slice(0)]);
            emitter.fire('insert', [item, index]);

            return index;
        },

        /**
        * 从列表中删除指定索引位置的项。
        * 如果不存在该项，则忽略。
        * 已重载 remove(item);
        * @param {number|Object} index 要删除的项所在的索引位置。
        *   或者指定为要删除的项。
        * @return 返回被删除的项。
        */
        remove: function (index) {
            //重载 remove(item)
            if (typeof index == 'object') {
                index = this.index(index);
            }

            let meta = mapper.get(this);
            let emitter = meta.emitter;
            let list = meta.list;
            let item = list[index];

            if (!item) {
                return;
            }

            list.splice(index, 1); //注意，此时 list 的长度已发生了变化
            emitter.fire('change', [list.slice(0)]);
            emitter.fire('remove', [item, index]);

            return item;
        },

        /**
        * 清空列表。
        * @param {boolean} clearAll 是否清空并且不恢复创建时的样子。
        */
        clear: function (clearAll) {
            let meta = mapper.get(this);
            let list = meta.list;
            let emitter = meta.emitter;
            let reserves = meta.reserves;
            
            meta.list = clearAll ? [] : reserves.slice(0);

            emitter.fire('change', [meta.list.slice(0)]);
            emitter.fire('clear');
        },

        /**
        * 获取指定索引值的列表项。
        * 已重载 get(); 获取全部列表项。
        * @param {number} 要获取的列表项的索引位置。
        * @return {Object|Array} 返回要获取的列表项或全部项。
        */
        get: function (index) {
            let meta = mapper.get(this);
            let list = meta.list;

            return arguments.length == 0 ?
                list.slice(0) :
                list[index];
        },

        /**
        * 获取指定项在列表中的索引位置。
        * 该方法通过项的 id 去检索列表中的每一项，直到找到为止。
        * @param {Object} item 要检索的项。
        * @return {number} 返回该项在列表中的索引位置。
        */
        index: function (item) {
            let meta = mapper.get(this);
            let list = meta.list;
            let id = item.id;

            let index = list.findIndex(function (item, index) {
                return item.id == id;
            });

            return index;
        },

        /**
        * 绑定事件。
        */
        on: function (name, fn) {
            let meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },

    };

    return List;
});