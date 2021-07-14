import { Fragment, useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import firebase from 'firebase';
import Catalog from '../catalog/catalog.js'


export default function Profile(props){
    const user = useSelector((store) => store.user);
    const [adverts, setAdverts] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        getAdverts()
    }, [])
    
    function getAdverts(){
        setLoading(true);
        console.log('user',user)

        let db = firebase.firestore()
        let t = db.collection('adverts').where('authorId','==',user.id)
        t.get()
            .then(res => {
                let arr = [];
                res.docs.forEach(doc => {
                    let d = doc.data();
                    d.id = doc.id;
                    arr.push(d)
                })

                arr.sort((a,b) => {
                    if(+a.date > +b.date) return -1;
                    return 1;
                })

                setAdverts(arr)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            });
    }

    return (
        <Fragment>
            <Catalog
                loading={loading}
                adverts={adverts}
            />
        </Fragment>
    )
}