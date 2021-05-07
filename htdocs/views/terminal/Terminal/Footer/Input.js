
define.panel('/Terminal/Footer/Input', function (require, module, panel) {


    let txt = null;


    panel.on('init', function () {

        txt = panel.$.get(0);

        panel.$.on('keyup', function (event) {
            let keyCode = event.keyCode;
            let value = event.target.value;

            //回车键。
            if (keyCode == 13 && value) {
                panel.fire('enter', [value]);
                event.target.value = '';
                return;
            }

        });

        //这里用 keydown 比较好。
        panel.$.on('keydown', function (event) {
            let keyCode = event.keyCode;

            //向上键或向下键。
            if (keyCode == 38 || keyCode == 40) {
                event.preventDefault();

                //-1: 向上。  +1: 向下。
                let step = keyCode - 39;
                panel.fire('move', [step]);
                return;
            }
        });



        panel.$.on('focusin', function () {
            panel.fire('focus', [true]);
        });

        panel.$.on('focusout', function () {
            panel.fire('focus', [false]);
        });
  
    });




    panel.on('render', function (value) {

        txt.value = value || '';
        txt.focus();

    });



    return {
        focus() {
            txt.focus();
        },
    };






});
