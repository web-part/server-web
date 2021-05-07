
/**
* 
*/
define('GridView/Check', function (require, module, exports) {
    const $ = require('$');



    return {
        /**
        * 选中或取消选中指定的项。
        * 或者通过该项的状态自动进行选中或取消选中。
        * 已重载 check(meta, item);            //通过该项的状态自动进行选中或取消选中。
        * 已重载 check(meta, item, checked);   //选中或取消选中指定的项。
        */
        item: function (meta, item, checked) {
            let id = item[meta.primaryKey];
            let current = meta.current;
            let id$item = current.id$item;
            let list = new Set(current.list); //记录选中的 id，通过 Set() 可以去重。

            //未指定是否选中，则自动判断。
            if (checked === undefined) {
                checked = !id$item[id];
            }

            if (checked) {
                id$item[id] = item;
                list.add(id);
            }
            else {
                delete id$item[id];
                list.delete(id);
            }

            current.list = [...list];
            $('#' + meta.countId).html(list.size);


            //映射回具体的记录。
            list = meta.this.get();

            meta.emitter.fire('check', [{
                'item': item,
                'checked': checked,
                'list': list,
                'id$item': id$item,
            }]);

            return checked;
        },

        /**
        * 检查当前填充的列表和已选中的项的关系，看是否需要勾选表头的全选框。
        */
        all: function (meta) {
            let list = meta.list;
            let id$item = meta.current.id$item;
            let key = meta.primaryKey;
            let len = list.length;
            let allChecked = len > 0;   //如果有数据，则先假设已全部选中。

            //检查当前填充的列表，
            //只要发现有一项没有选中，则全选的就去掉。
            for (let i = 0; i < len; i++) {
                let item = list[i];
                let id = item[key];

                if (!id$item[id]) {
                    allChecked = false;
                    break;
                }
            }

            $('#' + meta.checkAllId).toggleClass('on', allChecked);
        },
    };
    
});


