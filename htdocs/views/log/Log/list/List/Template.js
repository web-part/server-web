
define('/Log/List/Template', function (require, module, exports) {
    const $String = require('@definejs/string');
    const Colors = module.require('Colors');
    const HTML = module.require('HTML');

    let type$icon = {
        input: `<i class="fas fa-terminal"></i>`,
        info: `<i class="fas fa-info-circle"></i>`,
        stdout: ``,
    };

    function getOrder(list, index) {
        let width = list.length.toString().length;
        let order = index + 1;

        order = order.toString();
        order = $String.padLeft(order, width, '0');

        return order;
    }

    return {
        init(panel) {
            let tpl = panel.template();

            tpl.process({
                '': function ({ groups, }) {
                    groups = this.fill('group', groups);
                    return { groups, };
                },

                'group': {
                    '': function (group, no) {
                        let { date, total, error, } = group;

                        return {
                            date,
                            total,
                            no,
                            hasError: error> 0 ? 'has-error': '',
                            items: `<li> loading... </li>`, //展开时再填充。
                        };
                    },

                    'item': {
                        '': function (item, index, info) {
                            let { time, type, msg, } = item;
                            let { list, no, } = info;

                            msg = HTML.render(msg);
                            msg = Colors.render(msg);

                         
                            let icon = type$icon[type] || '';
                            let prev = list[index - 1];
                            let order = getOrder(list, index);

                            time = prev && time == prev.time ? '' : this.fill('time', item);


                            return {
                                'no': no,
                                'index': index,
                                'order': order,
                                'time': time,
                                'sameTime': time ? '' : 'same-time', //time 为空说明时间一样。
                                'type': type,
                                'icon': icon,
                                'msg': msg,
                            };
                        },

                        'time': function (data) {
                            return {
                                'time': data.time,
                            };
                        },
                    },
                },
            });
        },

    };

});

