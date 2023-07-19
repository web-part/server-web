
define.panel('/Log/List', function (require, module, panel) {
    const $Date = require('@definejs/date');
    const API = module.require('API');
    const Data = module.require('Data');
    const Template = module.require('Template');

    let meta = {
        data: null,
        filter: null,
        date$group: null,
        groups: [],
    };


    panel.on('init', function () {
        Template.init(panel);



        panel.$on('click', {
            '[data-id="header"]': function (event) {
                let { no, } = this.dataset;
                let group = meta.groups[no];
                let $group = $(this.parentNode);
                let $ul = $group.find(`>ul`);

                $group.toggleClass('hide');

                //已填充，直接展开。
                if (group.filled) {
                    $ul.slideToggle('fast');
                    return;
                }

                //首次填充。
                $ul.slideDown('fast');

                setTimeout(() => {
                    API.get(group.date, function (list) {
                        list = Data.normalize(list);

                        list = list.filter(({ type, }) => {
                            return !!meta.filter.type$checked[type];
                        });
                        
                        console.log({ list });
                        group.list = list;

                        
                        let tpl = panel.template();
                        let info = { list, no, };
                        let html = tpl.fill('group', 'item', list, info);

                        $ul.html(html);
                        group.filled = true;
                    });

                }, 200);

            },

            '[data-cmd="time"]': function (event) {
                let li = this.parentNode;
                let { no, index, } = li.dataset;
                let { list, } = meta.groups[no];
                let $li = $(li);
                let $ul = $(li.parentNode);

                index = Number(index);

                let maxIndex = Data.findMaxIndex(list, index);

                if (maxIndex > -1) {
                    $li.toggleClass('fold-same-time');
                    $ul.find(`>li:lt(${maxIndex + 1}):gt(${index})`).slideToggle('fast');
                }

            },
        });

  
    });





    panel.on('render', function (stat, filter) {
        let { date$group, groups, } = Data.parse(stat, filter);
       
        meta.filter = filter;
        meta.date$group = date$group;
        meta.groups = groups;

        panel.fill({ groups, });

    });

    


    
    return {
        add(list) {
            if (meta.groups.length == 0) {
                panel.fire('reset');
                return;
            }

            list = Data.normalize(list);

            list = list.filter(({ type, }) => {
                return !!meta.filter.type$checked[type];
            });


            list.forEach((item) => {
                let { date, time, type, msg, } = item;
                let group = meta.date$group[date];

                if (!group) {
                   
                    panel.fire('reset');
                    return;
                }
     
                let { list, no, } = group;

                list.push(item);
                group.total++;

                let index = list.length - 1;
                let info = { list, no, };
                let tpl = panel.template();
                let html = tpl.fill('group', 'item', item, index, info);

                let $group = panel.$.find(`>li[data-group="${date}"]`);
                let $ul = $group.find('>ul');
                let $total = $group.find('[data-id="total"]');


                $ul.append(html);
                $total.html(`(${group.total})`);





            });


          
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
