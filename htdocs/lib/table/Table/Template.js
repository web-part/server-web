

define('Table/Template', function (require, module) {
    const Template = require('@definejs/template');
    const $String = require('@definejs/string');


    function stringify(attributes) {
        if (!attributes) {
            return '';
        }

        attributes = Object.entries(attributes).map(function (item) {
            let key = item[0];
            let value = item[1];
            return 'data-' + key + '="' + value + '"';
        });

        return attributes.join(' ');
    }

    function getTitle(obj) {
        let title = obj.title;

        if (title === undefined || title === '') {
            return '';
        }

        return 'title="' + title + '"';
    }

    function getClass(obj) {
        let list = obj.class;
        if (Array.isArray(list)) {
            list = list.join(' ');
        }

        if (!list) {
            return '';
        }

        return 'class="' + list + '"';
       
    }


    return {
        create: function (meta) {
            let tpl = new Template('#tpl-Table');
            let emitter = meta.emitter;


            tpl.process({
                '': function () {
                    this.fix('attributes');

                    let width = meta.width || '';

                    if (width) {
                        width = 'width: ' + width + 'px;';
                    }

                    let rows = this.fill('tr', meta.rows);
                    let attributes = stringify(meta.attributes);
                    let cssClass = meta.class || '';

                    return {
                        'id': meta.id,
                        'class': cssClass + ' Table',
                        'width': width,
                        'rows': rows,
                        'attributes': attributes,
                    };
                },
                'tr': {
                    '': function (row, no) {
                        this.fix(['class', 'attributes', 'title']);

                        emitter.fire('process', 'row', [row, no]);

                        let attributes = stringify(row.attributes);
                        let cells = this.fill('td', row.cells, no);
                        let title = getTitle(row);
                        let cssClass = getClass(row);

                        return {
                            'id': row.id,
                            'class': cssClass,
                            'attributes': attributes,
                            'title': title,
                            'cells': cells,
                        };
                    },

                    'td': {
                        '': function (cell, index, no) {
                            this.fix(['class', 'attributes', 'title']);

                            let html = '';

                            if (cell.isOrder) {
                                html = $String.format(meta.order.sample, {
                                    'index': index,     //列索引。
                                    'no': no,           //行索引。
                                    'order': no + 1,    //行号。
                                });
                            }
                            else {
                                let values = emitter.fire('process', 'cell', cell.name, [cell, index]);
                                html = values.slice(-1)[0]; //以最后一个为准。

                                //具体命名单元格的事件没有返回值，则再次触发统一 cell 的事件。
                                if (html === undefined) {
                                    values = emitter.fire('process', 'cell', [cell, index]);
                                    html = values.slice(-1)[0]; //以最后一个为准。
                                }
                          

                                let type = typeof html;

                                if (type == 'number' || type == 'boolean') {
                                    html = String(html);
                                }
                            }

                            let display = cell.field.visible === false ? 'display: none;' : '';
                            let attributes = stringify(cell.attributes);
                            let title = getTitle(cell);
                            let cssClass = getClass(cell);

                            return {
                                'id': cell.id,
                                'cid': cell.column.id, //列 id
                                'html': html || '',
                                'class': cssClass,
                                'attributes': attributes,
                                'display': display,
                                'title': title,
                            };
                        },

                    },
                },
            });

            return tpl;

        },

    };

});

