
//用来补全 DOM 元素中 `data-panel` 属性的简写。


define('Panel', function (require, module, exports) {
    const $ = require('$');

    const defaults = {
        key: 'panel',   //针对 `data-panel`。
        prefix: './',   //针对简写的开头句式，如 `data-panel="./Main"`。
    };


    function trace(item, opt) {
        let list = [item,];

        collect(item, list, opt);

        list.reverse();

        return list;
    }


    function collect(item, list, opt) {
        let { key, prefix, } = opt;
        let parent = item.parentNode;

        //根节点。
        if (!parent) {
            return;
        }

        let dataset = parent.dataset || {};
        let value = dataset[key];

        if (value) {
            list.push(parent);

            //找到真正的有实名的父节点。
            if (!value.startsWith(prefix)) {
                return;
            }
        }

        collect(parent, list, opt);
    }

    



    return {
        pad(list, opt) {
            opt = opt || defaults;

            let { key, prefix, } = opt;

            list = list || $(`[data-${key}^="${prefix}"]`).toArray();

            console.log(list);

            list.forEach(function (item) {
                let { dataset, } = item;

                if (!dataset) {
                    return;
                }

                //如 `data-panel="./API"`;
                let value = dataset[key];
                
                if (!value || !value.startsWith(prefix)) {
                    return;
                }
                
                let list = trace(item, opt);
                let root = list[0];

                if (root.dataset[key].startsWith(prefix)) {
                    throw new Error(`无法找到值为完整 data-${key} 的父节点。`);
                }

                list.forEach((item, index) => {
                    let value = item.dataset[key];

                    if (!value.startsWith(prefix)) {
                        return;
                    }

                    let parent = list[index - 1];
                    let name = value.slice(prefix.length);
                    let newValue = `${parent.dataset[key]}/${name}`;

                    item.dataset[key] = newValue;
                    item.dataset[`${key}_old`] = value;
                });
            });
        },
    };
});