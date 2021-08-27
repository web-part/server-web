

define('/Home/Server/Status', function (require, module, exports) {
    const Query = require('@definejs/query');
    const Emitter = require('@definejs/emitter');
    const Toast = require('@definejs/toast');

    let emitter = new Emitter();
    let toast = new Toast({
        icon: 'ban',
        mask: 0.25,
        width: 200,
        text: '服务器已停止运行',
    });

    let config = definejs.config('API');
    let source = null;


    function close() {
        if (!source) {
            return;
        }

        source.close();
        source = null;
        return true;
    }


    return exports = {

        on: emitter.on.bind(emitter),

        /**
        * 
        */
        test: function () {
            let url = Query.add(`${config.url}sse/Terminal.exec`, {
                cmd: 'pwd',
                args: '[]',
            });

            let status = true;

            function change(running) {
                //true --> true
                //false --> false
                if (running === status) {
                    return;
                }

                //false --> true
                if (status === false && running === true) {
                    toast.hide();
                    emitter.fire('restart');
                }
                else {
                    // true --> false
                    toast.show('服务器已停止运行');
                    emitter.fire('close');
                }

                status = running;
            }



            //先关闭之前的。
            close();
            source = new EventSource(url);

            //这个事件名是后端自定义的。
            source.addEventListener('stdout', function (event) {
                change(true);
            });


            source.addEventListener('error', function (event) {
                let { data, } = event;

                //服务器可能已经关闭了，会不断重发请求到服务器。
                if (data === undefined) {
                    change(false);
                    return;
                }
            });


            source.addEventListener('stderr', function (event) {
                change(true);
            });



        },



    };


});