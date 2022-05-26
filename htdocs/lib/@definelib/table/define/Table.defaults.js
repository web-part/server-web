
define('Table.defaults', {
    //组件的 id，会生成到 DOM 元素中。
    //一般情况下不需要指定，组件内部会自动生成一个随机的。
    //如果自行指定，请保证在整个 DOM 树中是唯一的。
    id: '',    
    
    container: '',
    template: '#tpl-Table', //
    class: 'Table',         //css 类名。
    style: {},
    dataset: {},
    header: true,           //是否生成表头。 如果指定为 false，则不生成 `<thead></thead>` 表头元素。
    fields: [],             //列的字段数组。

    //是否公开 meta 对象。
    //如果指定为 true，则外部可以通过 this.meta 来访问。
    //在某些场合需要用到 meta 对象，但要注意不要乱动里面的成员。
    meta: false,            

});

