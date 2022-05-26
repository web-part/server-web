

define('Pager/Sizes', function (require, module, exports) {


    return {

        parse: function ({ size, sizes, }) {
            size = size || sizes[0];
            sizes = [size, ...sizes];
            sizes = [...new Set(sizes)];

            sizes.sort(function (x, y) {
                return x > y ? 1 : -1;
            });

            return { size, sizes, };
        },

    };


});

