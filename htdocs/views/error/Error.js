
define.view('/Error', function (require, module, view) {

 

    view.on('init', function () {

  
    });


    view.on('render', function (page, ex) {
        view.fill({
            'name': page.name,
            'ex': ex.stack,
        });


        console.log(ex);

    });




});
