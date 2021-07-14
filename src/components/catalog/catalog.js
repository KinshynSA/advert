import { Fragment, useState, useEffect } from 'react';
import Loading from '../loading/loading.js';
import Item from './item.js';
import Pagination from '../pagination/pagination.js';

export default function Catalog(props){
    const [advertsOnPage, setAdvertsOnPage] = useState(5);
    const [pagesLength, setPagesLength] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        changePagination()
    }, [])

    useEffect(() => {
        changePagination()
    }, [props.adverts])

    function changePagination(){
        if(props.adverts){
            if(props.adverts.length % advertsOnPage){
                setPagesLength(Math.floor(props.adverts.length / advertsOnPage) + 1)
            } else {
                setPagesLength(Math.floor(props.adverts.length / advertsOnPage))
            }
        } else {
            setPagesLength(1)
        }
        setPage(1)
    }

    return (
        <section className="main-block main-block-max catalog_block">
            <div className="center-main-block">
                {props.loading ? (
                    <Loading />
                ) : !!props.adverts.length ? (
                    <Fragment>
                        <div className="catalog_box">
                            {props.adverts && props.adverts.map((doc, n) => {
                                if(n + 1 <= advertsOnPage * (page - 1)) return null;
                                if(n >= advertsOnPage * page) return null;
                                return <Item key={doc.id} id={doc.id} {...doc} getFavouritesAdvertsId={props?.getFavouritesAdvertsId} />    
                            })}
                        </div>
                        <Pagination
                            activePage={page}
                            setActivePage={setPage}
                            pagesLength={pagesLength}
                        />
                    </Fragment>
                ) : (
                    <h4 className="title">Нет подходящих объявлений</h4>
                )}
            </div>
        </section>
    )
}