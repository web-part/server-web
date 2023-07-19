

define.panel('/DocAdd/Header/Table', function (require, module, panel) {
    const $String = require('@definejs/string');
    const Masker = require('@definejs/masker');

    let masker = null;


    panel.on('init', function () {
      
        //
        function makeArray(count) {
            let list = [];
            let item = {};

            for (let i = 0; i < count; i++) {
                list.push(item);
            }

            return list;
        }



        panel.template({
            '': function (data) {
                let html = this.fill('all', data);
                return html;
            },

            'all': {
                '': function (data) {
                    let list = makeArray(data.rows);
                    let rows = this.fill('row', list, data.cells);

                    return {
                        'rows': rows,
                    };
                },


                'row': {
                    '': function (row, no, count) {
                        let list = makeArray(count);
                        let cells = this.fill('cell', list, no);

                        return {
                            'cells': cells,
                        };
                    },

                    'cell': function (cell, index, no) {
                        return {
                            'no': no,
                            'index': index,
                        };
                    },
                },
            },

        });


        panel.$.on('mouseover', 'td', function () {
            let td = this;
            let no = +td.getAttribute('data-no');
            let index = +td.getAttribute('data-index');

            let row = no + 1;
            let cell = index + 1;

            let html = row + cell < 2 ? '插入表格' : $String.format('{row}行 x {cell}列 表格', {
                'row': row,
                'cell': cell,
            });

            panel.$.find('div').html(html);

            panel.$.find('td').each(function () {
                let cell = this;
                let no2 = +cell.getAttribute('data-no');
                let index2 = +cell.getAttribute('data-index');
                let isRange = (no2 <= no) && (index2 <= index);
               
                $(cell).toggleClass('on', isRange);
            });
            
        });

        panel.$.on('click', 'td', function () {
            let cell = this;
            let no = +cell.getAttribute('data-no');
            let index = +cell.getAttribute('data-index');

            panel.fire('add', [{
                'row': no + 1,
                'cell': index + 1,
            }]);

            masker.hide();
        });


        masker = new Masker({
            volatile: true, //易消失。
            opacity: 0,
        });

        masker.on({
            'hide': function () {
                panel.hide();
            },
        });
    });



    panel.on('show', function () {
        masker.show();
    });



    /**
    * 渲染。
    *   options = {
    *   };
    */
    panel.on('render', function (options) {

        panel.fill({
            rows: 9,
            cells: 10,
        });

    });



});
