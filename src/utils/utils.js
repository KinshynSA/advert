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
    fields.forEach((item,i) => {
        if(item.hide) return;
        if(item.type === 'block'){
            let childs = item.childs ?? [];
            let intermediateResult = findFieldsForName(childs,name)
            if(intermediateResult) result = intermediateResult;
        } else {
            if(item.name === name){
                result.push(item);
            } 
        }        
    })
    return result;
}

export function collectValues(fields, preData){
    let data = {...preData};
    fields.forEach(field => addValue(field))
    return data;

    function addValue(field){
        if(field.hide) return;
        if(field.type === 'block'){
            if(field.childs) field.childs.forEach(item => addValue(item))
        } else {
            if(field.name !== undefined && field.value !== undefined){
                if(field.type === 'file'){
                    data[field.name] = field.value.join(',');
                } else if(field.type === 'radio'){
                    if(field.checked) data[field.name] = field.value;
                } else if(field.type === 'checkbox'){
                    if(field.checked) data[field.name] = field.value;
                } else {
                    data[field.name] = field.value;
                }                
            }        
        }   
    }
}