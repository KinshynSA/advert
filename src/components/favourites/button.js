import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from 'firebase';
import { Fragment } from "react";

export default function FavouritesButton(props){
    const user = useSelector(state => state.user)
    const firestore = firebase.firestore();
    const [isActive, setIsActive] = useState(false);
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        getInfo();
    }, [])

    function getInfo(callback){
        firestore.collection("usersInfo").where("userId", "==", user.id).get()
            .then(res => {                
                let data = res.docs[0].data();
                data.id = res.docs[0].id;
                if(!data.favs) data.favs = '';
                if(data?.favs.split(',').includes(props.advert)){
                    setIsActive(true);
                }
                setUserInfo(data);
                if(callback) setInfo(data);
            })
            .catch(error => {
                console.log(error)
            })
    };

    function setInfo(data){
        let info = {...data};
        let favs = new Set(info.favs.split(','));
        if(isActive){
            favs.delete(props.advert)
        } else {
            favs.add(props.advert)
        }
        favs.delete('')
        setIsActive(!isActive)
        info.favs = [...favs].join(',');

        firestore.collection('usersInfo').doc(userInfo.id).set(info)
            .then(() => {
                props?.getFavouritesAdvertsId?.()
            })
            .catch((error) => { 
                console.log(error)
            })
    }

    return (      
        <Fragment>  
            {userInfo && (
                <a
                    className={`favourite_button ${props.className ?? ''}${isActive ? ' active' : ''}`}
                    onClick={() => {
                        getInfo(true)
                    }}
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M22 6.66667C19.3333 6.66667 16.9333 8.4 16 10.6667C15.0667 8.4 12.6667 6.66667 10 6.66667C6.66667 6.66667 4 9.2 4 12.6667C4 17.3333 9.06667 21.0667 16 28C22.9333 21.0667 28 17.3333 28 12.6667C28 9.2 25.3333 6.66667 22 6.66667Z" stroke="#ED2E8C"/>
                    </svg>
                </a>
                
            )}
        </Fragment>
    )
}