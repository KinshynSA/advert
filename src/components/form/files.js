import {useState} from 'react';
import File from './file.js'

export default function Files(props){
    function onChange(obj){
        console.log('file',obj)
        if(obj.order === undefined){
            obj.order = props.value.length;
        }
        let value = [...props.value]
        value[obj.order] = obj.link

        props.onChange({
            value: value,
            name: props.name,
            type: props.type,
        })
    }

    return (          
        <div className="form_file_wrapper">
            {props.value.map((item,i) => {
                return(
                    <File key={item} link={item} order={i} onChange={onChange} />
                )
            })}
            {props.few && ((props.maxlength && props.value.length < props.maxlength) || !props.maxlength) && (
                <File onChange={onChange} />
            )}
        </div>
    )
}