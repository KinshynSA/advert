import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import firebase from "firebase/app";
import {useDocument} from 'react-firebase-hooks/firestore';
import Channel from './channel.js';
import ChannelShowCase from './channelshowcase.js';


export default function Chat(props){
    const user = useSelector(state => state.user);
    const chat = useSelector(state => state.chat)
    const firestore = firebase.firestore();
    const [channels, setChannels] = useState([])

    const [data, loading, error] = useDocument(
        firestore.collection(`usersInfo`).where('userId','==',user.id)
    )

    useEffect(() => {
        if(!data?.docs.length) return;
        let channels = data.docs[0].data().channels;
        if(channels){
            setChannels(channels.split(','))
        }
    }, [data])

    return (
        <div className="chat_container" style={{paddingTop: props.headerHeight}}>
            <div className="chat_box">
                {chat.channel ? (
                    <Channel />
                ) : (
                    <Fragment>
                        {channels.map(c => {
                            return <ChannelShowCase idChannel={c} key={`chat_channel-${c}`} />
                        })}
                    </Fragment>
                )}
            </div>
        </div>
    )
}