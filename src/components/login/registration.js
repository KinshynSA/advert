import {useState} from 'react';
import {useHistory} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Form from '../form/form.js';
import Alert from '../alert/alert.js';

export default function Login(props){
    const firestore = firebase.firestore();
    const [fields, setFields] = useState(
        [
            {
                name: 'name',
                type: 'text',
                placeholder: 'Имя',
                required: true,
            },
            {
                name: 'email',
                type: 'email',
                placeholder: 'Email',
                required: true,
            },
            {
                name: 'password',
                type: 'password',
                placeholder: 'Пароль',
                required: true,
                maxlength: 20,
            }, 
            {
                name: 'password_confirm',
                type: 'password',
                placeholder: 'Повторить пароль',
                required: true,
                maxlength: 20,
            }, 
            {
                name: 'agree',
                type: 'checkbox',
                checked: false,
                addHTML: '* Я соглашаюсь с правилами использования сервиса, а также с передачей и обработкой моих данных в Обявка. Я подтверждаю своё совершеннолетие и ответственность за размещение объявления',
                required: true,
                className: 'form_item-flex',
            }, 
        ]
    )
    
    let history = useHistory();

    function handleValues(fields){
        let password, password_confirm, sumaryError;

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

        return sumaryError;
    }

    function onSubmit(){
        let name, email, password;

        fields.forEach(field => {
            if(field.name === 'name') name = field.value;
            if(field.name === 'email') email = field.value;
            if(field.name === 'password') password = field.value;
        })

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            user.updateProfile({
                displayName: name
            })
            .then(() => {
                createUserInfo(user.uid)
            })
            .then(() => {
                clearValues()
                Alert.success('Пользователь создан');
            })
        })
        .then(() => {
            history.push('/login')            
        })
        .catch((error) => {
            console.log('error',error)
            Alert.error(error.message ?? error);
        });
    }

    function clearValues(){
        let arr = [...fields];
        arr.forEach(field => {
            if(field.value !== undefined) field.value = '';
            if(field.checked !== undefined) field.checked = false;
        })
        setFields(arr)
    }

    function createUserInfo(id){
        firestore.collection("usersInfo").where("userId", "==", id).get()
            .then(res => {
                if(!res.exists){
                    firestore.collection("usersInfo").add({
                        userId: id,
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <section className="main-block main-block-gradient login_block">
            <div className="center-main-block">
                <div className="login_content">
                    <Form
                        className="login_form"
                        fields={fields}
                        setFields={setFields}
                        handleValues={handleValues}
                        onSubmit={onSubmit}
                        submitText={'Зарегистрироваться'}
                    />
                </div>
            </div>
        </section>
    )
}