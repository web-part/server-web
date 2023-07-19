
/**
* 
*/
define('Tabs/Meta', function (require, module, exports) {
    const IDMaker = require('@definejs/id-maker');
    const Storage = require('@definejs/local-storage');


    let idmaker = new IDMaker('Tabs');



    return {

        create(config, others) {
            let { storage, } = config;
            let index = 0;

            if (typeof storage == 'string') {
                storage = new Storage(`${module.id}-${storage}`);
                index = storage.get('index') || 0;
            }
            else {
                storage = null;
            }

            let id = idmaker.next();
            
            let meta = {
                'id': id,                           //实例 id，会生成到 DOM 元素中。

                'container': config.container,      //表格的容器。
                'template': config.template,        //使用的 html 模板的对应的 DOM 节点选择器。
                'class': config.class,              //css 类名。
                'style': config.style,              //css 样式。
                'dataset': config.dataset,          //自定义数据集，会在 html 中生成 `data-` 的自定义属性。
               

                '$': null,
                '$li': null,        //当前激活的 li。
                'this': null,
                'emitter': null,
                'tpl': null,

                'storage': storage,
                'index': index,         //当前激活的 index。
                'list': [],             //节点列表。
                
            };


            Object.assign(meta, others);



            return meta;
           
        },


    };
    
});


