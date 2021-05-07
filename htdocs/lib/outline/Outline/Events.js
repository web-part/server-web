

define('Outline/Events', function (require, module, exports) {
    const $ = require('$');


    return {
        bind: function (meta) {

            meta.$.on('click', 'li[data-index]', function (event) {
                let index = +this.getAttribute('data-index');
                let item = meta.list[index];

                meta.emitter.fire('item', [item, index]);
            });




            //点击展开/收起的图标。
            meta.$.on('click', 'i[data-index]', function (event) {
                let list = meta.list;
                let index = +this.getAttribute('data-index');
                let item = list[index];
                let children = item.children || [];

                //没有下级节点。
                if (children.length == 0) {
                    return;
                }


                let $icon = $(this);
                let needOpen = $icon.hasClass('closed');
                let beginIndex = index + 1;

                let endIndex = list.slice(beginIndex).findIndex(function (oItem, index) {
                    return oItem.level <= item.level;
                });

                endIndex = endIndex < 0 ? list.length : endIndex + beginIndex;
                console.log(beginIndex, endIndex);


                $icon.toggleClass('opened', needOpen);
                $icon.toggleClass('closed', !needOpen);
                $icon.attr({
                    'title': needOpen ? '点击收起子级' : '点击展开子级',
                });

                event.stopPropagation();




                list.slice(beginIndex, endIndex).forEach(function (oItem, index) {
                    index = index + beginIndex;

                  
                    let $li = meta.$.find(`li[data-index="${index}"]`);
                    let key = 'closed-count';
                    let count = $li.data(key) || 0; //记录关闭的计数，为 0 时，才能打开。


                    if (needOpen) { //要打开。
                        count--;

                        if (count <= 0) {
                            count = 0;              //确保不会出现负数。
                            $li.slideDown('fast');
                        }
                    }
                    else {//要关闭
                        count++;
                        $li.slideUp('fast');
                    }

                    $li.data(key, count);
                   
                });





            });


        },

    };
});