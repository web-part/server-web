

define('TextTree/Events/Status', function (require, module, exports) {
    const $ = require('$');


    return exports = {
        //
        close(item, includeSelf) {
            item.childs.forEach((item) => {
                //用户手动关闭的，直接关闭当前节点即可。
                //不需要再关闭下级节点。
                if (item.closed) {
                    $(`#${item.id}`).slideUp('fast');
                }
                else {
                    exports.close(item, true);//递归。
                }

            });

            if (includeSelf) {
                $(`#${item.id}`).slideUp('fast');
            }
        },

        //
        open(item, includeSelf) {
            item.childs.forEach((item) => {
                //用户手动关闭的。
                if (item.closed) {
                    $(`#${item.id}`).slideDown('fast');
                }
                else {
                    exports.open(item, true); //递归。
                }

            });


            if (includeSelf) {
                $(`#${item.id}`).slideDown('fast');
            }
        },

    };
});