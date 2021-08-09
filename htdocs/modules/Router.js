
define.panel('/Router', function (require, module, panel) {
    const Hash = require('@definejs/hash');


    panel.on('init', function () {

        Hash.onchange(window, true, function (hash, old) {
            hash = hash || '';

            if (hash.startsWith('!')) {
                let url = hash.slice(1);
                panel.fire('markdoc', [url]);
            }
            else {
                panel.fire('master', [hash]);
            }

        });
    });
    
    panel.on('render', function () {

    });


   

});