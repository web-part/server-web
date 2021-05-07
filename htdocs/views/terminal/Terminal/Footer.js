
define.panel('/Terminal/Footer', function (require, module, panel) {
    const History = module.require('History');
    const Input = module.require('Input');




    panel.on('init', function () {
        


        Input.on({
            'enter': function (value) {
                History.push(value);
                panel.fire('submit', [value]);
            },

            'focus': function (focused) {
                panel.$.toggleClass('focus', focused);
            },

            'move': function (step) {
                let value = History.get(step);
                Input.render(value);
            },
        });
  
    });




    panel.on('render', function () {
       
        Input.render('');

        // panel.fire('change', ['webpart md5 htdocs']);

    });

    return {
        
    };






});
