import { useState, useEffect } from "react";
import Form from '../form/form.js';
import { listCategory, listCity, listCondition, listCurrency } from '../../constants/lists.js';
import {findFieldForName} from '../../utils/utils.js';
import {ReactComponent as IconSearch} from '../../assets/img/icons/search.svg'
import {ReactComponent as IconList} from '../../assets/img/icons/list.svg'
import {ReactComponent as IconPoint} from '../../assets/img/icons/point.svg'


export default function Filter(props){
    const [fields, setFields] = useState([ 
        {
            placeholder: <div className="filter_placeholder_inner"><IconSearch /> <span>Название товара</span></div>,
            name: 'name',
            type: 'text',
            required: true,
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
            onBlur: (obj) => {
                let arr = [...fields];
                let priceMin = findFieldForName(arr,'priceMin');
                let priceMax = findFieldForName(arr,'priceMax');
                if(isFinite(priceMin.value) && isFinite(priceMax.value)){
                    if(+priceMin.value > +priceMax.value) priceMin.value = priceMax.value;
                }
                setFields(arr)
            }
        },  
        {
            placeholder: 'до ... грн',
            name: 'priceMax',
            type: 'tel',
            className: 'filter_item filter_item-price filter_item-price-min',
            onBlur: (obj) => {
                let arr = [...fields];
                let priceMin = findFieldForName(arr,'priceMin');
                let priceMax = findFieldForName(arr,'priceMax');
                if(isFinite(priceMin.value) && isFinite(priceMax.value)){
                    if(+priceMin.value > +priceMax.value) priceMax.value = priceMin.value;
                }
                setFields(arr)
            }
        },  
        {
            addHTML: 'Только с фото',
            name: 'photoMust',
            type: 'checkbox',
            checked: false,
            className: 'filter_item filter_item-photo-must',
        },  
    ])

    function onSubmit(){
        console.log('submit')
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
                />
            </div>
        </section>
    )
}