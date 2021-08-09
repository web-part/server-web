
/**
* 
*/
define('MenuNav/Meta', function (require, module, exports) {
    const IDMaker = require('@definejs/id-maker');

    let idmaker = new IDMaker(module.parent.id);




    return {

        create: function (config, others) {
            let id = idmaker.next();
            
            let meta = {
                'id': id,
                'container': config.container, //可选。
               

                'this': null,
                'emitter': null,
                'tpl': null,
                'panel': null,
              
            };


            Object.assign(meta, others);



            return meta;
           
        },


    };
    
});


