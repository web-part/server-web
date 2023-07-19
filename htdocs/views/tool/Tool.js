
define.view('/Tool', function (require, module, view) {
    const Tabs = module.require('Tabs');
    const JS = module.require('JS');
    const Less = module.require('Less');
    const MD5 = module.require('MD5');
    const QRCode = module.require('QRCode');


    let meta = {
        args: null,
    };
 

    view.on('init', function () {


        Tabs.map({ JS, Less, MD5, QRCode, });

        Tabs.on({
            'change': function (M) {
                M.render(meta.args);
            },
        });

        [JS, Less, MD5, QRCode,].forEach((M) => {
            M.on({
                'fullscreen': function (on) {
                    view.$.toggleClass('fullscreen', on);
                    view.fire('fullscreen', [on]);
                },
            });

        });


       
  
    });


    view.on('render', function (id, args) {
        meta.args = args || null;

        Tabs.render();

    });



    return {

    };

});
