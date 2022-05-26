

define('Pager/Events', function (require, module, exports) {

    
    return {

        bind: function (meta) {
            
            function jump() {
                let txt = document.getElementById(meta.txtId);
                let no = +txt.value;

                if (no != meta.no) {
                    meta.this.to(no);
                }

            }

            //点击上一页。
            meta.$.on('click', '[data-cmd="prev"]', function () {
                meta.this.jump(-1);
            });

            //点击页码。
            meta.$.on('click', '[data-no]', function () {
                let { no, } = this.dataset;
                no = Number(no);

                if (no != meta.no) {
                    meta.this.to(no);
                }
            });

            //点击下一页。
            meta.$.on('click', '[data-cmd="next"]', function () {
                meta.this.jump(1);
            });

            //点击 GO。
            meta.$.on('click', '[data-cmd="to"]', function () {
                jump();
            });

            //点击每页大小。
            //更改了分页的大小，要全部重算。
            meta.$.on('change', `#${meta.sizerId}`, function () {
                let index = this.selectedIndex;

                meta.size = meta.sizes[index];
                meta.this.to(1);
            });

            //自动选中文本框内的值，方便用户快速修改。
            meta.$.on('focus', `#${meta.txtId}`, function (event) {
                console.log('focus')
                let txt = document.getElementById(meta.txtId);
                txt.select();
            });


            //页面输入框中的键盘过滤。
            meta.$.on('keydown', `#${meta.txtId}`, function (event) {
                let keyCode = event.keyCode;

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

