

define('GridView/Panel/Data', function (require, module, exports) {
    

    return {
        //对总列表数据进行分页。
        //仅用于组件内部分页的情况。
        get(list, { no, size, }) {
            no = no - 1;  //此处的页码从 0 开始。

            let beginIndex = no * size;
            let endIndex = beginIndex + size;
            let items = list.slice(beginIndex, endIndex);

            return items;
        },
    };
    

});

