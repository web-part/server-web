
define('/Log/List/Data', function (require, module, exports) {
    const $Date = require('@definejs/date');


    return exports = {

        parse(stat, filter) {
            let { date$info, } = stat;
            let { date$checked, type$checked, } = filter;

            let groups = [];
            let no = -1;
            let date$group = {};

            Object.entries(date$info).forEach(([date, info]) => {
                if (!date$checked[date]) {
                    return;
                }

                let total = 0;
                let error = 0;

                Object.entries(info.type$count).forEach(([type, count]) => {
                    if (!type$checked[type]) {
                        return;
                    }

                    total += count;

                    if (type == 'error') {
                        error += count;
                    }
                });

                if (total == 0) {
                    return;
                }


                no++;

                let group = {
                    no,
                    date,
                    total,
                    error,
                    filled: false,  //是否已填充。
                    list: [],
                };

                date$group[date] = group;
                groups.push(group);
            });

            

            return { groups, date$group, };

        },

        normalize(list) { 
            list = list.map((item) => {
                let { type, msg, } = item;
                let dt = $Date.format(item.time, 'yyyy-MM-dd HH:mm:ss').split(' ');
                let date = dt[0];
                let time = dt[1];

                return {
                    date, 
                    time,
                    type,
                    msg,
                };
            });

            return list;
        },


        //查找相同时间（精确到秒）的最大 index。
        findMaxIndex(list, index) { 
            index = Number(index);


            let maxIndex = -1;
            let len = list.length;
            let { time, } = list[index];

            for (let i = index + 1; i < len; i++) {
                let item = list[i];

                if (!item || item.time != time) {
                    return maxIndex;
                }
                
                maxIndex = i;
            }

            return maxIndex;
        },


     


      

    };
});

