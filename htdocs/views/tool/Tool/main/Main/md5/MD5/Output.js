

define.panel('/Tool/Main/MD5/Output', function (require, module, panel) {
  
    

    panel.on('init', function () {
       

    });

    panel.on('render', function (data) {
        panel.fill({
            'md5': data.md5,
        });
    });


    return {

    };
});