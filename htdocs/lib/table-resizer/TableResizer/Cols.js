

define('TableResizer/Cols', function (require, module) {
    const Template = require('@definejs/template');

    let tpl = new Template('#tpl-TableResizer');

    tpl.process({
        'colgroup': {
            '': function (data) {
                let cols = this.fill('col', data.fields);

                return {
                    'cols': cols,
                };
            },

            'col': function (field, index) {
                return {
                    'index': index,
                    'width': field.width,
                    'display': field.visible ? '' : 'display: none;',
                };
            },
        },
    });


    return {
        fill: function ($table, fields) {
            let html = tpl.fill('colgroup', { 'fields': fields, });

            $table.prepend(html);

            let cols = $table.find('colgroup>col').toArray();
            return cols;
           
        },


    };

});

