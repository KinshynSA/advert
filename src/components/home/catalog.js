import { Fragment, useState, useEffect } from 'react';
import firebase from 'firebase';
import Loading from '../loading/loading.js';
import Filter from './filter.js';
import Item from './item.js';

export default function Catalog(props){
    const [filters, setFilters] = useState({});
    const [adverts, setAdverts] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        getAdverts()
    }, [])

    useEffect(() => {
        console.log('filters',filters)
        getAdverts()
    }, [filters])

    function formattedFilterParam(name){
        if(filters[name] !== undefined && filters[name] !== null){
            return [name,'==',filters[name]]
        }
        return ['title','>=',""]     
    }
    
    function getAdverts(){
        setLoading(true);

        let db = firebase.firestore()
        let t = db.collection('adverts')
        //.where(...formattedFilterParam('city'))
        //.where(...formattedFilterParam('category'))
        //.where(...formattedFilterParam('currency'))
        //.where(...formattedFilterParam('priceMin','>'))
        //.where(...formattedFilterParam('priceMax','<'))
        //.where(...formattedFilterParam('photo'))
        //.where('city','==','1')
        //.where('category','==',"Kids")
        for(let key in filters){
            console.log(key,filters[key]);
            t = t.where(...formattedFilterParam(key))
        }
        t
            .get()
            .then(res => {
                let arr = [];
                res.docs.forEach(doc => {
                    let d = doc.data();
                    d.id = doc.id;
                    arr.push(d)
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
            <Filter
                setFilters={setFilters}
            />
            <section className="main-block main-block-max catalog_block">
                <div className="center-main-block">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="catalog_box">
                            {adverts && adverts.map(doc => {
                                return <Item key={doc.id} id={doc.id} {...doc} />    
                            })}
                        </div>
                    )}
                </div>
            </section>
        </Fragment>
    )
}