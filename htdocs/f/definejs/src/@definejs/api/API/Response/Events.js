/**
* src: @definejs/api/modules/API/Response/Events.js
* pkg: @definejs/api@2.0.1
*/
define('API/Response/Events', function (require, module, exports) { 
    
    
    module.exports = {
        get({ res, isTimeout, successCode, }) {
    
            let list = [
                { names: ['response'], },
                { names: ['timeout'], condition: !!isTimeout, }, //这里要用 `!!` 进行转换，否则可能为 undefined。
                { names: ['status', res.status], },
                { names: ['status'], },
    
                //网络不通或服务器错误。
                //或者指定了 field 但解析 json 错误。
                { names: ['error'], condition: res.hasError, },
            ];
    
            //两个条件必须组合才安全可靠。
            if (!res.hasError && res.parsedJSON) {
                let json = res.parsedJSON;
                let { code, data, msg, } = json;
    
                list = [
                    ...list,
                    { names: ['code', code], },
                    { names: ['code'], },
                ];
    
                if (code == successCode) {
                    list.push({ names: ['success'], args: [data, json, res], });
                }
                else {
                    list.push({ names: ['fail'], args: [code, msg, json, res], });
                }
    
            }
    
            //触发总事件。
            list.push({ names: ['done'], });
    
            //归一化。
            list.forEach((item) => {
                item.args = item.args || [res]; //默认参数。
    
                if (item.condition === undefined) { //没指定，则要触发。
                    item.condition = true;
                }
            });
    
            return list;
        },
    };
});