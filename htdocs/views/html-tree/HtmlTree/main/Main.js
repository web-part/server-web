
define.panel('/HtmlTree/Main', function (require, module, panel) {
    const Nav = module.require('Nav');
    
    const JsLink = module.require('JsLink');        //CssLink 和 LessLink 共用 JsLink。
    const HtmlLink = module.require('HtmlLink');
    const HtmlBlock = module.require('HtmlBlock');  //LessBlock 和 JsBlock 共用 HtmlBlock。
    const MasterPage = module.require('MasterPage');



    panel.on('init', function () {
        Nav.on({
            'item': function (item) {
                panel.fire('id', [item.id]);
            },
        });

        [JsLink, HtmlLink, HtmlBlock,].forEach((M) => {
            M.on({
                'file': function (file) {
                    panel.fire('file', [file]);
                },
                'id': function (id) {
                    panel.fire('id', [id]);
                },
            });
        });

        


    });


    /**
    * 渲染内容。
    */
    panel.on('render', function (item) {
        Nav.render(item);


        let { link, block, } = item.data;

        if (link) {
            if (link.type == 'HtmlLink') {
                JsLink.hide();
                HtmlLink.render(item);
            }
            else { // `CssLink`、`JsLink`、`LessLink`。
                JsLink.render(item);
                HtmlLink.hide();
            }

            HtmlBlock.hide();
        }
        else if (block) {
            JsLink.hide();
            HtmlLink.hide();
            HtmlBlock.render(item);
        }
        else {
            JsLink.hide();
            HtmlLink.hide();
            HtmlBlock.hide();
        }

    });




    return {
        resize(...args) {
            let w = args.reduce(function (sum, value) {
                return sum + value;
            }, 0);


            let calc = 'calc(100% - ' + w + 'px)';

            panel.$.css({
                'width': calc,
            });

        },
    };

});
