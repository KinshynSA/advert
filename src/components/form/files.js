import {useState} from 'react';
import File from './file.js'

export default function Files(props){
    function onChange(obj){
        if(obj.order === undefined){
            obj.order = props.value.length;
        }
        let value = [...props.value]
        if(obj.link === ''){
            value.splice(obj.order, 1)
        } else {
            value[obj.order] = obj.link
        }

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
                    <File extensions={props.extensions} key={item} link={item} order={i} onChange={onChange} />
                )
            })}
            {props.few && ((props.maxlength && props.value.length < props.maxlength) || !props.maxlength) && (
                <File extensions={props.extensions} onChange={onChange} />
            )}
        </div>
    )
}