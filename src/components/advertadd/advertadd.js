import {useState} from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Form from '../form/form.js';
import { listCategory, listCity, listCondition, listCurrency } from '../../constants/lists.js';
import { collectValues } from '../../utils/utils.js';
import Loading from '../loading/loading.js';
import Alert from '../alert/alert.js';



export default function AdvertAdd(props){
    const firestore = firebase.firestore();
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
                options: listCategory,
            },
            {
                type: 'block',
                className: 'add_price',
                childs: [
                    {                        
                        type: 'block',
                        tag: 'p',
                        className: 'add_part_title h4',
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
                                checked: false,
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
                                checked: true,
                                addHTML: 'Цена',
                                className: 'form_item-flex',
                            },  
                        ]
                    },
                    {                        
                        type: 'block',
                        className: 'add_price_right',
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
                                options: listCurrency,
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
                options: listCondition,
            },
            {
                label: 'Описание',
                name: 'description',
                type: 'textarea',
                required: true,
            }, 
            /*{
                label: 'Ссылки на видео',
                name: 'videoLinks',
                type: 'text',
            },*/
            {
                type: 'block',
                className: 'add_part',
                childs: [
                    {
                        label: 'Фотографии',
                        type: 'file',
                        name: 'photos',
                        value: [],
                        few: true,
                        maxlength: 5,
                    }
                ],
            },
            {
                type: 'block',
                className: 'add_part',
                childs: [
                    {                        
                        type: 'block',
                        tag: 'p',
                        className: 'add_part_title h3',
                        content: 'Местоположение'
                    },   
                    {
                        label: 'Город',
                        name: 'city',
                        type: 'select',
                        search: true,
                        options: listCity,
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
                        className: 'add_part_title h3',
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
    const [loading, setLoading] = useState();

    function handleValues(fields){
        let activePresset = 2;
        fields.forEach(field => findActivePresset(field));
        fields.forEach(field => switchActivePresset(field));

        function findActivePresset(field){
            if(field.type === 'block'){
                let childs = field.childs ?? [];
                childs.forEach(item => findActivePresset(item))
            }

            if(field.name === 'price' && field.checked){
                activePresset = field.value
            }
        };

        function switchActivePresset(field){
            if(field.type === 'block'){
                let childs = field.childs ?? [];
                childs.forEach(item => switchActivePresset(item))
            }

            if(field.presset !== undefined){
                field.hide = !(field.presset === activePresset);
            }
        }

        return null;
    }

    function onSubmit(){
        const advert = collectValues(fields, {
            date: +new Date(),
        });
        console.log('advert',advert)
        firestore.collection('adverts').add(advert)
            .then((res) => {
                console.log('res',res)
                Alert.success('Объявление создано')
                setLoading(false)
            })
            .catch((error) => { 
                Alert.error('Объявление не создано')      
                setLoading(false)
            })
    }

    return (
        <section className="add_block">
            <div className="center-main-block">
                <div className="add_content">
                    <h2 className="add_title">Разместить обявление</h2>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Form                        
                            className="add_form"
                            fields={fields}
                            setFields={setFields}
                            handleValues={handleValues}
                            onSubmit={onSubmit}
                            submitText={'Опубликовать объявление'}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}