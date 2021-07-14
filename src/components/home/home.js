import { Fragment, useState, useEffect } from 'react';
import firebase from 'firebase';
import Filter from './filter.js';
import Catalog from '../catalog/catalog.js';

export default function Home(props){
    const [filters, setFilters] = useState({});
    const [adverts, setAdverts] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        getAdverts()
    }, [])

    useEffect(() => {
        getAdverts()
    }, [filters])
    
    function getAdverts(){
        setLoading(true);

        //Некоторые фильтры, как и пагинацию пришлось писать на фронте, по причине проблем с firestore
        let db = firebase.firestore()
        let t = db.collection('adverts')
        //.orderBy('date', 'desc')
        for(let key in filters){
            if(filters[key] !== undefined && filters[key] !== null && filters[key] !== ''){
                if(key === 'priceMin' || key === 'priceMax' || key === 'name' || key === 'photoMust') continue;
                /*if(key === 'priceMin'){
                    //t = t.where('priceNumber','>=',filters[key])
                } else if(key === 'priceMax'){
                    //t = t.where('priceNumber','<=',filters[key])
                } else if(key === 'photoMust'){
                    //t = t.where('photos','>','')
                }*/
                t = t.where(key,'==',filters[key])
            }           
        }
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

                if(isFinite(filters.priceMin)){                    
                    arr = arr.filter(doc => {
                        if(+doc.priceNumber >= +filters.priceMin) return true;
                        return false;
                    })
                }

                if(isFinite(filters.priceMax)){                    
                    arr = arr.filter(doc => {
                        if(+doc.priceNumber <= +filters.priceMax) return true;
                        return false;
                    })
                }

                if(filters.photoMust){                    
                    arr = arr.filter(doc => {
                        if(doc.photos?.length) return true;
                        return false;
                    })
                }

                if(filters.name?.length){                    
                    arr = arr.filter(doc => {
                        let flag = true;
                        let words = filters.name.toUpperCase().split(' ');
                        words.forEach(w => {
                            let wordFlag = false;
                            if(doc.title.toUpperCase().indexOf(w) !== -1) wordFlag = true;
                            if(doc.description.toUpperCase().indexOf(w) !== -1) wordFlag = true;
                            if(!wordFlag) flag = false;
                        })
                        return flag;
                    })
                }

                setAdverts(arr)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            });
    }

    return (
        <Fragment>
            <Filter
                loading={loading}
                filters={filters}
                setFilters={setFilters}
            />
            <Catalog
                loading={loading}
                adverts={adverts}
            />
        </Fragment>
    )
}