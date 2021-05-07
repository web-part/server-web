
define.panel('/Terminal/Logs', function (require, module, panel) {
    const Header = module.require('Header');
    const List = module.require('List');

   

    panel.on('init', function () {
        
        Header.on({
            'cmd': {
                'clear': function () {
                    List.clear();
                },
                'close': function () {
                    panel.fire('close');
                },
            },

            'check': {
                'time': function (checked) {
                    List.showTime(checked);
                },
                'color': function (checked) {
                    List.showColor(checked);
                },
                'highlight': function (checked) {
                    List.showHighlight(checked);
                },
                'border': function (checked) {
                    List.showBorder(checked);
                },
            },
        });

        

        List.on({
            'cmd': function (cmd, value) {
                panel.fire('cmd', [cmd, value]);
            },
        });
  
    });




    panel.on('render', function (stdout, fs) {
        Header.render();
        List.render(stdout, fs);
        
    });



    return {
        add(cmd) {
            if (cmd == 'clear') {
                List.clear();
                return;
            }
           

            List.add('input', cmd);
            panel.fire('add', [cmd]);
        },

        close(closed) {
            if (closed) {
                List.add('info', '已断开连接');
            }
        },
    };






});
