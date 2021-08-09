

define('/DocAdd/Data/Status', function (require, module, exports) {
    const Storage = require('@definejs/local-storage');

    let storage = new Storage(module.id);


    let meta = {
        /**
        * 状态。 取值：
        *   'init': 初始状态。
        *   'read': 刚读取文件的状态。
        *   'changed',
        *   'saved',
        */
        'status': storage.get('status') || 'init',
    };



    return {

        panel: null,

        set(status) {
            status = meta.status = (status || meta.status);
            storage.set('status', status);

            // console.log(module.id, 'status:', status);

            this.panel.fire('status', status, []);
           
        },
        
        get() {
            return meta.status;
        },

        confirm(done) {
            if (meta.status == 'changed') {
                definejs.confirm(`当前编辑器中存在未保存的内容，是否继续加载新内容？`, done);
            }
            else {
                done();
            }
        },
    };


});
