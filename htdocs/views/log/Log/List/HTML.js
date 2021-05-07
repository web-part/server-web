
define('/Log/List/HTML', function (require, module, exports) {


    return {
        render(msg) {

            if (typeof msg != 'string') {
                return '';
            }

            // let reg = /[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g;
            let reg = /[<>]/g;

            msg = msg.replace(reg, function (r) {
                return "&#" + r.charCodeAt(0) + ";"
            });



            msg = msg.split(' ').join('<b class="empty"></b>');
            msg = msg.split('│').join('<b class="linkY">│</b>');
            msg = msg.split('\r\n').join('<br />');
            msg = msg.split('\n').join('<br />');
          
            return msg
        },
    };
});

