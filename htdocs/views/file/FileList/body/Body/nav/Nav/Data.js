
define('/FileList/Body/Nav/Data', function (require, module, exports) {
    
    return {
        make(data) {
            let { type, root, } = data;
            let name = type == 'file' ? data.name : data.item.id;
            let icon = type == 'file' ? data : data.item.data;

            let names = `${root}${name}`.split('/').filter((name) => {
                return !!name;
            });

            let path = names.join('/');
            

            return {
                names,
                path,
                icon,
            };
        },
    }



});
