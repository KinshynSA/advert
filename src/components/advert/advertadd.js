import {useState} from 'react';

import Form from '../form/form.js';

import firebase from "firebase/app";
import "firebase/firestore";
import {useCollectionData} from 'react-firebase-hooks/firestore';


export default function AdvertAdd(props){
    const [fields, setFields] = useState(
        [
            {
                label: 'Заголовок',
                name: 'title',
                type: 'text',
                required: true,
            },
            {
                name: 'category',
                type: 'select',
                label: 'Категория',
                required: true,
                options: [
                    {
                        id: 0,
                        name: "Недвижимость",
                    },
                    {
                        id: 1,
                        name: "Услуги и бизнес",
                    },
                    {
                        id: 2,
                        name: "Детские товары",
                    },
                    {
                        id: 3,
                        name: "Работа",
                    },
                    {
                        id: 4,
                        name: "Авто/Мото товары",
                    },
                    {
                        id: 5,
                        name: "Красота/здоровье",
                    },
                    {
                        id: 6,
                        name: "Мода и стиль",
                    },
                    {
                        id: 7,
                        name: "Электроника",
                    },
                    {
                        id: 8,
                        name: "Транспорт",
                    },
                    {
                        id: 9,
                        name: "Животные",
                    },
                    {
                        id: 10,
                        name: "Дом и сад",
                    },
                    {
                        id: 11,
                        name: "Хобби, спорт",
                    },
                    {
                        id: 12,
                        name: "Отдых и путешествия",
                    },
                    {
                        id: 13,
                        name: "Акции и скидки",
                    },
                    {
                        id: 14,
                        name: "Знакомства",
                    },
                ]
            },
            {
                type: 'block',
                className: 'add_price',
                childs: [
                    {                        
                        type: 'block',
                        tag: 'p',
                        className: 'add_part_title add_part_title-min',
                        content: 'Цена',  
                    },
                    {                        
                        type: 'block',
                        className: 'add_price_left',
                        childs: [
                            {
                                value: 0,
                                name: 'price',
                                type: 'radio',
                                checked: true,
                                addHTML: 'Бесплатно',
                                className: 'form_item-flex',
                            },  
                            {
                                value: 1,
                                name: 'price',
                                type: 'radio',
                                checked: false,
                                addHTML: 'Обмен',
                                className: 'form_item-flex',
                            },  
                            {
                                value: 2,
                                name: 'price',
                                type: 'radio',
                                checked: false,
                                addHTML: 'Цена',
                                className: 'form_item-flex',
                            },  
                        ]
                    },
                    {                        
                        type: 'block',
                        className: 'add_price_right',
                        hide: true,
                        presset: 2,
                        childs: [
                            {
                                name: 'priceNumber',
                                type: 'tel',
                                required: true,
                            },  
                            {
                                value: 0,
                                tit: 'грн',
                                name: 'currency',
                                type: 'select',
                                required: true,
                                options: [
                                    {
                                        id: 0,
                                        name: "грн",
                                        default: true,
                                    },
                                    {
                                        id: 1,
                                        name: "usd",
                                    },
                                ]
                            }, 
                            {
                                name: 'bargain',
                                type: 'checkbox',
                                checked: false,
                                addHTML: 'торг возможен',
                                className: 'form_item-flex add_price_right_check',
                            },  
                        ]
                    },
                ]
            },
            {
                label: 'Состояние',
                name: 'condition',
                type: 'select',
                required: true,
                options: [
                    {
                        id: 0,
                        name: 'Новое'
                    },
                    {
                        id: 1,
                        name: 'Б/у'
                    }
                ]
            },
            {
                label: 'Описание',
                name: 'description',
                type: 'textarea',
                required: true,
            }, 
            {
                label: 'Ссылки на видео',
                name: 'videoLinks',
                type: 'text',
            }, 
            {
                type: 'block',
                className: 'add_part',
                childs: [
                    {                        
                        type: 'block',
                        tag: 'p',
                        className: 'add_part_title',
                        content: 'Местоположение'
                    },   
                    {
                        label: 'Город',
                        name: 'city',
                        type: 'text',
                        required: true,
                    },  
                    {
                        label: 'Улица',
                        name: 'street',
                        type: 'text',
                    }, 
                ]
            },
            {
                type: 'block',
                className: 'add_part',
                childs: [
                    {                        
                        type: 'block',
                        tag: 'p',
                        className: 'add_part_title',
                        content: 'Ваши контактные даные'
                    },                
                    {
                        label: 'Контактное лицо',
                        name: 'contactPerson',
                        type: 'text',
                        required: true,
                    }, 
                    {
                        label: 'Email адрес',
                        name: 'email',
                        type: 'email',
                        required: true,
                    }, 
                    {
                        label: 'Телефон',
                        name: 'phone',
                        type: 'tel',
                        mask: 'phone',
                        required: true,
                    }
                ]
            },
            {
                type: 'block',
                className: 'add_part',
                childs: [
                    {    
                        name: 'agree',
                        type: 'checkbox',
                        checked: false,
                        addHTML: 'Я соглашаюсь с сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке.',
                        required: true,
                        className: 'form_item-flex',
                    },
                ]
            }, 
        ]
    );

    function handleValues(fields){
        /*arr.forEach(field => {
            if(type === 'radio'){
              findFieldsForName(field,name)
            } else {
              changeField(field)
            }
        })

        function findFieldsForName(field,name){
            if(field.hide) return;
      
            if(field.name === name){
              radioArr.push(field);
            }
      
            if(field.type === 'block'){
              let childs = field.childs ?? [];
              childs.forEach(item => findFieldsForName(item,name))
            }
        }*/

        /*let password, password_confirm, sumaryError;

        fields.forEach(field => {
            if(field.name === 'password') password = field;
            if(field.name === 'password_confirm') password_confirm = field;
        })

        if(password.value && password.value.length>=8 && password_confirm.value && password_confirm.value.length>=8){
            if(password.value !== password_confirm.value){
                password.error = true;
                password_confirm.error = true;
                sumaryError = 'Пароли должны совпадать'
            } else {
                password.error = false;
                password_confirm.error = false;
            }
        }

        return sumaryError;*/
    }

    function addAdvertValue(field,advert){
        if(field.type === 'block'){
            if(field.childs) field.childs.forEach(item => addAdvertValue(item,advert))
        } else {
            if(field.name !== undefined && field.value !== undefined && !field.hide){
                advert[field.name] = field.value;
            }        
        }    
    }

    function onSubmit(){
        const advert = {};
        fields.forEach(field => addAdvertValue(field,advert))
        console.log('advert',advert)
        firestore.collection('adverts').add(advert)
    }

    const firestore = firebase.firestore();
    const [message, loading] = useCollectionData(
        firestore.collection('adverts')
    )
    console.log(message)
    console.log(loading)

    return (
        <section className="add_block">
            <div className="center-main-block">
                <div className="add_content">
                    <h2 className="add_title">Разместить обявление</h2>
                    <Form                        
                        className="add_form"
                        fields={fields}
                        //handleValues={handleValues}
                        setFields={setFields}
                        onSubmit={onSubmit}
                        submitText={'Опубликовать объявление'}
                    />
                </div>
            </div>
        </section>
    )
}