

define('Pager/Template', function (require, module, exports) {
    const Template = require('@definejs/template');
    const Regions = module.require('Regions');
    const Class = module.require('Class');
    const Style = module.require('Style');
    const DataSet = module.require('DataSet');


    return {
        create(meta) {
            let tpl = new Template(meta.template);

            tpl.process({
                //填充表格。
                '': function () {
                    this.fix(['class', 'dataset', 'style',]);

                    let cssClass = Class.stringify(meta.class);
                    let dataset = DataSet.stringify(meta.dataset);
                    let style = Style.stringify(meta.style);

                    let nav = this.fill('nav', {});
                    let stat = this.fill('stat', {});
                    let jump = this.fill('jump', {});
                    

                    return {
                        'id': meta.id,
                        'class': cssClass,
                        'dataset': dataset,
                        'style': style,

                        'nav': nav,
                        'stat': stat,
                        'jump': jump,
                    };
                },

                'nav': {
                    '': function () {
                        this.fix(['prev-disabled', 'next-disabled',]);

                        let regions = Regions.make(meta);

                        regions = this.fill('region', regions);
                        
                        return {
                            'regions': regions,
                            'prev-disabled': meta.no == Math.min(1, meta.maxNo) ? 'disabled' : '',
                            'next-disabled': meta.no == meta.maxNo ? 'disabled' : '',
                        };
                    },

                    'region': {
                        '': function (item, index) {
                            let list = this.fill('item', item.list);
                            let more = this.fill('more', item);
                            let html = list + more;

                            return html;

                        },

                        'item': function (no, index) {
                            return {
                                'no': no,
                                'on': no == meta.no ? 'on' : '',
                            };
                        },

                        'more': function ({ more, }) {
                            return more ? {} : '';
                        },
                    },
                },

                'stat': {
                    '': function () {
                        let sizes = this.fill('size', meta.sizes);

                        return {
                            'maxNo': meta.maxNo,
                            'total': meta.total,
                            'sizerId': meta.sizerId,
                            'sizes': sizes,
                        };
                    },

                    'size': function (item, index) {
                        this.fix('selected');

                        return {
                            'value': item,
                            'selected': item == meta.size ? 'selected="selected"' : '',
                        };
                    },
                },

                'jump': function () {
                    this.fix(['disabled',]);

                    return {
                        'txtId': meta.txtId,
                        'value': meta.jumpNo,
                        'disabled': meta.maxNo == 0 ? 'disabled' : '',
                    };
                },

                
            });

            return tpl;
        },
    };



});

