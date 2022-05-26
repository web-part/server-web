/**
* HTML 表格组件。
* 提供自定义列、动态生成列表、增加/插入表格行等功能。
*/
define('Table', function (require, module, exports) {
    const $ = require('$');
    const Emitter = require('@definejs/emitter');
    const Meta = module.require('Meta');
    const Row = module.require('Row');
    const Template = module.require('Template');
    const Events = module.require('Events');


    
    let mapper = new Map();


    class Table {
        constructor(config) {
            config = Object.assign({}, exports.defaults, config);

            let emitter = new Emitter(this);
            let meta = Meta.create(config, {
                'emitter': emitter,         //
                'this': this,               //方便内部使用。
            });

            meta.tpl = Template.create(meta);
            mapper.set(this, meta);

            //指定了公开 meta 对象。
            if (config.meta) {
                this.meta = meta;
            }
            
            this.id = meta.id;

            
        }

        /**
        * 渲染 HTML 到容器中以生成 DOM 节点。
        * @returns 
        */
        render(list) {
            let meta = mapper.get(this);

            //先清空之前可能存在的。
            this.clear();

            meta.list = list.map((item) => {
                Row.insert(meta, item);
                return item;
            });


            //已渲染过。
            if (meta.$) {
                let html = meta.tpl.fill('row', meta.rows);
                meta.$tbody.html(html);
                return;
            }
            
            //首次渲染。
            let html = meta.tpl.fill({});
            $(meta.container).html(html);
            meta.$ = this.$ = $(`#${meta.id}`);
            meta.$tbody = meta.$.find('>tbody');
            Events.bind(meta);
        }

        /**
        * 插入一行表格行。
        * @param {Object} item 要插入的数据行记录，为 list 中的项。
        * @param {number} [index] 可选，要插入的位置。
        *   如果不指定，则在末尾插入，此时变成了追加一行。
        */
        insert(item, index) {
            let meta = mapper.get(this);
            let { row, no, } = Row.insert(meta, item, index);
            let html = meta.tpl.fill('row', row, no);
            let max = meta.rows.length - 1;

            if (no == 0) {
                meta.$tbody.prepend(html);
            }
            else if (no == max) {
                meta.$tbody.append(html);
            }
            else {
                let row = meta.rows[no + 1];
                $(`#${row.id}`).before(html);
            }

            meta.emitter.fire('insert', [row, { no, }]);

        }

        /**
        * 移除一行。
        * @param {number|string|Object} item 要移除的表格行。
        *   当传入一个 number 时，则表示该表格行所在的索引。
        *   当传入一个 string 时，则表示该表格行的 id。
        *   当传一个 Object 时，则取其 `id` 字段进行匹配。
        */
        remove(item, fn) {
            let meta = mapper.get(this);
            let { row, no, msg, } = Row.get(meta, item);

            if (!row) {
                throw new Error(msg);
            }

            //外面提供了自定义删除方式。
            if (fn) {
                fn(row, no, done);
            }
            else {
                done();
            }

            meta.emitter.fire('remove', [row, { no, }]);


            function done() {
                //从 DOM 中删除。
                let tr = document.getElementById(row.id);
                tr.parentNode.removeChild(tr);

                //从数据上删除。
                meta.rows.splice(no, 1);
                delete meta.id$row[row.id];

                meta.columns.map(function (column, index) {
                    column.cells.splice(no, 1);
                });
            }
           

        }

        /**
        * 把指定的表格行向前或向后移动若干步。
        * @param {number|string|Object} item 要移动的表格行。
        *   当传入一个 number 时，则表示该表格行所在的索引。
        *   当传入一个 string 时，则表示该表格行的 id。
        *   当传一个 Object 时，则取其 `id` 字段进行匹配。
        * @param {number} step 要移动的步数。
        *   如果为 0，则不移动，直接返回。
        *   如果为正数，则向后移动。
        *   如果为负数，则向前移动。
        */
        move(item, step) {
            if (step == 0) {
                return;
            }

            let meta = mapper.get(this);
            let { row, no, msg, } = Row.get(meta, item);

            if (!row) {
                throw new Error(msg);
            }

            let max = meta.rows.length - 1; //允许的最大索引值。
            let index = no + step;          //目标索引值。

            index = Math.max(index, 0);   //如果为负数，则取为 0.
            index = Math.min(index, max); //如果超过最大值，则取为最大值。

            //移动后的位置一样。
            if (index == no) {
                return;
            }

            let targetRow = meta.rows[index];
            let tr = document.getElementById(row.id);

            //处理数据。
            meta.rows.splice(no, 1);            //删除原位置的。
            meta.rows.splice(index, 0, row);    //在目标位置插入。

            //处理 DOM。
            tr.parentNode.removeChild(tr);

            if (step > 0) {
                $(`#${targetRow.id}`).after(tr.outerHTML);
            }
            else {
                $(`#${targetRow.id}`).before(tr.outerHTML);
            }

            meta.emitter.fire('move', [row, { no, index, }]);
        }

        /**
        * 清空表格。
        * 会触发每行单元格和每行表格行的清空事件。
        * @returns
        */
        clear() {
            let meta = mapper.get(this);

            //无任何数据。
            if (meta.rows.length == 0) {
                return;
            }

            meta.rows.map(function (row) {
                row.cells.map(function (cell) {
                    meta.emitter.fire('clear', 'cell', cell.name, [cell]);
                    meta.emitter.fire('clear', 'cell', [cell]);
                });

                meta.emitter.fire('clear', 'row', [row]);
            });

            meta.columns.map(function (column) {
                column.cells.splice(0); //清空原数组。
            });

            meta.id$row = {};
            meta.id$cell = {};
            meta.rows.splice(0);     //清空原数组。
            
            if (meta.$) {
                meta.$tbody.html('');
            }

            meta.emitter.fire('clear');
        }

        /**
        * 绑定事件。
        */
        on(...args) {
            let meta = mapper.get(this);
            meta.emitter.on(...args);
        }




    }




    module.exports = exports = Table;
    exports.defaults = require('Table.defaults');

});