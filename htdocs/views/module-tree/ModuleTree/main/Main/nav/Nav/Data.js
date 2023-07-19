
define('/ModuleTree/Main/Nav/Data', function (require, module, exports) {
    
    return {
        make(item) {
            let list = [item, ...item.parents].reverse();

            let names = list.map((item) => {
                return item.name;
            });


            let { module, } = item.data;
            let path = '/';
            let icon = { type: 'dir', ext: '', };


            if (module) {
                let { file, id, } = module;
                let ext = file.split('.').slice(-1)[0];

                path = id || '/';
                icon = { type: 'file', ext: `.${ext}`, };
            }
           
            return {
                list,
                names,
                path,
                icon,
            };
        },
    }



});
