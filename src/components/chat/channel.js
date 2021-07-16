import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from "firebase/app";
import {useDocument} from 'react-firebase-hooks/firestore';
import Form from '../form/form.js';
import Message from './message.js';
import { collectValues } from '../../utils/utils.js';

export default function Channel(props){
    const user = useSelector(state => state.user);
    const chat = useSelector(state => state.chat);
    const firestore = firebase.firestore();
    const [fields, setFields] = useState([
        {
            name: 'text',
            required: true,
        }
    ]);
    let channel = `${chat.channel.idTo > user.id ? chat.channel.idTo : user.id}${chat.channel.idTo > user.id ? user.id : chat.channel.idTo}`;

    useEffect(() => {
        checkChannelExist(chat.channel.idTo)
        checkChannelExist(user.id)
    }, [])

    const [messages, loading, error] = useDocument(
        firestore.collection(`messages`).where('channel','==',channel)
    )

    function checkChannelExist(id){
        console.log('id',id,user,chat.channel)
        firestore.collection('usersInfo').where('userId','==',id).get()
            .then(res => {
                let idDoc = res.docs[0].id;
                let data = res.docs[0].data()
                if(data.channels){
                    let channels = data.channels.split(',');
                    if(!channels.includes(channel)){
                        channels.push(channel)
                        data.channels = channels.join(',')
                        updateChannelsList(idDoc,data)
                    }
                } else {
                    data.channels = channel;
                    updateChannelsList(idDoc,data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    function updateChannelsList(idDoc,data){
        firestore.collection('usersInfo').doc(idDoc).set(data)
    }

    function onSubmit(){
        const message = collectValues(fields, {
            channel,
            idFrom: user.id,
            idTo: chat.channel.idTo,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            read: false,
        });

        firestore.collection(`messages`).add(message)  
            .then(res => {
                console.log('messages',res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="chat_channel">
            <div className="chat_channel_head">Head</div>
            <div className="chat_channel_body">
                {messages && messages.docs.map(m => {
                    return <Message {...m.data()} key={`chat_message-${m.id}`} />
                })}
            </div>
            <Form
                className="add_form"
                fields={fields}
                setFields={setFields}
                onSubmit={onSubmit}
                submitText={'Отправить'}
            />
        </div>
    )
}