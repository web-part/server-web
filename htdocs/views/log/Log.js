
define.view('/Log', function (require, module, view) {
    const API = module.require('API');
    const Header = module.require('Header');
    const List = module.require('List');

    view.on('init', function () {

        Header.on({
            'cmd': {
                'clear': function () {
                    definejs.confirm('确认要清空服务器端的日志列表？', function () {
                        API.clear();
                    });
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

        API.on('success', {
            'get': function (list, fs) {
                Header.render();
                List.render(list, fs);
            },
            'clear': function () {
                List.clear();
            },
        });
  
    });


    view.on('render', function () {
        

        API.get();
    });




});
