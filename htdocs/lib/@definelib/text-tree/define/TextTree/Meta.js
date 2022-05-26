
/**
* 
*/
define('TextTree/Meta', function (require, module, exports) {
    const $String = require('@definejs/string');

    return {

        create (config, others) {
            let id = $String.random();

            let meta = {
                'id': id,                           //实例 id，会生成到 DOM 元素中。

                'container': config.container,      //表格的容器。
                'template': config.template,        //使用的 html 模板的对应的 DOM 节点选择器。
                'class': config.class,              //css 类名。
                'style': config.style,              //css 样式。
                'dataset': config.dataset,          //自定义数据集，会在 html 中生成 `data-` 的自定义属性。
                'icon': config.icon,                //
                'trimLeft': config.trimLeft,        //
                'showValue': config.showValue,      //
                'showIcon': config.showIcon,        //
                'showTab': config.showTab,          //
                'showColor': config.showColor,      //
                'showHover': config.showHover,      //
                

                'list': [],     //渲染后对应的列表，排序可能跟 render(list) 中传入的 list 不同，以此为准。
                'id$item': {},  //
                
                '$': null,
                'this': null,
                'emitter': null,
                'tpl': null,
            };


            Object.assign(meta, others);



            return meta;
           
        },


    };
    
});


