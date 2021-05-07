

define('/Terminal/Command/Source', function (require, module, exports) {
    const Query = require('@definejs/query');
    const Emitter = require('@definejs/emitter');

    let emitter = new Emitter();
    let config = definejs.config('API');
    let source = null;



    return exports = {

        on: emitter.on.bind(emitter),

        /**
        * 
        */
        open: function (cmd) {
            let args = cmd.split(' ');

            cmd = args[0];
            args = args.slice(1);

            let url = Query.add(`${config.url}sse/Terminal.exec`, {
                'cmd': cmd,
                'args': JSON.stringify(args),
            });



            //先关闭之前的。
            exports.close();

            source = new EventSource(url);

            source.addEventListener('open', function (event) {
                // console.log('on-open:', event);
            });

            //这个事件名是后端自定义的。
            source.addEventListener('stdout', function (event) {
                let data = JSON.parse(event.data);

                emitter.fire('stdout', [data]);
            });


            source.addEventListener('error', function (event) {
                let { data, } = event;

                //服务器可能已经关闭了，
                //这里也要关闭，否则会不断重发请求到服务器。
                if (data === undefined) {
                    definejs.alert('服务器可能已经关闭了。')
                    exports.close();
                    return;
                }

                data = JSON.parse(data);

                data.msg = JSON.stringify(JSON.parse(data.msg), null, 4);
            

                emitter.fire('error', [data]);
            });

            source.addEventListener('stderr', function (event) {
                let data = JSON.parse(event.data);

                emitter.fire('stderr', [data]);
            });


           
            source.onmessage = function (event) {
                console.log('onmessage', event)
            };

            

        },


        close() {
            if (!source) {
                return;
            }

            source.close();
            source = null;
            return true;
        },


    };


});