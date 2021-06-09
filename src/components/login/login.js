import {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUser } from "../../store/userSlice.js";
import firebase from "firebase/app";
import "firebase/auth";
import Form from '../form/form.js';

export default function Login(props){
    const dispatch = useDispatch();

    const [fields, setFields] = useState(
        [
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
        ]
    )
    const [result, setResult] = useState();
    const [error, setError] = useState();

    let history = useHistory();

    function onSubmit(){
        let email, password;

        fields.forEach(field => {
            if(field.name === 'email') email = field.value;
            if(field.name === 'password') password = field.value;
        })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log('user',user);
                dispatch(changeUser(JSON.stringify(user)));
                setError(null)
            })
            .then(res => {
                history.push('/')            
            })
            .catch((error) => {
                console.log('error',error)
                setError(error.message ?? error)
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

    return (
        <section className="main-block main-block-gradient login_block">
            <div className="center-main-block">
                <div className="login_content">
                    <Form
                        className="login_form"
                        fields={fields}
                        setFields={setFields}
                        onSubmit={onSubmit}
                        submitText={'Вход'}
                    />
                    {result ?
                      (<div className="login_result">
                        {result}
                      </div>)
                      : null
                    }
                    {error ?
                      (<div className="login_error">
                        {error}
                      </div>)
                      : null
                    }
                </div>
            </div>
        </section>
    )
}