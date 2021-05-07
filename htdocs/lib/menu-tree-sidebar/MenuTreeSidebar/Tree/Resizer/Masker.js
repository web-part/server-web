

define('{MenuTreeSidebar.id}/Resizer/Masker', function (require, module, exports) {
    const Masker = require('@definejs/masker');

    let masker = null;

    
    return {
        show() { 
            masker = masker || new Masker({
                // opacity: 0.5,
                opacity: 0,
            });

            masker.show();
        },

        hide() { 
            masker && masker.hide();
        },
    };
   


});