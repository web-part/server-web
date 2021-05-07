

define('Pager/Template', function (require, module) {
    const Template = require('@definejs/template');
    const $Array = require('@definejs/array');

    let tpl = new Template('#tpl-Pager');


    tpl.process({
        '': function (data) {
            let no = data.no;
            let count = data.count;

            let regions = this.fill('region', data.regions, no);
            let sizes = this.fill('size', data.sizes, data.size);

            return {
                'regions': regions,
                'sizes': sizes,

                'count': data.count,
                'total': data.total,
                'ulId': data.ulId,
                'txtId': data.txtId,
                'sizerId': data.sizerId,
                'toNo': data.toNo,

                'first-disabled-class': no == Math.min(1, count) ? 'disabled' : '',
                'final-disabled-class': no == count ? 'disabled' : '',
                'jump-disabled-class': count == 0 ? 'disabled' : '',
            };
        },

        'region': {
            '': function (region, index, no) {
                let from = region.from;
                let to = region.to;
                let items = $Array.pad(from, to + 1);

                items = this.fill('item', items, no);

                let more = region.more || '';
                if (more) {
                    more = this.fill('more', {});
                }

                let html = items + more;
                return html;
                
            },

            'item': function (no, index, cno) {
                let active = no == cno ? 'active' : '';

                return {
                    'no': no,
                    'active': active,
                };
            },

            'more': function (data) {
                return data;
            },
        },

        'size': function (item, index, size) {
            this.fix('selected');

            return {
                'value': item,
                'selected': item == size ? 'selected="selected"' : '',
            };
        },

    });



    return tpl;



});

