

define.panel('/Tool/MD5/Output', function (require, module, panel) {
  
    

    panel.on('init', function () {
       

    });

    panel.on('render', function ({ md5, }) {
        
        panel.fill({ md5, });
    });


    return {

    };
});