
/**
* 
*/
define('MenuTree/Meta', function (require, module, exports) {
    const IDMaker = require('@definejs/id-maker');

    let idmaker = new IDMaker(module.parent.id);



    return {

        create: function (config, others) {
            let id = idmaker.next();
            
            let meta = {
                'id': id,

                'container': config.container, //可选。
                'dirIcon': config.dirIcon,
                'fileIcon': config.fileIcon,

                '$': null,
                'this': null,
                'emitter': null,
                'tpl': null,

               
                'list': [],         //
                'items': [],        //list 的一维数组。
                'id$item': {},      //id 作为主键关联到项。
                'cid$item': {},      //cid 作为主键关联到项。

                'current': null,       //当前激活的节点 item。
            };


            Object.assign(meta, others);



            return meta;
           
        },


    };
    
});


