
//默认过滤器。

define('DropList/Filter', function (require, module, exports) {

    function find(item, keys, keyword) {
        let len = keys.length;

        for (let i = 0; i < len; i++) {
            let key = keys[i];
            let ignoreCase = false; //是否忽略大小写。

            // { name: '', ignoreCase: true }
            if (typeof key == 'object') {
                let opt = key;

                key = opt.name;
                ignoreCase = opt.ignoreCase;
            }


            let value = item[key];

            if (typeof value == 'number') {
                value = String(value);
            }

            //搜索下一个字段值。
            if (typeof value != 'string') {
                continue;
            }
            
            //指定了不区分大小写。
            if (ignoreCase) {
                value = value.toLowerCase();
                keyword = keyword.toLowerCase();
            }

            //已找到。
            if (value.includes(keyword)) {
                return true;
            }
        }

        //如果没找到，必须明确返回 false。
        return false;
    }




    return {
        bind: function (meta) {
            let filters = meta.filters;

            meta.this.on('change', function (keyword) {

                this.fill(meta.list, keyword, function (item, index) {

                    //不需要过滤时，则只高亮关键词。
                    if (!filters) {
                        return true;
                    }

                    return find(item, filters, keyword);

                });

              
            });

        },

    };
});