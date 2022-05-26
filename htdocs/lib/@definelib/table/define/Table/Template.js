

define('Table/Template', function (require, module) {
    const Template = require('@definejs/template');
    const Class = module.require('Class');
    const DataSet = module.require('DataSet');
    const Cell = module.require('Cell');
    const Caption = module.require('Caption');
    const Style = module.require('Style');
    const Title = module.require('Title');



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
                    let header = this.fill('header', {});
                    let rows = this.fill('row', meta.rows);

                    return {
                        'id': meta.id,
                        'class': cssClass,
                        'dataset': dataset,
                        'style': style,
                        'header': header,
                        'rows': rows,
                    };
                },

                'header': {
                    '': function () {
                        if (!meta.header) {
                            return '';
                        }

                        let captions = this.fill('caption', meta.columns);
                        return { captions, };
                    },

                    'caption': function (column, index) {
                        this.fix(['class', 'title', 'dataset', 'style',]);

                        //这句在前面。
                        //会触发事件，让外界有机会处理/更改 cell 对象。
                        let html = Caption.html(meta, column, index);

                        let cssClass = Class.stringify(column.class);
                        let title = Title.stringify(column.title);
                        let dataset = DataSet.stringify(column.dataset);
                        let style = Style.stringify(column.style);

                        return {
                            'id': column.id,
                            'class': cssClass,
                            'title': title,
                            'dataset': dataset,
                            'style': style,
                            'html': html,
                        };
                    },

                },

                

                'row': {
                    //填充行本身。
                    '': function (row, no) {
                        this.fix(['class', 'title', 'dataset', 'style',]);

                        let args = [row, { no, }];
                        
                        //让外界有机会去处理/更改 row 对象。
                        meta.emitter.fire('process', 'row', `${no}`, args);
                        meta.emitter.fire('process', 'row', args);

                        let cssClass = Class.stringify(row.class);
                        let title = Title.stringify(row.title);
                        let dataset = DataSet.stringify(row.dataset);
                        let style = Style.stringify(row.style);
                        let cells = this.fill('cell', row.cells, no);

                        return {
                            'id': row.id,
                            'class': cssClass,
                            'title': title,
                            'dataset': dataset,
                            'style': style,
                            'cells': cells,
                        };
                    },

                    //填充单元格。
                    'cell': function (cell, index, no) {
                        this.fix(['class', 'title', 'dataset', 'style',]);

                        //这句在前面。
                        //会触发事件，让外界有机会处理/更改 cell 对象。
                        let html = Cell.html(meta, cell, index, no);
                        let cssClass = Class.stringify(cell.class);
                        let title = Title.stringify(cell.title);
                        let dataset = DataSet.stringify(cell.dataset);
                        let style = Style.stringify(cell.style);


                        return {
                            'id': cell.id,
                            'class': cssClass,
                            'title': title,
                            'dataset': dataset,
                            'style': style,
                            'html': html,
                        };
                    },
                },
            });

            return tpl;

        },

    };

});

