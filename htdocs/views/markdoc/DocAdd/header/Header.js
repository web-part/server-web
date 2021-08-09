define.panel('/DocAdd/Header', function (require, module, panel) {
    const $Date = require('@definejs/date');
    const Switch = module.require('Switch');
    const Table = module.require('Table');
    const Validater = module.require('Validater');

    let $name = panel.$.find('[data-id="name"]');



    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function (event) {
            let { cmd, } = this.dataset;
            
            let list = cmd.split(':');
            let target = list.length > 1 ? list[0] : '';
            let act = list.length > 1 ? list[1] : cmd;

            if (!target) {
                panel.fire('cmd', cmd, []);
                return;
            }


            //针对 editor 的。
            if (target == 'editor') {
                panel.fire('editor', [act]);
                return;
            }

            if (target == 'switch') {
                Switch.toggle(this);
                return;
            }

        });


        panel.$on('click', {
            '[data-id="table"]': function () {
                Table.render();
            },
            '[data-id="demo"]': function() {
                let file = $name.val();
                panel.fire('cmd', 'demo', [file]);
            },
            '[data-id="outline"]': function() {
                panel.fire('cmd', 'outline', []);
            },
        });
    

        Table.on({
            'add': function (data) {
                panel.fire('cmd', 'table', [data]);
            },
        });

      
    });



    /**
    * 渲染。
    *   opt = {
    *       name: '',    //文件名称，即文件 id。
    *       ext: '',    //可选，后缀名。 主要针对 json 文件显示相应的按钮。
    *   };
    */
    panel.on('render', function (opt = {}) {
        let { name, ext, } = opt;
        let isEdit = !!name;

     
        $name.val(name);

        $name.attr({
            'disabled': isEdit,
            'title': isEdit ? '这是一个已存在的文件，不允许编辑其路径。' : '',
        });

        panel.$.toggleClass('edit-mode', isEdit);
        panel.$.toggleClass('json', ext == '.json');

        Switch.init(panel);


    });


    return {
        saved: function (saved) {
            if (saved === null) {
                panel.$.find('[data-id="saved"] span').html('已保存');
                panel.$.addClass('saved');
                return;
            }

            if (saved) {
                let time = $Date.format(new Date(), 'HH:mm:ss');
                panel.$.addClass('saved');
                panel.$.find('[data-id="saved"] span').html('已保存 [' + time + ']');

            }
            else {
                panel.$.removeClass('saved');
            }
        },

        get: function () {
            return Validater.check($name);
        },
    };


});
