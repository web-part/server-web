
/**
* 右侧固定的工具栏。
*/
define.panel('/Markdoc/Tools', function (require, module, panel) {
    let list = [
        {
            "cmd": "top",
            "text": "顶部",
            "icon": "fas fa-chevron-up"
        },
        {
            "cmd": "home",
            "text": "首页",
            "icon": "fas fa-home"
        },
        {
            "cmd": "outline",
            "text": "提纲",
            "icon": "fas fa-list"
        },
        {
            "cmd": "font",
            "text": "字体",
            "icon": "fas fa-font"
        },
        {
            "cmd": "print",
            "text": "打印",
            "icon": "fas fa-print"
        },
        {
            "cmd": "bottom",
            "text": "底部",
            "icon": "fas fa-chevron-down"
        }
    ];

    let font = {
        list: [14, 16, 18, 20],
        index: 1,
    };
    

    panel.set('show', false);

    panel.on('init', function () {


        panel.$on('click', '[data-cmd="{value}"]', {
            'top': function () {
                panel.fire('top');
            },

            'home': function () {
                location.hash = '';
            },

            'font': function () {
                let list = font.list;
                let index = font.index + 1;

                if (index >= list.length) {
                    index = 0;
                }

                font.index = index;
                panel.fire('font', [list[index]]);

            },

            'outline': function () {
                panel.fire('outline');
            },

            'print': function () {
                panel.fire('print');
            },

            'bottom': function () {
                panel.fire('bottom');
            },
        });

        panel.template(function (item, index) {
            return {
                'index': index,
                'cmd': item.cmd || '',
                'text': item.text || '',
                'icon': item.icon || '',
            };
        });

    });


   


    panel.on('render', function () {

        panel.fill(list);
        panel.show();

    });


    return {
        set: function (isCode) {
            panel.$.find('[data-cmd="outline"]').toggle(!isCode);
        },
    };


});





    