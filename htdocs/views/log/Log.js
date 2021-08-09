
define.view('/Log', function (require, module, view) {
    const API = module.require('API');
    const SSE = module.require('SSE');
    const Data = module.require('Data');
    const Filter = module.require('Filter');
    const Header = module.require('Header');
    const List = module.require('List');

    let meta = {
        list: [],
    };



    view.on('init', function () {

        Header.on({
            'check': function (key, checked) {
                List.check(key, checked);
            },

            'cmd': {
                'reload': function () {
                    API.get();
                },
                'clear': function () {
                    definejs.confirm('确认要清空服务器端的日志列表？', function () {
                        API.clear();
                    });
                },
                'close': function () {
                    panel.fire('close');
                },
            },

            
        });

        Filter.on({
            'change': function (opt) {
                let data = Data.parse(meta.list, opt);
                List.render(data);
            },
        });
        



        List.on({
            'cmd': function (cmd, value) {
                panel.fire('cmd', [cmd, value]);
            },
        });

        API.on('success', {
            'get': function (list) {
                let data = Data.parse(list);

                meta.list = list;
                Header.render();
                Filter.render(data);
                
                SSE.open();
            },

            'clear': function () {
                List.clear();
            },
        });
       

        SSE.on({
            'reset': function (list) {
                List.render(list);
            },

            'add': function (list) {
                let data = Data.parse(list);
                let added = List.add(data);

                //添加失败
                if (!added) {
                    meta.list = [...meta.list, ...list];
                    data = Data.parse(meta.list);
                    Filter.render(data);
                    List.render(data);
                }

            },
        });
  
    });


    view.on('render', function () {
        API.get();

    });




});
