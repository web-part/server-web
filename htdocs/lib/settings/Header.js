
define('Settings.Header', function (require, module, exports) {
    const Storage = require('@definejs/local-storage');
    const Emitter = require('@definejs/emitter');

    let storage = new Storage(module.id);
    let emitter = new Emitter();


    let meta = {
        value: storage.get('value') || module.data || 'hide',
    };

  

    return {
        on: emitter.on.bind(emitter),

        get() {
            return meta.value;
        },

        set(value) {
            let old = meta.value;

            if (value == old) {
                return;
            }

            
            if (value) {
                storage.set('value', value);
                meta.value = value;
            }
            else {
                value = old;
            }

            emitter.fire('change', [value, old]);
            
            console.log(module.id, 'set', value);
        },

        
    };
    

    


});