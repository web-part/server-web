
/**
* 
*/
define('GridView/Meta', function (require, module, exports) {
    const IDMaker = require('@definejs/id-maker');

    let idmaker = new IDMaker('GridView');




    return {

        create: function (config, others) {
            let id = config.id || idmaker.next();
            
            let meta = {
                'id': id,                           //会生成到 DOM 中。
                'container': config.container,      //容器。
                'template': config.template,        //使用的 html 模板的对应的 DOM 节点选择器。
                'class': config.class,              //css 类名。
                'style': config.style,              //css 样式。
                'dataset': config.dataset,          //自定义数据集，会在 html 中生成 `data-` 的自定义属性。
                'nodata': config.nodata,
                'fields': config.fields,

                'this': null,
                'emitter': null,
                'tpl': null,
                'panel': null,
                'page': null,   //如果有值，则表示分页。 为了方便在 `process` 事件中传出去，以让外界知道当前的分页信息。
              
            };


            Object.assign(meta, others);



            return meta;
           
        },


    };
    
});


