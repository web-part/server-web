

define('MenuTree/Events', function (require, module, exports) {
    const $ = require('$');

    function toggleOpen(meta, item, $li) {
        let $icon = $li.find('> div > i[data-cmd="icon-dir"]');
        let $ul = $li.children('ul');
        let open = item.open = !item.open;
        let cmd = open ? 'open' : 'close';
        let dirIcon = item.dirIcon || meta.dirIcon;

        if (open) {
            $icon.removeClass(dirIcon.close);
            $icon.addClass(dirIcon.open);
            $ul.slideDown('fast');

        }
        else {
            $icon.removeClass(dirIcon.open);
            $icon.addClass(dirIcon.close);
            $ul.slideUp('fast');
        }

        $li.toggleClass('open', open);
        meta.emitter.fire(cmd, [item]);

    }




    return {
        bind: function (meta) {

            //点击菜单项。
            meta.$.on('click', '[data-cmd="item"]', function (event) {
                let li = this.parentNode;
                let { id, } = li.dataset;
                let item = meta.id$item[id];
                let $li = $(li);
                let $ul = $li.children('ul');

                let { current, } = meta;

                if (current) {
                    meta.$.find(`[data-id="${current.id}"]`).removeClass('on'); //灭掉旧的;
                }

                $li.addClass('on');
                meta.current = item;
                
                //点击的是一个目录。
                if (item.list.length > 0) {
                    if (item === current) {
                        toggleOpen(meta, item, $li);
                    }
                    else { //点击的不是当前项。
                        if (!item.open) {
                            toggleOpen(meta, item, $li);
                        }
                        meta.emitter.fire('item', [item]);
                    }
                }
                else { //点击的是一个文件。
                    meta.emitter.fire('item', [item]);
                }

                this.scrollIntoViewIfNeeded();

            });



            //点击目录的图标。
            meta.$.on('click', '[data-cmd="icon-dir"]', function (event) {
                event.stopPropagation();

                let li = this.parentNode.parentNode;
                let { id, } = li.dataset;
                let item = meta.id$item[id];
                let $li = $(li);
               

                toggleOpen(meta, item, $li);

               
            });
        },

    };
});