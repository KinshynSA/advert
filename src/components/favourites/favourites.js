import { Fragment, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import firebase from 'firebase';
import {useDocument} from 'react-firebase-hooks/firestore';
import Catalog from "../catalog/catalog";

export default function Favourites(props){
    const user = useSelector(state => state.user)
    const firestore = firebase.firestore();
    const [idList, setIdList] = useState([])
    const [adverts, setAdverts] = useState([])
    const [loading, setLoading] = useState()

    const [data, loadingList, error] = useDocument(
        firestore.collection("usersInfo").where("userId", "==", user.id)
    )

    useEffect(() => {
        if(!data){
            setIdList([])
            setAdverts([])
            return;
        }
        let list = data.docs[0].data().favs
        if(list){
            setIdList(list.split(','))
        } else {
            setIdList([])
        }
    }, [data])

    useEffect(() => {
        if(idList.length){
            getAdverts();
        } else {
            setAdverts([])
        }        
    }, [idList])

    function getAdverts(){
        let arr = []
        idList.forEach(id => {
            if(!id) return;
            firebase.firestore().collection(`adverts`).doc(`${id}`).get()
                .then(res => {
                    let advert = res.data();
                    advert.id = res.id;
                    arr.push(advert)
                    if(arr.length === idList.length){
                        setAdverts(arr)
                        setLoading(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    return (
        <Fragment>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <Catalog
                    title="Избранное"
                    loading={loading || loadingList}
                    adverts={adverts}
                />
            )}
        </Fragment>
    )
}