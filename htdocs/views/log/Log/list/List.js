
define.panel('/Log/List', function (require, module, panel) {
    const Template = module.require('Template');

    let meta = {
        list: [],
        groups: [],
        date$list: [],
        date$time$list: [],
    };

    function scrollToBottom() {
        let maxNo = meta.groups.length - 1;
        if (maxNo < 0) {
            return;
        }

        let maxIndex = meta.groups[maxNo].list.length - 1;

        let li = panel.$.find(`li[data-id="${maxNo}-${maxIndex}"]`).get(0);

        if (li) {
            li.scrollIntoViewIfNeeded();
        }
    }

    panel.on('init', function () {
        Template.init(panel, meta);


        panel.$on('click', {
            '[data-date]': function (event) {
                let { no, } = this.dataset;
                let $parent = $(this.parentNode);
                let { $ul, filled, } = Template.getGroup(no);

                $parent.toggleClass('hide');

                //已填充，直接展开。
                if (filled) {
                    $ul.slideToggle('fast');
                    return;
                }

                //首次填充。
                $ul.slideDown('fast');

                setTimeout(() => {
                    Template.fillGroup(no);
                }, 200);

            },

            '[data-cmd="datetime"]': function (event) {
                let li = this.parentNode;
                let { no, index, } = li.dataset;
                let group = meta.groups[no];
                let {date, time, } = group.list[index];
                let $ul = $(li.parentNode);

                $(li).toggleClass('fold-same-time');
                $ul.find(`li[data-dt="${date} ${time}"]`).slideToggle('fast');
            },
        });

  
    });


    


    panel.on('render', function (data) {
        console.log(module.id, data);

        meta.list = data.list;
        meta.groups = data.groups;
        meta.date$list = data.date$list;
        meta.date$time$list = data.date$time$list;


        panel.fill(meta);
        scrollToBottom();


    });

    

    return {
        add(data) {
            let { list, groups, } = data;
            let group = groups.length == 1 ? groups[0] : null;  //首组。
            let last = meta.groups.slice(-1)[0] || null;        //最后一组。
        
            //不符合直接在最后一组追加，则全部重新渲染。
            //全部重新渲染，代码简单，但性能不好。
            if (!group || !last || group.date != last.date) {
                return false;
            }

            //大多数情况都符合直接在最后一组追加。
            list = group.list;

            
            let no = meta.groups.length - 1;
            let { $ul, filled, } = Template.getGroup(no);

            if (!filled) {
                Template.fillGroup(no);
            }


            let tpl = panel.template();

            let html = tpl.fill('group', 'item', list, {
                'list': list,
                'no': no,
                'baseIndex': last.list.length, //追加数据，需要修正索引。
            });

            $ul.append(html);

            last.list = [...last.list, ...list,]; //合并分组。
            scrollToBottom();
            return true;
        },



        clear() {
            meta.groups = [];
            panel.$.html('');
        },

        check(key, checked) {
            if (key == 'time') {
                panel.$.toggleClass(`hide-${key}`, !checked);
            }
            else {
                panel.$.toggleClass(`show-${key}`, checked);
            }
        },

        
    };






});
