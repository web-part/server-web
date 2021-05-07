
define.view('/Terminal', function (require, module, view) {
    const Command = module.require('Command');
    const Logs = module.require('Logs');
    const Footer = module.require('Footer');


    view.on('init', function () {

        Command.on('data', function (data, fs) {
            Logs.render(data, fs);
        });

        Logs.on({
            'cmd': function (cmd, value) {
                view.fire('cmd', cmd, [value]);
            },

            'close': function () {
                let closed = Command.close();
                Logs.close(closed);
            },

            'add': function (cmd) {
                Command.run(cmd);
            },
        });

        Footer.on({
            'submit': function (cmd) {
                Logs.add(cmd);
            },
        });
  
    });


    view.on('render', function () {
        Footer.render();
    });




});
