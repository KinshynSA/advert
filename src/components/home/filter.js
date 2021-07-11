import { useState, useEffect } from "react";
import Form from '../form/form.js';
import Loading from '../loading/loading.js';
import { listCategory, listCity, listCondition, listCurrency } from '../../constants/lists.js';
import {findFieldForName, collectValues} from '../../utils/utils.js';
import {ReactComponent as IconSearch} from '../../assets/img/icons/search.svg'
import {ReactComponent as IconList} from '../../assets/img/icons/list.svg'
import {ReactComponent as IconPoint} from '../../assets/img/icons/point.svg'


export default function Filter(props){
    const [checkingMinMax, setCheckingMinMax] = useState();
    const fieldsPreset = [ 
        {
            placeholder: <div className="filter_placeholder_inner"><IconSearch /> <span>Название товара</span></div>,
            name: 'name',
            type: 'text',
            className: 'filter_item filter_item-name',
        },      
        {
            placeholder: <div className="filter_placeholder_inner"><IconList /> <span>Категория</span></div>,
            name: 'category',
            type: 'select',
            options: listCategory,
            className: 'filter_item filter_item-category',
        },       
        {
            placeholder: <div className="filter_placeholder_inner"><IconPoint /> <span>Город</span></div>,
            name: 'city',
            type: 'select',
            search: true,
            options: listCity,
            className: 'filter_item filter_item-city',
        },  
        {
            placeholder: 'от ... грн',
            name: 'priceMin',
            type: 'tel',
            className: 'filter_item filter_item-price filter_item-price-min',
            onBlur: () => setCheckingMinMax({direction: false}),
        },  
        {
            placeholder: 'до ... грн',
            name: 'priceMax',
            type: 'tel',
            className: 'filter_item filter_item-price filter_item-price-max',
            onBlur: () => setCheckingMinMax({direction: true})
        },
        {
            type: 'block',
            className: 'filter_item filter_item-currency',
            childs: [                
                {
                    value: 0,
                    name: 'currency',
                    type: 'radio',
                    checked: false,
                    addHTML: 'ГРН',
                    className: 'filter_item-currency_item',
                },                
                {
                    value: 1,
                    name: 'currency',
                    type: 'radio',
                    checked: false,
                    addHTML: 'USD',
                    className: 'filter_item-currency_item',
                }, 
            ]
        },  
        {
            addHTML: 'Только с фото',
            name: 'photoMust',
            type: 'checkbox',
            value: true,
            checked: false,
            className: 'filter_item filter_item-photo-must',
        }
    ]
    const [fields, setFields] = useState(fieldsPreset)

    useEffect(() => {
        let arr = [...fields];
        let priceMin = findFieldForName(arr,'priceMin');
        let priceMax = findFieldForName(arr,'priceMax');
        if(isFinite(priceMin.value) && isFinite(priceMax.value)){
            if(+priceMin.value > +priceMax.value){
                if(checkingMinMax.direction){
                    priceMax.value = priceMin.value;
                } else {
                    priceMin.value = priceMax.value;
                }
            }
        }
        setFields(arr)
    }, [checkingMinMax])

    function onSubmit(){
        let data = collectValues(fields)
        props.setFilters(data);
    }

    function onClear(){
        setFields([...fieldsPreset])
    }

    return (        
        <section className="main-block main-block-gradient filter_block">
            <div className="center-main-block">
                <Form  
                    className="filter_form"
                    fields={fields}
                    setFields={setFields}
                    onSubmit={onSubmit}
                    submitText={'Найти'}
                    onClear={onClear}
                    clearText={'Очистить фильтр'}
                />
                {props.loading && <Loading />}
            </div>
        </section>
    )
}