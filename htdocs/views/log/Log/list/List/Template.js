
define('/Log/List/Template', function (require, module, exports) {
    const Colors = module.require('Colors');
    const File = module.require('File');
    const HTML = module.require('HTML');

    let type$icon = {
        input: `<i class="fas fa-terminal"></i>`,
        info: `<i class="fas fa-info-circle"></i>`,
        stdout: ``,
    };

    let $meta = {
        panel: null,
        meta: null,
    };



    return {
        init(panel, meta) {
            $meta.panel = panel;
            $meta.meta = meta;

            let tpl = panel.template();
            let itemTpl = tpl.template('group', 'item');

            itemTpl.fix('datetime');


            tpl.process({
                '': function (data) {
                    let groups = this.fill('group', data.groups);

                    return { 'groups': groups, };
                },

                'group': {
                    '': function (group, no) {
                        let { list, } = group;
                        let info = { list, no, };
                        // let items = this.fill('item', list, info);

                        return {
                            'no': no,
                            'date': group.date,
                            'total': list.length,
                            // 'items': items,
                            // 'items': '加载中...', //展开时再填充。
                            'items': '<li> loading... </li>', //展开时再填充。
                        };
                    },

                    'item': {
                        '': function (item, index, info) {
                            let { date, time, name, msg, } = item;
                            let { list, no, baseIndex, } = info;

                            //如果指定了，则表示追加元素时需要修正索引。
                            if (typeof baseIndex == 'number') {
                                index = index + baseIndex;
                            }


                            msg = HTML.render(msg);
                            msg = Colors.render(msg);
                            msg = File.render(msg, meta.fs);

                            let type = name || 'stdout';
                            let icon = type$icon[type] || '';
                            let prev = list[index - 1];
                            let dt = `${date} ${time}`;

                            time = prev && time == prev.time ? '' : this.fill('time', item);


                            return {
                                'no': no,
                                'index': index,
                                'time': time,
                                'datetime': time ? '' : `data-dt="${dt}"`,
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

        fillGroup(no) {
            let { panel, meta, } = $meta;
            let group = meta.groups[no];

            let { date, list, } = group;
            let $ul = panel.$.find(`ul[data-group="${date}"]`);
            let tpl = panel.template();
            let info = { list, no, };
            let html = tpl.fill('group', 'item', list, info);

            $ul.html(html);
        },

        getGroup(no) {
            let { panel, meta, } = $meta;
            let group = meta.groups[no];

            let { date, list, } = group;
            let $ul = panel.$.find(`ul[data-group="${date}"]`);
            let filled = $ul.find('>li[data-index]').length > 0;


            return {
                date,
                list,
                $ul,
                filled,
                no,
            };

        },
    };

});

