import {useState} from 'react';
import firebase from "firebase/app";
import Form from '../form/form.js';
import Alert from '../alert/alert.js';

export default function NewComment(props){
    const firestore = firebase.firestore();
    const [fields, setFields] = useState([
        {
            placeholder: 'Ваше имя',
            name: 'name',
            type: 'text',
            required: true,
        }, 
        {
            placeholder: 'Ваш email',
            name: 'email',
            type: 'email',
            required: true,
        }, 
        {
            placeholder: 'Текст вашего сообщения',
            name: 'message',
            type: 'textarea',
            required: true,
            maxlength: 400,
        }, 
        {
            label: 'Прикрепить файл',
            type: 'file',
            name: 'file',
            value: [],
            few: true,
            maxlength: 1,
        }
    ])
    const [sending, setSending] = useState();


    function onSubmit(){
        const comment = {
            advert: props.advert,
            replyTo: props.replyTo ?? null,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        };
        fields.forEach(field => comment[field.name] = field.value)
        setSending(true)
        props.afterSending?.()
        console.log('comment',comment)
        firestore.collection('commentsAdverts').add(comment)
            .then((res) => {
                Alert.success('Комментарий добавлен')
                setSending(false)

                let arr = [...fields]
                arr.forEach(item => {
                    if(item.name === 'message') item.value = '';
                    if(item.name === 'file') item.value = [];
                })
                setFields(arr)
            })
            .catch((error) => { 
                Alert.error('Комментарий не добавлен')      
                setSending(false)
            })
    }

    return (        
        <Form
            className="comments_new"
            fields={fields}
            load={sending}
            setFields={setFields}
            onSubmit={onSubmit}
            submitText={'Отправить'}
        />
    )
}