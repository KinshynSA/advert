import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { openChat, openChannel } from '../../store/chatSlice.js';
import firebase from "firebase/app";
import {useCollection} from 'react-firebase-hooks/firestore';
import Message from "./message.js";


export default function ChannelShowCase(props){
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const firestore = firebase.firestore();
    const [lastMessage, loading, error] = useCollection(
        firestore.collection(`messages`)
        .where('channel','>=',props.idChannel)
        .where('channel','<=',props.idChannel)
        .orderBy('channel')
        .limitToLast(1)
    )
    const [info, setInfo] = useState()

    useEffect(() => {
        if(!lastMessage) return;
        let m = lastMessage.docs[0].data()
        setInfo({
            ...m,
            collocutor: user.id === m.idFrom ? m.idTo : m.idFrom,
        })
    }, [lastMessage])

    if(!info) return null;
    
    return (
        <div
            className="chat_channelshowcase"
            onClick={() => {        
                dispatch(openChannel({idTo: info.collocutor}))    
                dispatch(openChat())         
            }}
        >
            {info.text}
            {!info.read ?? 'Непрочитанное'}
        </div>
    )
}