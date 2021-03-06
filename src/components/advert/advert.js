import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import {useDocument} from 'react-firebase-hooks/firestore';
import Loading from '../loading/loading.js';
import Comments from '../comments/comments.js';
import Images from './images.js';
import { formatDate } from '../../utils/formatters.js';
import { listCity, listCurrency } from '../../constants/lists.js';
import { ButtonChatStart } from '../chat/buttonchatstart.js';


export default function Advert(props){
    const user = useSelector((store) => store.user);
    const location = useParams();

    const firestore = firebase.firestore();
    const [data, loading, error] = useDocument(
        firestore.doc(`adverts/${location.id}`)
    )

    const [info, setInfo] = useState()
    const [switchPhone, setSwitchPhone] = useState(false)
    useEffect(() => {
        if(data){
            let info = data.data()
            info.photos = info?.photos?.split(',')
            info.date = formatDate(info.date);            
            info.city = listCity.find((item) => item.value === info.city).name;
            info.currency = listCurrency.find((item) => item.value === info.currency).name;
            setInfo(info)
        } 
    }, [data])

    return (
        <section className="main-block notice_block">
            <div className="center-main-block">
                {loading ? (
                    <Loading />
                ) : null}
                {error ? (
                    <div>Error: {error}</div>
                ) : null}
                {info ? (
                    <div className="notice_content">
                        <div className="notice_left">
                            <h2 className="notice_title">{info.title}</h2>
                            {info.photos && (
                                <Images photos={info.photos} />
                            )}
                            <div className="notice_info">
                                <div className="notice_info_item notice_info_item-date">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11 19H17V13H11V19ZM13 15H15V17H13V15ZM19 5H18V3H16V5H8V3H6V5H5C3.895 5 3.01 5.896 3.01 7L3 21C3 22.105 3.895 23 5 23H19C20.104 23 21 22.105 21 21V7C21 5.896 20.104 5 19 5ZM5 10H19V21H5V10Z" fill="#7F7F7F"/>
                                    </svg>
                                    <span className="notice_info_item_text">{info.date?.date}</span>
                                </div>
                                <div className="notice_info_item notice_info_item-place">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.1 2 5 5.1 5 9C5 14.2 12 22 12 22C12 22 19 14.3 19 9C19 5.1 15.9 2 12 2ZM12 11.5C10.6 11.5 9.5 10.4 9.5 9C9.5 7.6 10.6 6.5 12 6.5C13.4 6.5 14.5 7.6 14.5 9C14.5 10.4 13.4 11.5 12 11.5Z" fill="#7F7F7F"/>
                                    </svg>
                                    <span className="notice_info_item_text">{info.city} {info.street ?? ''}</span>
                                </div>
                            </div>
                            <div className="notice_description">
                                <p>{info.description}</p>
                            </div>
                            <Comments className="notice_comments" advert={location.id} />
                            <div className="notice_helpfull">
                                <div className="notice_helpfull_title">???????????????? ????????????????????</div>
                                <div className="notice_helpfull_content">
                                    <ul>
                                        <li>???????????????????? ?????????????? ???? ?????????? ?????? ?? ?????????????? ???????????????????? ?????????????????? ????????????</li>
                                        <li>???? ?????????????? ?????? ???????????? ?????????????????? ?????????????????? ????????????</li>
                                        <li>???? ?????????????????? ???? ?????????????????? ?????????? ????????????</li>
                                        <li>???????? ???????? ???? ???????????????????????? ??????????????, ????????????????, ???? ???????? ????????????????, ???? ?????????????????????????? ?????????? ???? "???????????? ??????????????????????" ?????? "???????????????????????? ??????????????????"</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="notice_right">
                            {info.authorId === user.id && (
                                <div className="notice_panel">
                                    <Link to={`/advert-edit/${location.id}`} className="notice_panel_button button button-red">??????????????????????????</Link>
                                </div>
                            )}
                            {info.price === 0 && (
                                <div className="notice_price">
                                    <span className="notice_price_number">??????????????????</span>
                                </div>
                            )}
                            {info.price === 1 && (
                                <div className="notice_price">
                                    <span className="notice_price_number">??????????</span>
                                </div>
                            )}
                            {info.price === 2 && (
                                <div className="notice_price">
                                    <span className="notice_price_number">{info.priceNumber}</span>
                                    <span className="notice_price_currency"> ??????</span>
                                    {info.bargain ? <div className="notice_price_bargain">???????? ????????????????</div> : null}
                                </div>
                            )}
                            <div className="notice_contact">
                                <div className="notice_contact_name">{info.contactPerson}</div>
                                <div className="notice_contact_phone">
                                    <span className="notice_contact_phone_number">                                        
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M4 3C3.447 3 3 3.447 3 4C3 13.388 10.612 21 20 21C20.553 21 21 20.553 21 20V16.5C21 15.948 20.553 15.501 20 15.501C18.752 15.501 17.552 15.3 16.428 14.932C16.328 14.9 16.223 14.884 16.119 14.884C15.864 14.884 15.608 14.982 15.413 15.177L13.212 17.38C10.38 15.94 8.065 13.625 6.623 10.794L8.823 8.587C9.098 8.313 9.179 7.918 9.068 7.572C8.7 6.447 8.499 5.247 8.499 4C8.499 3.447 8.052 3 7.5 3H4Z" fill="#121212"/>
                                        </svg>
                                        <span>+{switchPhone ? <a href={`tel:${info.phone}`}>{info.phone}</a> : '380XXXXXXXX'}</span>
                                    </span>
                                    <span className="notice_contact_phone_switcher" onClick={() => setSwitchPhone(!switchPhone)}>???????????????? ??????????</span>
                                </div>
                            </div>
                            <div className="notice_buttons">
                                {/*info.authorId !== user?.id && (
                                    <ButtonChatStart
                                        idTo={info.authorId}
                                        idFrom={user.id}
                                    />
                                )*/}
                            </div>
                        </div>
                    </div>   
                ) : null}
            </div>
        </section>
    )
}