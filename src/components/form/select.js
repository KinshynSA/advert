import {useState} from 'react';

export default function Select(props){
    const [isActive, setIsActive] = useState(false);
    const [tit, setTit] = useState(props.tit ?? <span>&nbsp;</span>);

    return (        
        <div className={`select_emulate${isActive ? ' active' : ''}`} tabIndex="1" onBlur={() => setIsActive(false)}>
            <div className="select_emulate_tit" onClick={() => setIsActive(!isActive)}>
                <span className="select_emulate_tit_text">{tit}</span>
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M0 0L5 5L10 0H0Z" fill="#121212"/>
                </svg>
            </div>
            <div className="select_emulate_list">
            {props.options.map(option => {
                return (
                    <div className="select_emulate_list_item" key={option.id} onClick={(e) => {
                        setIsActive(false);
                        props.onChange({name: props.name, type: props.type, option: option})
                        setTit(option.name);
                    }}>{option.name}</div>
                )
            })}
            </div>
        </div>
    )
}