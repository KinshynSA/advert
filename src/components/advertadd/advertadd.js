import {useEffect, useState} from 'react';
import {useParams, Redirect} from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import Form from '../form/form.js';
import { listCategory, listCity, listCondition, listCurrency } from '../../constants/lists.js';
import { collectValues, findFieldForName } from '../../utils/utils.js';
import Loading from '../loading/loading.js';
import Alert from '../alert/alert.js';



export default function AdvertAdd(props){
    const user = useSelector((store) => store.user);
    const location = useParams();
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
                                value: '1',
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
                className: 'add_part add_part-files',
                childs: [
                    {
                        label: 'Фотографии',
                        type: 'file',
                        extensions: ['png','jpg','webp','svg'],
                        name: 'photos',
                        value: [],
                        few: true,
                        maxlength: 5,
                        addHTML: 'Размер изображения не должен превышать 5 Мб. Допустимые форматы изображения: .png, .jpg, .svg, .webp'
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
                        value: user?.name,
                    }, 
                    {
                        label: 'Контактный телефон',
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
    const firestore = firebase.firestore();

    useEffect(() => {
        getData();
    }, [])

    function getData(){
        if(!props.edit) return;
        let advert = firestore.collection("adverts").doc(location.id);
        advert.get()
        .then((doc) => {
            let data = doc.data()
            if(user.id === data.authorId){           
                let arr = [...fields];

                for(let key in data){
                    let field = findFieldForName(arr,key);
                    if(field){
                        if(key === 'photos'){
                            field.value = data[key].split(',')
                        } else {
                            field.value = data[key]
                        }                        
                    }
                }

                setFields(arr);    
            } else {
                Alert.error('У вас нет доступа к этой странице')
                return <Redirect to='/' />
            }        
        })
        .catch((error) => {
            Alert.error(error)
        });
    }

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
            authorId: user.id,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        });

        if(props.edit){
            firestore.collection('adverts').doc(location.id).set(advert)
                .then((res) => {
                    Alert.success('Объявление обновлено')
                    setLoading(false)
                })
                .catch((error) => { 
                    Alert.error('Объявление не обновлено')      
                    setLoading(false)
                })
        } else {
            firestore.collection('adverts').add(advert)
                .then((res) => {
                    Alert.success('Объявление создано')
                    setLoading(false)
                })
                .catch((error) => { 
                    Alert.error('Объявление не создано')      
                    setLoading(false)
                })
        }
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