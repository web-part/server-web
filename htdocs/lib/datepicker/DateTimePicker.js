
/**
* 日期时间选择器类。
*/
define('DateTimePicker', function (require, module, exports) {
    const $ = require('$');
    const $Object = require('@definejs/object');
    const Emitter = require('@definejs/emitter');
    const $String = require('@definejs/string');
    const Defaults = require('Defaults');

    let mapper = new Map();


    //调用原始控件的方法
    function invoke(self, name, $argumetns) {
        let args = Array.from($argumetns);
        let meta = mapper.get(self);
        let $this = meta.$;

        args = [name].concat(args);

        return $this.datetimepicker.apply($this, args);
    }



    /**
    * 构造函数。
    */
    function DateTimePicker(selector, config) {

        // 重载 NumberField( config )
        if ($Object.isPlain(selector)) {
            config = selector;
            selector = config.selector;
            delete config.selector;     //删除，避免对原始造成不可知的副作用
        }


        config = Defaults.clone(module, config);

        let options = Object.assign({}, config);
        let emitter = new Emitter(this);
        let id = $String.random();

        let meta = {
            'id': id,
            '$': null,
            'txt': null,
            'emitter': emitter,
            'selector': selector,
            'options': options,
            'disabled': false,
            'this': this,
        };

        mapper.set(this, meta);

    }



    DateTimePicker.prototype = { //实例方法
        constructor: DateTimePicker,

        id: '',
        $: null,

        render: function (options) {
            let meta = mapper.get(this);
            let emitter = meta.emitter;
            let self = this;

            meta.$ = this.$ = $(meta.selector);
            meta.txt = meta.$.get(0);

            meta.$.datetimepicker(meta.options);

            meta.$.on({
                'focus': function () {
                    this.select();
                },
                'change': function () {
                    let value = this.value;
                    meta.value = value;
                    console.log(value);

                    emitter.fire('change', [value]);
                },
                'click': function () {
                    meta.this.show();
                },
            });

            if (options) {
                let value = options.value;
                value && meta.$.val(value);
            }

        },

        on: function (name, fn) {
            let meta = mapper.get(this);
            meta.emitter.on(...arguments);
        },

        remove: function () {
            invoke(this, 'remove', arguments);
        },

        show: function () {
            invoke(this, 'show', arguments);
        },

        hide: function () {
            invoke(this, 'hide', arguments);
        },

        update: function () {
            invoke(this, 'update', arguments);
        },

        setStartDate: function () {
            invoke(this, 'setStartDate', arguments);
        },

        setEndDate: function () {
            invoke(this, 'setEndDate', arguments);
        },

        setDaysOfWeekDisabled: function () {
            invoke(this, 'setDaysOfWeekDisabled', arguments);
        },

        destroy: function () {
            let meta = mapper.get(this);

            //已销毁。
            if (!meta) {
                return;
            }

            meta.emitter.destroy();
            meta.$.off();
           

            mapper.delete(this);

        },

        set: function (key, value) {
            let meta = mapper.get(this);
            let txt = meta.txt;

            switch (key) {
                case 'disabled':
                    value = !!value;
                    meta.disabled = value;
                    txt.disabled = value;
                    break;
                case 'value':
                    meta.$.val(value);
                    break;
            }

        },

        get: function (key) {
            let meta = mapper.get(this);

            switch (key) {
                case 'disabled':
                    return meta[key];
            }

        },
    };



    return DateTimePicker;



});

