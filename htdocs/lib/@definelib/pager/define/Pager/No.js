define('Pager/No', function (require, module, exports) {

    return {
        //确保 no 落在 [1, maxNo] 之间。
        normalize(no, maxNo) {
            if (typeof no != 'number') {
                throw new Error(`输入的参数页码必须为数字。`);
            }

            //负数页码，则从后面开始算起。
            //如 -1 表示倒数第一页，即最后一页。
            if (no < 0) {
                no = maxNo + 1 + no;
            }

            no = Math.max(no, 1);
            no = Math.min(no, maxNo);

            return no;
        },

        /**
        * 
        * @param {*} total 
        * @param {*} size 
        */
        getMax(total, size) {
            let maxNo = Math.ceil(total / size); //总的页数，计算得到，向上取整。  
            return maxNo;
        },


        /**
        * 根据总页数、当前页和上一页预测出要跳转的页码。
        * @param {number} maxNo 总页数。
        * @param {number} no 当前激活的页码。
        * @param {number} recentNo 上一页的页码。
        * @return {number} 返回一个跳转的页码。
        */
        getJump({ maxNo, no, recentNo, }) {
            if (maxNo <= 1) { // 0 或 1
                return maxNo;
            }

            if (no == maxNo) {
                return maxNo - 1;
            }

            let value;

            if (no > recentNo) {
                value = no + 1;
            }
            else {
                value = no - 1;

                if (value < 1) {
                    value = 2;
                }
            }

            return value;

        },
    };

    
});