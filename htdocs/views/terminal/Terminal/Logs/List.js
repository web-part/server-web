
define.panel('/Terminal/Logs/List', function (require, module, panel) {
    const $Date = require('@definejs/date');
    const Colors = module.require('Colors');
    const File = module.require('File');
    const HTML = module.require('HTML');
   
    let tpl = null;
    let list = [];

    let type$icon = {
        input: `<i class="fas fa-terminal"></i>`,
        info: `<i class="fas fa-info-circle"></i>`,
        stdout: ``,
    };


    panel.on('init', function () {
        
        tpl = panel.template();

        panel.$on('click', {
            '[data-cmd]': function (event) {
                let { cmd, value, } = event.target.dataset;
               
                panel.fire('cmd', [cmd, value]);
            },
        });

  
    });


    


    panel.on('render', function (stdout, fs) {
        let { msg, time, type, } = stdout;

        list.push(stdout);

        time = $Date.format(time, 'HH:mm:ss');
        msg = HTML.render(msg);
        msg = Colors.render(msg);
        msg = File.render(msg, fs);

        type = type || 'stdout';


        let icon = type$icon[type] || '';
        let index = list.length - 1;
        let prev = list[index - 1];
        let isSameTime = false;

        if(prev){
            let time0 = $Date.format(prev.time, 'HH:mm:ss');
            isSameTime = time == time0;
        }

        let html = tpl.fill({
            'time': time,
            'same-time': isSameTime ? 'same' : '',
            'index': index,
            'msg': msg,
            'type': type,
            'icon': icon,
        });


        panel.$.append(html);
        panel.$.find(`[data-index="${index}"]`).get(0).scrollIntoViewIfNeeded();
        
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
