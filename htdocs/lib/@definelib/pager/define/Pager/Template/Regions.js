

define('Pager/Template/Regions', function (require, module, exports) {
    const $Array = require('@definejs/array');

    /**
    * 根据总页数和当前页计算出要填充的区间。
    * @param {number} maxNo 总页数。
    * @param {number} no 当前激活的页码。
    * @return {Array} 返回一个区间描述的数组。
    */
    function get({ maxNo, no, }) {
        //10 页以内。
        if (maxNo <= 10) {
            return [{ 'from': 1, 'to': maxNo, 'more': false, }];
        }

        //超过 10 页。


        if (no <= 3) {
            return [{ 'from': 1, 'to': 5, 'more': true, }];
        }

        if (no <= 5) {
            return [{ 'from': 1, 'to': no + 2, 'more': true, }];
        }

        if (no >= maxNo - 1) {
            return [
                { 'from': 1, 'to': 2, 'more': true, },
                { 'from': maxNo - 5, 'to': maxNo, 'more': false, },
            ];
        }

        return [
            { 'from': 1, 'to': 2, 'more': true, },
            { 'from': no - 2, 'to': no + 2, 'more': no + 2 != maxNo, },
        ];
    }

    return {
        /**
        * 根据总页数和当前页计算出要填充的区间。
        * @param {number} maxNo 总页数。
        * @param {number} no 当前激活的页码。
        * @return {Array} 返回一个区间数组。
        */
        make({ maxNo, no, }) {
            let list = get({ maxNo, no, });

            list = list.map((item) => {
                let { from, to, more, } = item;
                let list = $Array.pad(from, to + 1);

                return { list, more, };
            });

            return list;

        },
    };




});

