

define.panel('/ModuleTree/Main/Dependent/Header', function (require, module, panel) {
    

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

       
    });




    panel.on('render', function (list) {
        
        panel.fill({
            'total': list.length,
        });
        

    });





});
