import React, { useState, Fragment } from 'react';
import Popup from '../popup/popup.js';
import Image from './image.js';
import NewComment from './newcomment.js';
import { formatDate } from '../../utils/formatters.js';

export default function Comment(props){
    const [reply, setReply] = useState();    
    let date = formatDate(props.date)

    return (
        <React.Fragment>
            <div className="comments_item" key={props.id}>
                <div className="comments_item_head">
                    <div className="comments_item_name">{props.name}</div>
                    <div className="comments_item_reply" onClick={() => setReply(true)}>Ответить</div>
                </div>
                <div className="comments_item_body">
                    <div className="comments_item_message">{props.message}</div>
                    {!!props.file.length && (
                        <div className="comments_item_images">
                            {props.file.map(link => {
                                return <Image link={link} key={link} />
                            })}
                        </div>
                    )}
                </div>
                <div className="comments_item_bottom">
                    <div className="comments_item_date">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 10V12H7V10H9ZM13 10V12H11V10H13ZM17 10V12H15V10H17ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C3.89 21 3 20.1 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H6V1H8V3H16V1H18V3H19ZM19 19V8H5V19H19ZM9 14V16H7V14H9ZM13 14V16H11V14H13ZM17 14V16H15V14H17Z" fill="#7F7F7F"/>
                        </svg>
                        <span>{date.date}</span>
                    </div>
                    <div className="comments_item_date">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM16.24 7.76C15.07 6.58 13.53 6 12 6V12L7.76 16.24C10.1 18.58 13.9 18.58 16.24 16.24C18.59 13.9 18.59 10.1 16.24 7.76Z" fill="#7F7F7F"/>
                        </svg>
                        <span>{date.time}</span>
                    </div>
                </div>
            </div>
            {!!props.childs.length && props.childs.map(item => {
                return <Comment key={item.id} advert={props.advert} {...item} />
            })}
            {reply && (
                <Popup close={() => setReply(false)}>
                    <NewComment advert={props.advert} afterSending={() => setReply(false)} replyTo={props.id} />
                </Popup>
            )}
        </React.Fragment>
    )

}