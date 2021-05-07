

define('Pager/Events', function (require, module) {

    
    return {

        bind: function (meta) {

            let txtId = meta.txtId;
            let sizerId = meta.sizerId;
            let pager = meta.this;


            function jump() {
                let txt = document.getElementById(txtId);
                let no = +txt.value;
                pager.to(no);
            }


            //点击页码按钮
            meta.$.on('click', '[data-no]', function () {
                let li = this;
                if ($(li).hasClass('active')) {
                    return;
                }

                let no = +li.getAttribute('data-no');

                pager.to(no);
            });


            //点击确定。
            meta.$.on('click', '[data-button="to"]', function () {
                jump();
            });


            //点击上一页。
            meta.$.on('click', '[data-button="previous"]', function () {
                pager.previous();
            });

            //点击下一页。
            meta.$.on('click', '[data-button="next"]', function () {
                pager.next();
            });

            //点击每页大小。
            meta.$.on('change', '#' + sizerId, function () {
                let index = this.selectedIndex;
                let size = meta.sizes[index];

                pager.render({ 'size': size, 'no': 1, });
                pager.to(1);
            });


            //页面输入框中的键盘过滤。
            meta.$.on('keydown', '#' + txtId, function (event) {
                let keyCode = event.keyCode;
                console.log(keyCode);

                if (keyCode == 13) {
                    jump();
                    return;
                }

                let isNumber =
                        (48 <= keyCode && keyCode <= 48 + 9) || //主键盘的 0 - 9
                        (96 <= keyCode && keyCode <= 96 + 9);   //数字键盘的 0 - 9

                let isControl =
                        keyCode == 8 ||     //回格键。
                        keyCode == 37 ||    //向左箭头。
                        keyCode == 39 ||    //向右箭头。
                        keyCode == 46;      //Delete 键

                //F1 - F12 键。
                let isFn = 112 <= keyCode && keyCode <= 112 + 11;
                let isValid = isNumber || isControl || isFn;

                if (!isValid) {
                    event.preventDefault();
                    return;
                }

            });
        },

    };


});

