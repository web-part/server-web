

define.panel('/Tool/MD5/Input', function (require, module, panel) {
  
    

    panel.on('init', function () {
       
        panel.$on('click', {
            'button': function () {
                let value = panel.$.find('textarea').val();

                //因为在 `@webpart/master` 里用的是 `\r\n`，这里也保持一致。
                value = value.split('\n').join('\r\n');

                panel.fire('submit', [value]);
            },
        });


    });

    panel.on('render', function () {
        

    });


    return {

    };
});