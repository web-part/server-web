define('Pager/Meta', function (require, module, exports) {
    const $String = require('@definejs/string');

 

    return {
        create(config, more) {
            let id = config.id || $String.random();
            let { size, sizes, } = more;
         
            let total = config.total || 0;          //总的记录数。
            let maxNo = Math.ceil(total / size);    //总的页数，计算得到，向上取整。  

            let meta = {
                'id': id,                           //实例 id，会生成到 DOM 元素中。
                'txtId': $String.random(),          //会生成到 DOM 元素中。
                'sizerId': $String.random(),        //会生成到 DOM 元素中。

                'container': config.container,      //表格的容器。
                'template': config.template,        //使用的 html 模板的对应的 DOM 节点选择器。
                'class': config.class,              //css 类名。
                'style': config.style,              //css 样式。
                'dataset': config.dataset,          //自定义数据集，会在 html 中生成 `data-` 的自定义属性。

                'no': config.no || 1,               //当前页码，从 1 开始。
                'maxNo': maxNo,                     //总页数，计算得到。
                'recentNo': 0,                      //上一次的页码。
                'jumpNo': 0,                        //计算出下次要跳转的页码，填到输入框里。
                'minNo': config.minNo || 0,         //总页数小于该值时，分页器会隐藏。 如果不指定或指定为 0，则一直显示。

                'total': total,                     //总的记录数。
                'size': size,                       //分页的大小，即每页的记录数。
                'sizes': sizes,                     //可供选择的分页大小列表。
                
                'emitter': null,                    //事件处理器。
                'tpl': null,                        //模板实例。
                'this': null,                       //方便内部使用。
                '$': null,                          //$('#' + meta.id)
                '$nav': null,
                '$stat': null,
                '$jump': null,
            };

            Object.assign(meta, more);

            return meta;
        },
    };

    
});