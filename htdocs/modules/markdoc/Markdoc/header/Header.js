
/**
* 针对代码模式的头部工具栏。
*/
define.panel('/Markdoc/Header', function (require, module, panel) {
    const $String = require('@definejs/string');

    
    let list = [
        { cmd: 'numbers', text: '行号', checked: true, },
        { cmd: 'comment', text: '注释', checked: true, },
        //{ cmd: 'empty', text: '空行', checked: true, },
        //{ cmd: 'mark', text: '当前行', checked: true, },
    ];


    panel.set('show', false);


    panel.on('init', function () {

        panel.$.on('click', '[data-index]', function () {
            let chk = this;
            let index = +chk.getAttribute('data-index');
            let item = list[index];
            let cmd = item.cmd;
            let checked = chk.checked;

            //在源代码比较多时，选中的动画会比较卡。
            //先让动画完成，再执行其它业务可避免此问题。
            if (checked) {
                setTimeout(function () {
                    panel.fire('check', [cmd, checked]);
                }, 200);
            }
            else {
                panel.fire('check', [cmd, checked]);
            }
            
        });

        panel.template({
            '': function (data) {
                let html = this.fill('html', data);
                return html;
            },

            'html': {
                '': function (data) {
                    let items = this.fill('item', data.list);

                    return {
                        'url': data.url,
                        'name': data.name,
                        'items': items,
                    };
                },
                'item': function (item, index) {

                    return {
                        'id': $String.random(),
                        'index': index,
                        'text': item.text,
                        'checked': item.checked ? 'checked': '',
                    };
                },
            },

        });

    });

    panel.on('render', function (data) {

        if (!data.isCode) {
            panel.hide();
            return;
        }

        panel.fill({
            'url': data.url,
            'name': data.name,
            'list': list,
        });

        panel.show();
       
    });



    return {
        'leave': function (sw) {
            panel.$.toggleClass('fixed', sw);
        },
    };



});
