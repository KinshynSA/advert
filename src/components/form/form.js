import React from 'react';
import {useState, useEffect} from 'react';

import Field from './field';


export default function Form(props){
  const [formBlocked, setFormBlocked] = useState(true);
  const [sumaryError, setSumaryError] = useState(undefined);

  function onChange(obj){
    let {event,name,type,option,value} = obj;
    console.log(obj);
    let arr = [...props.fields];
    let radioArr = [];

    arr.forEach(field => {
      if(type === 'radio'){
        findFieldsForName(field,name)
      } else {
        changeField(field)
      }
    })

    if(type === 'radio'){
      radioArr.forEach(field => {
        field.checked = false;
        if(field.value === value){
          field.checked = true;
        }
      })
    }

    if(type === 'tel'){
      if(!Number.isInteger(+event.nativeEvent.data)) return;
      if(event.nativeEvent.data === ' ') return;
    }

    if(props.handleValues) setSumaryError(props.handleValues(arr))
    props.setFields(arr);

    function changeField(field){
      if(field.name === name){
        if(type === 'checkbox'){
          field.checked = !field.checked;
        } else if(type === 'select'){
          field.value = option.id;
        } else {
          field.value = event.target.value;
        }

        if(field.required) validateField(field);
      } 

      if(field.type === 'block'){
        let childs = field.childs ?? [];
        childs.forEach(item => changeField(item))
      }
    }

    function findFieldsForName(field,name){
      if(field.hide) return;

      if(field.name === name){
        radioArr.push(field);
      }

      if(field.type === 'block'){
        let childs = field.childs ?? [];
        childs.forEach(item => findFieldsForName(item,name))
      }
    }
  }

  useEffect(() => {
    validateForm();
  },[props.fields])

  function validateField(field){
    let value = field.value;
    field.error = false;

    switch (field.type){
      case 'select':
        if(value === undefined) field.error = true;
        break;
      case 'tel':
        if(field.mask === 'phone'){
          if(value.length !== 10 && value.length !== 12) field.error = true;
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
          <button className="form_button" disabled={formBlocked} onClick={(e) => {
            e.preventDefault();
            props.onSubmit();
          }}>{props.submitText}</button>
        </div>
        {sumaryError ?
          (<div className="form_item form_item-sumarryError">
            {sumaryError}
          </div>)
          : null
        }
      </div>
    </form>
  )
}