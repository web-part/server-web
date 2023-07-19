

define('/FileList/Body/Main/Icon/List/Data', function (require, module, exports) {
    function sort(a, b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase(); 

        return a == b ? 0 :
            a > b ? 1 : -1;
    }


    return {
        get(list) {
            let dirs = [];
            let files = [];

            list.forEach((item) => {
                let { icon, } = item.data;
                let list = item.type == 'dir' ? dirs : files;

                list.push({
                    'name': item.name,
                    'icon': icon.html,
                    'raw': item,
                });
            });


            dirs = dirs.sort(sort);
            files = files.sort(sort);

            list = [...dirs, ...files,];

            return list;
        },
    };
});