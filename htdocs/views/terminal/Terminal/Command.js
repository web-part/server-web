
define('/Terminal/Command', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');
    const Source = module.require('Source');
    const FileList = module.require('FileList');

    let emitter = new Emitter();


    let meta = {
        cmd: '',
        fs: null,
        init: false,
    };


    function init() {
        if (meta.init) {
            return;
        }

        meta.init = true;

        FileList.on('success', function (fs) {
            meta.fs = fs;
            Source.open(meta.cmd);
        });


        Source.on('stdout', function (data) {
            data.type = 'stdout';
            emitter.fire('data', [data, meta.fs]);
        });

        Source.on('stderr', function (data) {
            data.type = 'stderr';
            emitter.fire('data', [data, meta.fs]);
        });

        Source.on('error', function (data) {
            data.type = 'error';
            emitter.fire('data', [data, meta.fs]);
        });
    }



    return {
        on: emitter.on.bind(emitter),


        run(cmd) {
            meta.cmd = cmd;
            init();

            if (meta.fs) {
                Source.open(cmd);
            }
            else {
                FileList.get();
            }
        },

        close() {
            return Source.close();
        },
    };
});