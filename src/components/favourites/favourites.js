import { Fragment, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import firebase from 'firebase';
import Catalog from "../catalog/catalog";

export default function Favourites(props){
    const user = useSelector(state => state.user)
    const firestore = firebase.firestore();
    const [idList, setIdList] = useState([])
    const [adverts, setAdverts] = useState([])
    const [loading, setLoading] = useState()

    useEffect(() => {
        getIdList();
    }, [])

    useEffect(() => {
        getAdverts();
    }, [idList])

    function getIdList(){
        setLoading(true)
        firestore.collection("usersInfo").where("userId", "==", user.id).get()
            .then(res => {
                let data = res.docs[0].data();
                data.id = res.docs[0].id;
                setIdList([...data?.favs.split(',')])
            })
            .catch(error => {
                console.log(error)
            })
    }

    function getAdverts(){
        if(!idList.length) setLoading(false)
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
            <h2 className="title">Избранное</h2>
            <Catalog
                loading={loading}
                adverts={adverts}
                getFavouritesAdvertsId={getIdList}
            />
        </Fragment>
    )
}