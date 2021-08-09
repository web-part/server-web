
define.view('/Setting', function (require, module, view) {
    const Header = module.require('Header');
    const Theme = module.require('Theme');
    const Local = module.require('Local');

 

    view.on('init', function () {

        
  
    });


    view.on('render', function () {
        Header.render();
        Theme.render();
        Local.render();
    });



    return {

    };

});
