import {useRef, useState} from 'react';
import Select from './select.js'

export default function Field(props){
  const input = useRef();
  const [type, setType] = useState(props.type);
  let isPassword = props.type === 'password';

  return (
    <div className={`form_item ${props.className ?? ''}${props.error ? ' form_item-invalid' : ''}`} onClick={(e) => {
      if(type === 'checkbox'){
        props.onChange({name: props.name, type: props.type})
      }
    }}>
      {props.label ? (
          <span className={`form_input_label${props.required ? ' form_input_label-required' : ''}`}>{props.label}</span>
        ) : null
      }
      <div className="form_input_wrapper">
        {type === 'select' ? (
            <Select {...props} />
          ) :
          type === 'textarea' ? (
            <textarea ref={input} className={`form_input${props.value ? ' form_input-fill' : ''}${props.error ? ' invalid' : ''}${props.required ? ' form_input-required' : ''}`} value={props.value} onChange={e => props.onChange({event: e, name: props.name})} />
          ) : type === 'checkbox' ? (
            <label className="form_item_checkbox">
              <input ref={input} type='checkbox' checked={props.checked} className={`form_input-checkbox ${props.checked ? 'form_input-fill' : ''}${props.error ? ' invalid' : ''}${props.required ? ' form_input-required' : ''}`} onChange={e => props.onChange({name: props.name, type: props.type})} />
              <span className="form_item_checkbox_emulate"></span>
            </label>
          ) : (
            <input ref={input} type={`${type ? type : 'text'}`} className={`form_input${props.value ? ' form_input-fill' : ''}${props.error ? ' invalid' : ''}${props.required ? ' form_input-required' : ''}${isPassword ? ' form_input-pd' : ''}`} value={props.value} maxLength={`${props.maxlength ?? ''}`} onChange={e => props.onChange({event: e, name: props.name, type: props.type})} autoComplete="new-password" />
          )
        }
        {props.placeholder ? (
            <span className="form_input_placeholder" onClick={() => input.current.focus()}>{props.placeholder}</span>
          ) : null
        }
        {isPassword ? (
          <div className="form_input_eye" onClick={() => {
            if(type === 'password'){
              setType('text')
            } else {
              setType('password')
            }
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.411 17.411L21 21M13.875 18.825C13.2569 18.9419 12.6291 19.0005 12 19C7.522 19 3.732 16.057 2.457 12C2.80027 10.9081 3.32899 9.88346 4.02 8.971L13.875 18.825ZM9.878 9.879C10.4407 9.31634 11.2038 9.00025 11.9995 9.00025C12.7952 9.00025 13.5583 9.31634 14.121 9.879C14.6837 10.4417 14.9998 11.2048 14.9998 12.0005C14.9998 12.7962 14.6837 13.5593 14.121 14.122L9.878 9.879ZM9.878 9.878L14.12 14.12L9.878 9.878ZM9.88 9.88L6.59 6.59L9.88 9.88ZM14.122 14.122L17.412 17.412L14.122 14.122ZM3 3L6.59 6.59L3 3ZM6.59 6.59C8.20236 5.54957 10.0811 4.9974 12 5C16.478 5 20.268 7.943 21.543 12C20.839 14.2305 19.3774 16.1446 17.411 17.411L6.59 6.59Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ) : null}
      </div>
      {/*props.error ? (
          <span className="form_input_error">{props.errorText ?? 'Проверьте введенное значение'}</span>
        ) : null
      */}
      {props.addHTML ? (
          <div className="form_item_content">{props.addHTML}</div>
        ) : null
      }
    </div>
  )
}