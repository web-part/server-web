

define.panel('/Tool/Main/QRCode/Main/Input', function (require, module, panel) {
  
    

    panel.on('init', function () {
       
        panel.$on('click', {
            'button': function () {
                let value = panel.$.find('textarea').val();
                panel.fire('submit', [value]);
            },
        });


    });

    panel.on('render', function () {
        

    });


    return {

    };
});