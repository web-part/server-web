
/*
* 
*/
define.panel('a', function (require, module, panel) {
    const DropList = require('DropList');
  
    let droplist = null;
    let list = [
        { id: '0', name: '全部', },
    ];

    //根据列表内容记录对应选中的 index，以便下次同样的内容进来渲染时，可以恢复上次选中的项。
    //主要针对菜单树中的后退功能。
    let json$index = {}; 


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
       
        droplist = new DropList({
            'container': panel.$.find('>div'),
            'columns': ['name'],
            'empty': false,

            'field': {
                id: 'id',
                text: 'name',
                focus: 'name',
                title: 'name',
            },
        });

        droplist.on({
            'error': function (type, msg) {
                definejs.alert(msg);
            },
            'process': function (cell) {
                //return cell.row.data.item[cell.name] + '$$';
            },

            'select': function (item, options) {
                let index = options.index;
                let json = JSON.stringify(list);

                json$index[json] = index;

                panel.fire('change', [item.item.value]);
            },
         
        });

        

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (items) {

        list = items;

        let json = JSON.stringify(items);
        let index = json$index[json] || 0;


        droplist.render();
        droplist.fill(list);
        droplist.select(index);



    });




});



