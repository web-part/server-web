
/**
* 
*/
define('MenuTree/Meta', function (require, module, exports) {
    const IDMaker = require('@definejs/id-maker');

    let idmaker = new IDMaker('MenuTree');



    return {

        create(config, others) {
            let id = idmaker.next();
            
            let meta = {
                'id': id,                           //实例 id，会生成到 DOM 元素中。

                'container': config.container,      //表格的容器。
                'template': config.template,        //使用的 html 模板的对应的 DOM 节点选择器。
                'class': config.class,              //css 类名。
                'style': config.style,              //css 样式。
                'dataset': config.dataset,          //自定义数据集，会在 html 中生成 `data-` 的自定义属性。
                'dirIcon': config.dirIcon,
                'fileIcon': config.fileIcon,
                'allowActiveDir': config.allowActiveDir,    //

                '$': null,
                'this': null,
                'emitter': null,
                'tpl': null,

               
                'list': [],         //
                'items': [],        //list 的一维数组。
                'id$item': {},      //id 作为主键关联到项。
                'cid$item': {},     //cid 作为主键关联到项。

                'current': null,       //当前激活的节点 item。
            };


            Object.assign(meta, others);



            return meta;
           
        },


    };
    
});


