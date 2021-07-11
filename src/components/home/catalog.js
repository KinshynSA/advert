import { Fragment, useState, useEffect } from 'react';
import firebase from 'firebase';
import Loading from '../loading/loading.js';
import Filter from './filter.js';
import Item from './item.js';
import Pagination from '../pagination/pagination.js';

export default function Catalog(props){
    const [filters, setFilters] = useState({});
    const [adverts, setAdverts] = useState([]);
    const [advertsOnPage, setAdvertsOnPage] = useState(5);
    const [pagesLength, setPagesLength] = useState(1);
    const [page, setPage] = useState(1);
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
                if(key === 'priceMin'){
                    //t = t.where('priceNumber','>=',filters[key])
                } else if(key === 'priceMax'){
                    //t = t.where('priceNumber','<=',filters[key])
                } else if(key === 'photoMust'){
                    //t = t.where('photos','>','')
                } else {
                    t = t.where(key,'==',filters[key])
                }
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

                if(arr.length % advertsOnPage){
                    setPagesLength(Math.floor(arr.length / advertsOnPage) + 1)
                } else {
                    setPagesLength(Math.floor(arr.length / advertsOnPage))
                }

                setPage(1)
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
                setFilters={setFilters}
            />
            <section className="main-block main-block-max catalog_block">
                <div className="center-main-block">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Fragment>
                            <div className="catalog_box">
                                {adverts && adverts.map((doc, n) => {
                                    if(n + 1 <= advertsOnPage * (page - 1)) return null;
                                    if(n >= advertsOnPage * page) return null;
                                    return <Item key={doc.id} id={doc.id} {...doc} />    
                                })}
                            </div>
                            <Pagination
                                activePage={page}
                                setActivePage={setPage}
                                pagesLength={pagesLength}
                            />
                        </Fragment>
                    )}
                </div>
            </section>
        </Fragment>
    )
}