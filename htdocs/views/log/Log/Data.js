
define('/Log/Data', function (require, module, exports) {
    const $Array = require('@definejs/array');
    const $Date = require('@definejs/date');


   


    


    return exports = {

        parse(list, filterOpt = {}) {
            let {
                date$checked = null,
                type$checked = null,
            } = filterOpt;

            let names = new Set();      //
            let dates = new Set();      //收集日期。
            let date$list = {};         //按日期进行分组。
            let date$time$list = {};     //按时间进行分组。

            

            list.forEach((item) => {
                if (!item) {
                    return;
                }


                let dt = $Date.format(item.time, 'yyyy-MM-dd HH:mm:ss').split(' ');
                let date = dt[0];   //日期部分。 如 `2021-06-18`
                let time = dt[1];   //时间部分。 如 `10:30:45`
                let { name, } = item;

                if (date$checked && !date$checked[date] ) {
                    return;
                }

                if (type$checked && !type$checked[name]) {
                    return;
                }


                names.add(name);
                dates.add(date);

                let oItem = {
                    'date': date,
                    'time': time,
                    'timestamp': item.time,
                    'name': name,
                    'msg': item.msg,
                };

                $Array.add(date$list, date, oItem);
                $Array.add(date$time$list, date, time, oItem);
            });

            let groups = [...dates].map((date) => {
                return {
                    'date': date,
                    'list': date$list[date] || [],
                };
            });


            return {
                'names': [...names,],
                'dates': [...dates,],
                'list': list,
                'groups': groups,
                'date$list': date$list,
                'date$time$list': date$time$list,
            };

        },

      

    };
});

