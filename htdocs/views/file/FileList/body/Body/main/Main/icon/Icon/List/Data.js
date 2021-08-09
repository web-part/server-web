

define('/FileList/Body/Main/Icon/List/Data', function (require, module, exports) {
    const File = require('File');

    function sort(a, b) {
        a = a.name;
        b = b.name;

        return a == b ? 0 :
            a > b ? 1 : -1;
    }


    return {
        get(list) {
            let dirs = [];
            let files = [];

            list.forEach((item) => {
                let { data, } = item;
                let { name, type, } = data;
                let ext = File.getExt(name);
                let sname = name.split('/').slice(-1)[0];
                let oItem = { ...data, ext, sname, };
                let list = type == 'dir' ? dirs : files;

                list.push(oItem);
            });


            dirs = dirs.sort(sort);
            files = files.sort(sort);

            list = [...dirs, ...files,];

            return list;
        },
    };
});