import React from 'react';
import {useState, useEffect} from 'react';
import Loading from '../loading/loading.js';
import Field from './field';
import {findFieldForName, findFieldsForName} from '../../utils/utils.js';


function validateField(field){
  let value = field.value;
  field.error = false;

  switch (field.type){
    case 'select':
      if(value === undefined) field.error = true;
      break;
    case 'tel':
      if(field.mask === 'phone'){
        if(value.replace(/\D/g,"").length !== 12) field.error = true;
      } else {
        if(!value.length) field.error = true;
      }
      break;
    case 'email':
      const r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!r.test(String(value).toLowerCase())) field.error = true;
      break;
    case 'password':
      if(value.length < 8 || value.length > 20) field.error = true;
      break;
    case 'text':
      if(!value.length) field.error = true;
      break;
    case 'checkbox':
      if(!field.checked) field.error = true;
      break;
    case 'radio':
      if(!field.checked) field.error = true;
      break;
    default:
      if(!value.length) field.error = true;
      break;
  }
}

export default function Form(props){
  const [formBlocked, setFormBlocked] = useState(true);
  const [sumaryError, setSumaryError] = useState(undefined);

  useEffect(() => {
    validateForm();
  },[props.fields])

  function onChange(obj){
    let {event,name,type,option,value} = obj;
    let arr = [...props.fields];

    if(type === 'radio'){
      let radioArr = findFieldsForName(arr,name);
      radioArr.forEach(field => {
        field.checked = false;
        if(field.value === value){
          field.checked = true;
        }
      })
    } else {
      changeField(findFieldForName(arr,name))
    }

    if(type === 'tel'){
      if(!Number.isInteger(+event.nativeEvent.data)) return;
      if(event.nativeEvent.data === ' ') return;
    }

    if(props.handleValues) setSumaryError(props.handleValues(arr))
    props.setFields(arr);

    function changeField(field){
      if(type === 'checkbox'){
        field.checked = !field.checked;
      } else if(type === 'file'){
        field.value = value;
      } else if(type === 'select'){
        field.value = option.value;
      } else {
        field.value = event.target.value;
      }

      if(field.required) validateField(field);
    }
  }

  function validateForm(){
    let flag = false;

    props.fields.forEach((field) => {
      findError(field);
    })

    setFormBlocked(flag);

    function findError(field){
      if(field.hide) return;

      if(field.type === 'block'){
        let childs = field.childs ?? [];
        childs.forEach(item => findError(item))
      }

      if(field.required){
        if(field.error) flag = true;
        if(field.type === 'checkbox' || field.type === 'radio'){
          if(!field.checked) flag = true;
        } else {
          if(field.value === '' || field.value === undefined || field.value === null) flag = true;
        } 
      }
    }
  }

  function createItem(item,n){
    if(item.hide) return null;

    if(item.type === 'block'){
      let CustomTag = item.tag ?? 'div';
      let childs = item.childs ?? [];

      return (
        <CustomTag className={item.className} key={`form_part-${item.className ?? ''}-${n}`}>
          {item.content ?? null}
          {childs.map((field,i) => {
            return (
              createItem(field,i)
            )
          })}
        </CustomTag>
      )
    } else {
      let value = item.value;
      if(value === undefined) value = '';
  
      return (
        <Field
          {...item}
          key={item.name + '-' + n}
          onChange={onChange}
          value={value}
        />
      )  
    }  
  }

  return (    
    <form className={`form ${props.className ?? ''}`}>
      {props.title && <h2 className="form_title">{props.title}</h2>}
      <div className="form_box">
        {props.fields.map((field,n) => {
          return createItem(field,n)
        })}
        <div className="form_item form_item-button">
          <button className="form_button button button-red" disabled={formBlocked} onClick={(e) => {
            e.preventDefault();
            props.onSubmit();
          }}>{props.submitText ?? '??????????????????'}</button>
        </div>
        {props.onClear ? (          
          <div className="form_item form_item-button">
            <button className="form_button button button-white" onClick={(e) => {
              e.preventDefault();
              props.onClear();
            }}>{props.clearText ?? '????????????????'}</button>
          </div>
        ) : null}
        {sumaryError ?
          (<div className="form_item form_item-sumarryError">
            {sumaryError}
          </div>)
          : null
        }
      </div>
      {props.load && <Loading />}
    </form>
  )
}