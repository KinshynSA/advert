import {useState, useEffect} from 'react';
import { findFieldForValue } from '../../utils/utils';

export default function Select(props){
    const [search, setSearch] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isChoosed, setIsChoosed] = useState(!!props.tit && +props.tit !== 0);
    const [tit, setTit] = useState(props.tit ?? <span>&nbsp;</span>);
    const [options, setOptions] = useState(props.options)
    
    useEffect(() => {
        setValue()
    }, [])

    useEffect(() => {
        if(props.value === undefined || props.value === null || props.value === ''){
            setTit(props.tit ?? <span>&nbsp;</span>)
            setIsChoosed(false)
        }
        
        setValue()
    }, [props.value])

    useEffect(() => {
        if(props.selectActive){
            setIsActive(true);
            setIsChoosed(true);
        } 
    }, [props.selectActive])

    function setValue(){
        if(props.value !== undefined && props.value !== null && props.value !== ''){
            let field = findFieldForValue(options, props.value)
            setTit(field.name);
            setIsChoosed(true);
        } 
    }

    function handlerSearch(e){
        setSearch(e.target.value);
        let arr = [...props.options];
        if(e.target.value !== ''){
            arr = props.options.filter((item) => {
                return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
            });
        }
        setOptions(arr);
    }

    return (        
        <div
            className={`select_emulate${isActive ? ' active' : ''}${isChoosed ? ' choosed' : ''}`}
            tabIndex="1"
            onBlur={(e) => {
                if(!e.currentTarget.contains(e.relatedTarget)){
                    setIsActive(false);
                    setSearch('');
                    setOptions([...props.options]);
                } 
            }}
        >
            <div className="select_emulate_tit" onClick={() => setIsActive(!isActive)}>
                <span className="select_emulate_tit_text">{tit}</span>
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M0 0L5 5L10 0H0Z" fill="#121212"/>
                </svg>
            </div>
            <div className="select_emulate_list">
            {props.search && (
                <div className="select_emulate_list_item select_emulate_list_item-search">
                    <input type="text" value={search} onChange={handlerSearch} />
                </div>
            )}
            {options.map(option => {
                return (
                    <div className="select_emulate_list_item" key={option.value} onClick={(e) => {
                        setIsActive(false);
                        props.onChange({name: props.name, type: props.type, option: option})
                        setTit(option.name);
                        setIsChoosed(true);
                    }}>
                        <span className="select_emulate_list_item_name">{option.name}</span>
                        {!!option.subname && <span className="select_emulate_list_item_subname">{option.subname}</span>}
                    </div>
                )
            })}
            </div>
        </div>
    )
}