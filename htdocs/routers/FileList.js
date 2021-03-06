define.route('FileList', function (require, module) {
    const Master = module.require('Master');

    return {
        'demo': function (file) {
            let url = `#!${file}`;
            window.open(url);
        },

        'open': function (url) {
            window.open(url);
        },
        
        'edit': function (name) {
            Master.open('DocAdd', [{ name, }]);
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
