define('Table/Meta', function (require, module, exports) {
    const $String = require('@definejs/string');
    const Column = module.require('Column');

    return {
        create(config, more) {
            let id = config.id || $String.random();
            let name$column = {};
            let id$column = {};

            let table = more.this;

            let columns = config.fields.map(function (field, index) {
                let column = Column.create({ field, table, });

                name$column[column.name] = column;
                id$column[column.id] = column;

                return column;
            });


            let meta = {
                'id': id,                           //实例 id，会生成到 DOM 元素中。
               
                'container': config.container,      //表格的容器。
                'template': config.template,        //使用的 html 模板的对应的 DOM 节点选择器。
                'class': config.class,              //css 类名。
                'style': config.style,              //css 样式。
                'dataset': config.dataset,          //自定义数据集，会在 html 中生成 `data-` 的自定义属性。
                'header': config.header,            //是否渲染表头。
                
                'columns': columns,                 //所有的列集合。
                'id$column': id$column,             //用随机 id 关联列。
                'name$column': name$column,         //命名的列。

                'rows': [],                         //所有的行记录集合。
                'id$row': {},                       //用随机 id 关联表格行元数据。
                'id$cell': {},                      //用随机 id 关联单元格元数据。

                'list': [],                         //当前渲染时的列表数据。
                
                'emitter': null,                    //
                'tpl': null,                        //模板实例。
                '$': null,                          //$(`table`)
                'this': null,                       //方便内部使用。

                '$tbody': null,                     //$(`tbody`);
            };

            Object.assign(meta, more);

            

            return meta;
        },
    };

    
});