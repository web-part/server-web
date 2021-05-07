
define.panel('/Log/List', function (require, module, panel) {
    const $Date = require('@definejs/date');
    const Colors = module.require('Colors');
    const File = module.require('File');
    const HTML = module.render('HTML');
   

    let type$icon = {
        input: `<i class="fas fa-terminal"></i>`,
        info: `<i class="fas fa-info-circle"></i>`,
        stdout: ``,
    };

    let meta = {
        list: [],
        fs: null,
    };

    panel.on('init', function () {
        

        panel.$on('click', {
            '[data-cmd]': function (event) {
                let { cmd, value, } = event.target.dataset;
               
                panel.fire('cmd', [cmd, value]);
            },
        });

        panel.template(function (item, index) {
            if (!item) {
                return '';
            }

            let { msg, time, type, } = item;

           

            time = $Date.format(time, 'HH:mm:ss');
            msg = HTML.render(msg);
            msg = Colors.render(msg);
            msg = File.render(msg, meta.fs);

            type = type || 'stdout';


            let icon = type$icon[type] || '';
            let prev = meta.list[index - 1];
            let isSameTime = false;

            if (prev) {
                let time0 = $Date.format(prev.time, 'HH:mm:ss');
                isSameTime = time == time0;
            }



            return {
                'time': time,
                'same-time': isSameTime ? 'same' : '',
                'index': index,
                'msg': msg,
                'type': type,
                'icon': icon,
            };

            
        });

  
    });


    


    panel.on('render', function (list, fs) {
        
        meta.list = list;
        meta.fs = fs;
        panel.fill(list);

        let maxIndex = list.length - 1;

        if (maxIndex >= 0) {
            panel.$.find(`li[data-index="${maxIndex}"]`).get(0).scrollIntoViewIfNeeded();
        }

       

    });

    return {
        add(type, msg) {
            panel.render({
                'type': type,
                'time': Date.now(),
                'msg': msg,
            });
        },

        clear() {
            list = [];
            panel.$.html('');
        },

        showTime(checked) {
            panel.$.toggleClass('hide-time', !checked);
        },

        showColor(checked) {
            panel.$.toggleClass('show-color', checked);
        },

        showHighlight(checked) {
            panel.$.toggleClass('show-highlight', checked);
        },

        showBorder(checked) {
            panel.$.toggleClass('show-border', checked);
        },

        
    };






});
