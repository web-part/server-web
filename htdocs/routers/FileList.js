define.route('FileList', function (require, module) {
    const Master = module.require('Master');

    return {
        'demo': function (file) {
            window.open(`#!${file}`);
        },

        'open': function (file) {
            window.open(file);
        },
        
        'edit': function (file) {
            Master.open('DocAdd', [file]);
        },

        'compile-less': function (content) {
            let id = 'Less';
            let args = [content];
            Master.open('Tool', [id, args]);
        },


        'minify-js': function (content) {
            let id = 'JS';
            let args = [content];
            Master.open('Tool', [id, args]);
        },

       
      

       
    };

});
