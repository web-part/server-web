
define.view('/Log', function (require, module, view) {
    const API = module.require('API');
    const SSE = module.require('SSE');
    const Filter = module.require('Filter');
    const Header = module.require('Header');
    const List = module.require('List');

    let meta = {
        stat: null,

    };










    view.on('init', function () {

        Header.on({
            'check': function (key, checked) {
                List.check(key, checked);
            },

            'reload': function () {
                API.get();
            },
            'clear': function () {
                definejs.confirm('确认要清空服务器端的日志列表？', function () {
                    API.clear();
                });
            },
        });

        Filter.on({
            'change': function (filter) {
                List.render(meta.stat, filter);
            },
        });
        


        List.on({
            'cmd': function (cmd, value) {
                panel.fire('cmd', [cmd, value]);
            },
            'reset': function () { 
                API.get();
            },
        });



        API.on('success', {
            'get': function (stat) {
                meta.stat = stat;

                Header.render();
                Filter.render(stat);
                SSE.open();
            },
        });
       




        SSE.on({
            'reset': function () {
                
            },

            'add': function (list) {
                List.add(list);
            },
        });
  
    });

    

    view.on('render', function () {
        API.get();

    });




});
