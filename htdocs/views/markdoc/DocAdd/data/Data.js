

define.panel('/DocAdd/Data', function (require, module, panel) {
    const API = module.require('API');
    const Data = module.require('Data');
    const Status = module.require('Status');
   


    panel.on('init', function () {
        Status.panel = panel;

        API.on('success', {

            'read': function (data) {
                Data.set(data);
                Status.set('read');
                panel.fire('render', [data]);
            },

            'save': function (data, opt) {
                Data.set(data);
                Status.set('saved');
                panel.fire('save', [data, opt]);
            },
        });
    });

   

    panel.on('render', function ({ name, content, ext, }) {
        if (name) {
            Status.confirm(function () {
                API.read(name);
            });
            return;
        }

        //没指定内容，则从 storage 中读取。
        if (content === undefined) {
            let data = Data.get();

            Status.set();
            panel.fire('render', [data]);
            return;
        }


        //指定了新内容。
        Status.confirm(function () {
            let old = Data.get();

            let data = Data.set({
                'name': '',             //这个肯定为空的。
                'content': content,
                'ext': ext,
            });

            //指定了新的内容。
            let status =
                content === '' ? 'init' :
                content != old.content ? 'changed' : '';

            Status.set(status);
            panel.fire('render', [data]);
        });

       

    });






    let exports = {
       
        set(content) {
            let old = Data.get();

            let status =
                content === '' ? 'init' :
                content != old.content ? 'changed' : '';
           
            
            Status.set(status);
            Data.set('content', content);
        },

        /**
        * 
        * @param {*} name 
        * @returns 
        */
        save(name) {
            let data = Data.get();
            let mode = data.name ? 'edit' : 'new';

            if (mode == 'edit') {
                name = data.name;
            }
          
            if (!name) {
                definejs.alert(`文件 id 不能为空。`)
                return;
            }



            API.save({
                'id': name,                 //
                'mode': mode,               // `new` | `edit`。
                'content': data.content,    //
            });
        },

        status() {
            return Status.get();
        },

        
    };

    return exports;

});
