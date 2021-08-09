
define('Settings.Theme', function (require, module, exports) {
    const Storage = require('@definejs/local-storage');
    const Emitter = require('@definejs/emitter');

    let storage = new Storage(module.id);
    let emitter = new Emitter();

    let meta = {
        value: storage.get('value') || module.data || 'light',
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


            let body = document.body;
            let list = [...body.classList];

            list.forEach((name) => {
                if (name.startsWith(`theme-`)) {
                    body.classList.remove(name);
                }
            });
           
            body.classList.add(`theme-${value}`);

            emitter.fire('change', [value, old]);
        },

        
    };
    

    


});