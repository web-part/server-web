

define.panel('/Home/JsModule/Main', function (require, module, panel) {

    const Data = module.require('Data');

   

    panel.on('init', function () {

        panel.template({
            '': function (data) {
                let html = this.fill('html', data);
                return html;
            },

            'html': {
                '': function (data) {
                    let {
                        ids,

                        nones,
                        publics,
                        privates,

                        singles,
                        parents,

                        views,
                        panels,
                        defines,

                        levels,
                    } = data;


                    let levelList = this.fill('level', levels);

                    return {
                        'all': ids.length,

                        'none': nones.length,
                        'public': publics.length,
                        'private': privates.length,

                        'view': views.length,
                        'panel': panels.length,
                        'define': defines.length,

                        'single': singles.length,
                        'parent': parents.length,
                        'child': privates.length,

                        'levels': levelList,
                    };
                },

                'level': function (item) {
                    return {
                        'level': item.level,
                        'count': item.ids.length,
                    };
                },
            },

        });


    });


    panel.on('render', function (stat) {
        
        let data = Data.parse(stat);
            

        panel.fill(data);
    });

});
