export function findFieldForName(fields,name){
    let result;
    fields.forEach(item => {
        if(item.hide) return;
        if(item.type === 'block'){
            let childs = item.childs ?? [];
            let intermediateResult = findFieldForName(childs,name)
            if(intermediateResult) result = intermediateResult;
        } else {
            if(item.name === name) result = item;
        }        
    })
    return result;
}

export function findFieldsForName(fields,name){
    let result = [];
    fields.forEach(item => {
        if(item.hide) return;
        if(item.type === 'block'){
            let childs = item.childs ?? [];
            let intermediateResult = [];
            findFieldsForName(childs,name)
            if(intermediateResult.length) result = intermediateResult;
        } else {
            if(item.name === name) result.push(item);
        }        
    })
    return result;
}