import {useState} from 'react';

import Form from '../form/form.js';

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
                tit: 'Категория',
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
                label: 'Город',
                name: 'city',
                type: 'text',
                required: true,
            }, 
            {
                type: 'block',
                className: 'add_part',
                childs: [                    
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
                        required: true,
                    }
                ]
            },
            {
                name: 'agree',
                type: 'checkbox',
                checked: false,
                addHTML: 'Я соглашаюсь с сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке.',
                required: true,
                className: 'form_item-flex',
            }, 
        ]
    );

    function onSubmit(){
        console.log('submit')
    }

    return (
        <section className="add_block">
            <div className="center-main-block">
                <div className="add_content">
                    <h2 className="add_title">Разместить обявление</h2>
                    <Form                        
                        className="add_form"
                        fields={fields}
                        setFields={setFields}
                        onSubmit={onSubmit}
                        submitText={'Опубликовать объявление'}
                    />
                </div>
            </div>
        </section>
    )
}