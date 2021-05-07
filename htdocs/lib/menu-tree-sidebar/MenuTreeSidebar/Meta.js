
/**
* 
*/
define('MenuTreeSidebar/Meta', function (require, module, exports) {
    const $String = require('@definejs/string');

    let count = 0;



    return {
        create(config, others) {
            let id = `MenuTreeSidebar-${count++}-${$String.random(4)}`;

            let meta = {
                'id': id,
                'container': config.container,

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


