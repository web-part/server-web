
define('Dialog', function (require, module, exports) {
    const $ = require('$');
    const Defaults = require('Defaults');

    const Emitter = require('@definejs/emitter');
    const Masker = require('@definejs/masker');
    const Panel = require('@definejs/panel');

    const Meta = module.require('Meta');
    const Template = module.require('Template');
    const Drager = module.require('Drager');
    const Resizer = module.require('Resizer');
    const Style = module.require('Style');
    const Events = module.require('Events');

    let mapper = new Map();




    function Dialog(config) {

        config = Defaults.clone(module, config);

        let emitter = new Emitter(this);

        let meta = Meta.create(config, {
            'this': this,
            'emitter': emitter,
        });

        mapper.set(this, meta);

        this.id = meta.id;
        this.$ = meta.$;

    }




    Dialog.prototype = {
        constructor: Dialog,

        id: '',
        $: null,

        render: function (options) {
            options = options || {};

            let meta = mapper.get(this);
            let emitter = meta.emitter;

            if (meta.rendered) { //已渲染过。
                this.set(options);
                this.show();
                emitter.fire('render', [options]);
                return;
            }

            //首次渲染。
            let title = meta.title = options.title || meta.title;
            let content = meta.content = options.content || meta.content;
            let footer = meta.footer = options.footer || meta.footer;
            let style = Style.get(meta);
            let headerId = meta.headerId;

            let html = Template.fill({
                'id': meta.id,
                'headerId': headerId,
                'contentId': meta.contentId,
                'footerId': meta.footerId,
                'sizerId': meta.sizerId,
                'cssClass': meta.cssClass,
                'resizable': meta.resizable,
                'attributes': meta.attributes,
                'style': style,
                'title': title,
                'content': content,
                'footer': footer,
            });

            $(document.body).prepend(html);
            meta.rendered = true;           //更改状态。

            this.$ = meta.$ = $('#' + meta.id);  //
            meta.$.toggleClass('auto-size', !meta.width || !meta.height);
            

            if (meta.mask) {
                meta.masker = new Masker({
                    'z-index': meta['z-index'] - 1,
                });
            }

            if (meta.dragable) {
                Drager.set(headerId, meta);
            }

            if (meta.resizable) {
                Resizer.set(meta.id, meta);
            }

            Events.bind(meta);
            this.show();

            emitter.fire('first-render', [options]);
            emitter.fire('render', [options]);
        },

        /**
        * 显示本组件。
        */
        show: function () {
            let meta = mapper.get(this);

            //尚未渲染或已是可见状态。
            if (!meta.rendered || meta.visible) {
                return;
            }

            let masker = meta.masker;
            if (masker) {
                let mask = Masker.normalize(meta.mask);
                masker.show(mask);
            }

            meta.$.show();
            meta.visible = true;
            meta.emitter.fire('show');

        },

        /**
        * 关闭本组件(仅隐藏)。
        */
        close: function (sure) {
            let meta = mapper.get(this);

            //尚未渲染或已是隐藏状态。
            if (!meta.rendered || !meta.visible) {
                return;
            }

            let emitter = meta.emitter;

            if (!sure) {
                let values = emitter.fire('before-close');
                sure = values.slice(-1)[0];
                if (sure === false) { //只有在事件中明确返回 false 才取消关闭。
                    return;
                }
            }
            

            let masker = meta.masker;

            masker && masker.hide();
            meta.$.hide();
            meta.visible = false;
            emitter.fire('close');
        },




        set: function (key, value) {
            let data = typeof key == 'object' ? key : { [key]: value, };
            let meta = mapper.get(this);

            let key$tpl = {
                title: 'header',
                content: 'content',
                footer: 'footer',
            };


            for (key in data) {
                let tpl = key$tpl[key];
                
                if (tpl) {
                    let html = Template.fill(tpl, data);
                    let sid = meta[tpl + 'Id']; //headerId、contentId、footerId。

                    $('#' + sid).html(html);

                    continue;
                }


                value = data[key];

                switch (key) {
                    case 'width':
                    case 'height':
                        meta.$.css(key, value);
                        break;
                }
            }

        },


        on: function (name, fn) {
            let meta = mapper.get(this);
            let emitter = meta.emitter;
            let args = Array.from(arguments);
            emitter.on(args);
        },

        destroy: function () {
            let meta = mapper.get(this);

            //已销毁。
            if (!meta) {
                return;
            }

            meta.emitter.destroy();
            meta.masker.destroy();
            meta.$.off();

            let div = meta.$.get(0);
            div.parentNode.removeChild(div);

            Drager.remove(meta.headerId);
            Resizer.remove(meta.id);
        },
    };


    //静态方法。
    Object.assign(Dialog, {

        /**
        * 根据创建好的 panel 对应去填充对话框中相应的区域，同时会保留原 panel 中原有的逻辑和事件等。
        * 以使用户可以以熟悉的模块化方式去操纵对话框中的内容， 如模板填充、事件绑定等。
        */
        panel: function (options) {
            let Content = options.content;
            let Container = options.container;
            let Footer = options.footer; //可能是一个数组或 DOM 节点。

            let content = Content.$.get(0);
            let container = Container.$.get(0);
            let footer = Footer && !Array.isArray(Footer) ? Footer.$.get(0) : null; //DOM 节点。

            let attributes = {};

             Array.from(container.attributes).map(function (item) {
                let name = item.name;
                if (name == 'class') {
                    return;
                }

                attributes[name] = item.value;
            });


            let config = Object.assign({}, options, {
                'content': content.outerHTML,
                'cssClass': container.className,
                'attributes': attributes,
            });

            config['footer'] = footer ? footer.outerHTML : Footer;

           

            let dialog = new Dialog(config);

      

            dialog.on({
                'first-render': function () {
                    //删除 panel 中对应原先的 DOM 节点，
                    container.parentNode.removeChild(container);
                    content.parentNode.removeChild(content);
                    footer && footer.parentNode.removeChild(footer);

                    //重新绑定到对应原 Panel 中。
                    Container.set('$');


                    let moduleId = container.getAttribute('data-panel');
                    let selector = `[data-panel^="${moduleId}"]`;
                    let list = Container.$.find(selector).toArray();

                    list = list.map(function (item) {
                        return item.getAttribute('data-panel');
                    });


                    Panel.update(list);

                    container = null;
                    content = null;
                    footer = null;

                },
            });

            return dialog;

        },
    });



    return Dialog;
});