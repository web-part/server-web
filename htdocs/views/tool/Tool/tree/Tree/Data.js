

define('/Tool/Tree/Data', function (require, module, exports) {

    let list = [
        { name: '二维码', icon: 'fas fa-qrcode', panel: 'QRCode', },
        { name: '内容指纹', icon: 'fas fa-fingerprint', panel: 'MD5' },
        { name: 'Less 编译', icon: 'fab fa-less', panel: 'Less', },
        { name: 'JS 压缩', icon: 'fab fa-node-js', panel: 'JS', },
    ];



    return {
        /**
        * 把 JSON 数据转成树节点列表，用于展示成菜单树。
        */
        make: function (opt) {
            return list.map((item, index) => {
                return {
                    'name': item.name,
                    'id': item.panel,
                    'fileIcon': item.icon,
                    'open': false,

                    'data': {
                        'cmd': item.panel,
                    },
                };
            });

        },

     
    };


});