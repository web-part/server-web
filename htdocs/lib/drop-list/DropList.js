/**
*
* 带输入文本框的下拉列表组件。
*/
define('DropList', function (require, module) {
    const $ = require('$');
    const Defaults = require('Defaults');
    
    const Emitter = require('@definejs/emitter');
    const $Array = require('@definejs/array');
    const $Object = require('@definejs/object');

    const Current = module.require('Current');
    const Field = module.require('Field');
    const Filter = module.require('Filter');
    const Input = module.require('Input');
    const Masker = module.require('Masker');
    const Meta = module.require('Meta');
    const Table = module.require('Table');
    const Template = module.require('Template');

    let mapper = new Map();


    function DropList(config) {
        config = Defaults.clone(module, config);

        let emitter = new Emitter(this);
        let current = Current.create();

        let meta = Meta.create(config, {
            'emitter': emitter,
            'current': current,
            'this': this,
        });

  
        mapper.set(this, meta);

        Object.assign(this, {
            'id': meta.id,
            '$': meta.$,
            'meta': meta,
        });

        //绑定默认过滤器。
        Filter.bind(meta);
      
    }



    DropList.prototype = { //实例方法
        constructor: DropList,

        id: '',
        $: null,

        /**
        * 
        */
        render: function (list) {
            let meta = mapper.get(this);
            let tpl = meta.tpl = Template.create(meta);
            let html = tpl.fill(meta);

            meta.$ = this.$ = $(meta.container);
            meta.$.html(html);
            meta.$.addClass(meta.cssClass);
        
            let table = meta.table = Table.create(meta);
            table.render();

            meta.txt = Input.create(meta);
            meta.masker = Masker.create(meta);

            meta.$table = $('#' + meta.tableId);
            meta.$txt = $(meta.txt);

            list && this.fill(list);
        },


        /**
        * 填充下拉列表部分。
        * 已重载 fill(list);
        * 已重载 fill(list, fn);
        * 已重载 fill(list, keyword);
        * 已重载 fill(list, keyword, fn);
        * 如果指定了关键词，则进行关键词高亮。
        * 如果指定了处理函数或过滤，则进处数据的处理转换或过滤。
        */
        fill: function (list, keyword, fn) {
            //重载 fill(list, fn);
            if (typeof keyword == 'function') {
                fn = keyword;
                keyword = '';
            }

            let meta = mapper.get(this);

            list = $Array.map(list, function (item, index) {
                if (!fn) {
                    return item;
                }

                let value = fn.call(meta.this, item, index);

                return value === false ? null :
                    typeof value == 'object' ? value : item;
            });

            if (!keyword) {
                meta.list = list;
            }

            //要填充的最终列表。
            let items = Field.map(meta.field, list);
            let html = keyword ? meta.tpl.fill('keyword', { keyword, }) : '';
            let current = meta.current;

            current.item && Object.assign(meta.old, current);

            Current.reset(meta, {
                'keyword': keyword,
                'html': html,
                'index': -1,    //重置一下。
            });
           
            meta.table.fill(items);
            meta.emitter.fire('fill', [list]);
        },



        /**
        * 从下拉列表中选择指定的项。
        * 或选中文本框内的文本。
        * 已重载 select() 选中文本框内的文本。
        * 已重载 select(index) 从下拉列表中选择指定索引值的项。
        * 已重载 select(id) 从下拉列表中选择指定id 值的项。
        * 已重载 select(fn) 从下拉列表中选择符合条件的项。
        */
        select: function (options) {
            let meta = mapper.get(this);
            let txt = meta.txt;

            //重载 select(); 选中并返回文本框内的文本值。
            if (arguments.length == 0) {
                txt.select();
                return txt.value;
            }

            //选择指定的项。
            let row = Table.getRow(meta.table, options);

            if (!row) {
                console.warn('要选择的项无法找到:', options);
                return;
            }


            let item = row.data;

            if (item.disabled) {
                console.warn('要选择的项已给禁用:', item);
                return;
            }


            let current = meta.current;

            //选中的是同一项。
            if (current.item === item) {
                meta.masker && meta.masker.hide(); //可能已给 destroy();
                console.warn('要选择的项已给选中:', item);
                return;
            }


            //选中的不是同一项。
            let oldRow = current.row;
            let oldItem = current.item;
            let event = current.event;

            current.row = row;
            current.item = item;
            current.event = null; //清空一下，避免影响下次。

            oldRow && $(oldRow.element).removeClass('on');

            $(row.element).addClass('on');
            meta.$txt.removeClass('error');         //移除输入框中的错误提示。
            row.element.scrollIntoViewIfNeeded();

            this.hover(row.index);

            //手动选中的，让视觉上有个选中的效果。
            event && setTimeout(function () {
                meta.visible && meta.masker && meta.masker.hide(); //可能已给隐藏或 destroy();
            }, 50);


            let field = meta.field;

            if (field && field.text) {
                let text = meta.getValue(item.item, field.text);
                this.set('text', text);
            }

            meta.emitter.fire('select', [item, {
                'index': row.index,
                'row': row,
                'item': item,
                'event': event,
                'keyword': current.keyword,
                'oldRow': oldRow,
                'oldItem': oldItem,
            }]);


        },

        /**
        * 悬停在指定索引值的项上。
        */
        hover: function (index) {
            let meta = mapper.get(this);
            let target = meta.table.get(index);
            let old = meta.current.hover;

            if (!target) {
                old && $(old.element).removeClass('hover');
                meta.current.hover = null;
                return;
            }

            if (target === old) {
                return;
            }

            meta.current.hover = target;
            old && $(old.element).removeClass('hover');
            $(target.element).addClass('hover');
            target.element.scrollIntoViewIfNeeded();
        },



 
        /**
        * 设置指定的属性。
        * 已重载 set(obj); 批量设置的情况。
        * 已重载 set(key, value); 单个设置的情况。
        */
        set: function (key, value) {
            let obj = $Object.isPlain(key) ? key : { [key]: value, };
            let meta = mapper.get(this);


            $Object.each(obj, function (key, value) {
                switch (key) {
                    case 'text':
                        meta.change(value);
                        break;

                    case 'disabled':
                        value = !!value;
                        meta.txt.disabled = meta.disabled = value;
                        break;

                    case 'list':
                        meta.list = value || [];
                        break;
                }
            });
        },

        get: function (key) {
            let meta = mapper.get(this);
            let current = meta.current;

            if (!key) {
                return current.item;
            }


            switch (key) {
                case 'text':
                case 'disabled':
                case 'length':
                    return meta[key];
            }

        },

        /**
        * 重置。
        */
        reset: function () {
            let meta = mapper.get(this);
            let current = meta.current;
            let row = current.row;

            row && $(row.element).removeClass('on hover');

            meta.old = {};
            Current.reset(meta);    //这个在前。

            this.set({
                'text': '',
                'disabled': false,
            });

            meta.emitter.fire('reset');
        },

        /**
        * 给本控件实例绑定事件。
        */
        on: function () {
            let meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },

        /**
        * 销毁本控件实例。
        */
        destroy: function () {
            let meta = mapper.get(this);

            //已销毁。
            if (!meta) {
                return;
            }

            meta.emitter.destroy();
            meta.table.destroy();
            meta.masker.destroy();
            meta.tpl.destroy();


            meta.current = null;
            meta.$ = null;
            meta.txt = null;
            meta.this = null;
            meta.$txt = null;
            meta.$table = null;
            meta.masker = null;


            mapper.delete(this);
        },
    };


    return DropList;

});

