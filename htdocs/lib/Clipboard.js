

define('Clipboard', function (require, module, exports) {
    const Toast = require('@definejs/toast');

    let toast = new Toast({
        duration: 1200,
    });

   





    return {
        
        copy(value) {
            let txt = document.createElement('textarea');
            
            txt.setAttribute('readonly', 'readonly');
            txt.style.height = 0;

            document.body.appendChild(txt);
            
            txt.value = value;
            txt.select();

            if (document.execCommand('copy')) {
                toast.show('已复制');
            }

            document.body.removeChild(txt);
        },
        
    };



});
