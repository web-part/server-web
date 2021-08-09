

define('/Log/SSE', function (require, module, exports) {
    const Emitter = require('@definejs/emitter');

    let emitter = new Emitter();
    let config = definejs.config('API');
    let sse = null;



    return exports = {

        on: emitter.on.bind(emitter),

        /**
        * 
        */
        open: function () {
            let url = `${config.url}sse/Log.watch`;


            //先关闭之前的。
            exports.close();

            sse = new EventSource(url);

            sse.addEventListener('open', function (event) {
                // console.log('on-open:', event);
            });

            //这个事件名是后端自定义的。
            sse.addEventListener('reset', function (event) {
                let data = JSON.parse(event.data);
                emitter.fire('reset', [data]);
            });

            //这个事件名是后端自定义的。
            sse.addEventListener('add', function (event) {
                let data = JSON.parse(event.data);
                emitter.fire('add', [data]);
            });


            sse.addEventListener('error', function (event) {
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



           
            sse.onmessage = function (event) {
                console.log('onmessage', event)
            };

            

        },


        close() {
            if (!sse) {
                return;
            }

            sse.close();
            sse = null;
            return true;
        },


    };


});