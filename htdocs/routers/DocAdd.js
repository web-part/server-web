define.route('DocAdd', function (require, module) {
  

    return {
        'demo': function (file) {
            let url = `#!${file}`;

            window.open(url);
        },

       
       
    };

});
