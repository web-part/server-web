

define('/FileList/Sidebar/Stat/Types', function (require, module, exports) {
    const $Object = require('@definejs/object');
    const File = require('File');

    let images = [
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.bmp',
    ];



    return {
        /**
        * 从列表数据中过滤出类型下拉列表。
        */
        get: function (list) {
            if (!list) {
                return [];
            }

            
            let type$count = {
                'dir': 0,
                'file': 0,
                'image': 0,
                'size': 0,
                'isUTF8': 0,
                'notUTF8': 0,
            };

            let ext$count = {};


            list.forEach(function (item, index) {
                let type = item.type;

                type$count[type]++;

                if (type == 'dir') {
                    return;
                }


                let ext = item.ext.toLowerCase();
                let utf8Key = item.isUTF8 ? 'isUTF8' : 'notUTF8';
               
                ext$count[ext] = (ext$count[ext] || 0) + 1;


                if (images.includes(ext)) {
                    type$count['image']++;
                }

                type$count['size'] += item.stat.size;
                type$count[utf8Key]++;


            });




            let items = [ { 'name': '全部', 'value': list.length, desc: '个', class: 'spliter', }, ];

            let size = type$count['size'];

            if (size) {
                size = File.getSizeDesc(size);
                items.push({ 'name': '大小', 'value': size.value, 'desc': size.desc, class: 'dir-size', });
            }

            type$count['dir'] && items.push({ 'name': '目录', 'value': type$count['dir'], desc: '个', });
            type$count['file'] && items.push({ 'name': '文件', 'value': type$count['file'], desc: '个', });

            items.push({ 'name': 'UTF8 编码', 'value': type$count['isUTF8'], desc: '个', });
            items.push({ 'name': '其它编码', 'value': type$count['notUTF8'], desc: '个', });

            type$count['image'] && items.push({ 'name': '图片', 'value': type$count['image'], desc: '个', });


            Object.keys($Object.sort(ext$count)).forEach(function (ext, index) {
                let count = ext$count[ext];
                let name = ext.slice(1) + ' 文件';

                let cssClass = index == 0 ? 'spliter' : '';
                items.push({ 'name': name, 'value': count, desc: '个', class: cssClass, });

            });

            


            return items;
        },

        

    };

});
