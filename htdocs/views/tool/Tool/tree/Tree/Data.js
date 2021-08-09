

define('/Tool/Tree/Data', function (require, module, exports) {



    return {
        /**
        * 把 JSON 数据转成树节点列表，用于展示成菜单树。
        */
        make: function (opt) {
            let cid = 1;

            return [
                {
                    'name': '内容指纹',
                    'id': `${cid++}`,
                    'open': false,
                    'fileIcon': 'fas fa-fingerprint',
                    'data': {
                        cmd: 'MD5',
                    },
                },
                {
                    'name': '二维码',
                    'id': `${cid++}`,
                    'open': false,
                    'fileIcon': 'fas fa-qrcode',
                    'data': {
                        cmd: 'QRCode',
                    },
                },
            ];
        },

     
    };


});