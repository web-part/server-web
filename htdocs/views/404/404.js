
define.view('/404', function (require, module, view) {


    view.on('init', function () {

  
    });


    view.on('render', function (name) {
        console.log(module.id, name);
    });

});
