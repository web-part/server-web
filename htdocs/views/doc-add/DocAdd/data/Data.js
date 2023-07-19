

define.panel('/DocAdd/Data', function (require, module, panel) {
    const API = module.require('API');
    const Storage = module.require('Storage');
    const Status = module.require('Status');
   


    panel.on('init', function () {
        Status.panel = panel;

        API.on('success', {

            'read': function ({ file, content, ext, }) {
                Storage.set({ file, content, ext, });
                Status.set('read');
                panel.fire('render', [{ file, content, ext, }]);
            },

            'save': function (data, opt) {
                Storage.set(data);
                Status.set('saved');
                panel.fire('save', [data, opt]);
            },
        });
    });

   

    panel.on('render', function (file) {
        //没指定文件 id 或内容，则从 storage 中读取。
        if (file === undefined) {
            let data = Storage.get();
            Status.set('init');
            panel.fire('render', [data]);
            return;
        }

        //传入是文件 id。
        if (typeof file == 'string') {
            Status.confirm(function () {
                API.read(file);
            });
            return;
        }

        
        //指定了新内容。
        if (typeof file == 'object') {
            Status.confirm(function () {
                let { content, ext, } = file;
                let old = Storage.get();
                let data = Storage.set({ content, ext, });

                //指定了新的内容。
                let status =
                    content === '' ? 'init' :
                    content != old.content ? 'changed' : '';

                Status.set(status);
                panel.fire('render', [data]);
            });
        }

        throw new Error(`无法识别的参数`);


     
        

       

    });






    return {
       
        set(content) {
            let old = Storage.get();

            let status =
                content === '' ? 'init' :
                content != old.content ? 'changed' : '';
           
            
            Status.set(status);
            Storage.set('content', content);
        },

        /**
        * 
        * @param {*} name 
        * @returns 
        */
        save(name) {
            let data = Storage.get();
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

});
