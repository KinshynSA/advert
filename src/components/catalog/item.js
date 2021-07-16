import { useParams, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { formatDate } from '../../utils/formatters.js';
import { listCategory, listCity, listCurrency } from '../../constants/lists.js'
import FavouritesButton from '../favourites/button.js';

export default function Item(props){
    const user = useSelector((store) => store.user);
    const location = useParams();

    let city = listCity.find((item) => item.value === props.city).name;
    let category = listCategory.find((item) => item.value === props.category).name;
    let currency;
    if(props.price === 2) currency = listCurrency.find((item) => item.value === props.currency).name;
    let photo = null;
    if(props.photos) photo = props.photos.split(',')[0];
    
    return (
        <div className="catalog_item">
            <div className="catalog_item_left">
                <figure className="catalog_item_image">
                    {photo ? (
                        <img src={photo} alt="" />
                    ) : (
                        <svg version="1.1" viewBox="0 0 512 512">
                            <g>
                                <g fill="#231F20">
                                <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z"/>
                                <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z"/>
                                </g>
                            </g>
                        </svg>
                    )}
                </figure>
            </div>
            <div className="catalog_item_right">
                <div className="catalog_item_head">
                    <div className="catalog_item_caption">
                        <Link className="catalog_item_caption_title h3" to={`/advert/${props.id}`}>{props.title}</Link>
                        <p className="catalog_item_caption_category">{category}</p>
                    </div>                    
                    <div className="catalog_item_price h3">
                        {props.price === 0 ? (
                            <span>Бесплатно</span>
                        ) : props.price === 1 ? (
                            <span>Обмен</span>
                        ) : props.price === 2 ? (
                            <span>{props.priceNumber} {currency}</span>
                        ) : null}
                    </div>
                </div>
                <div className="catalog_item_body">
                    <div className="catalog_item_description">{props.description}</div>
                </div>
                <div className="catalog_item_bottom">
                    <div className="catalog_item_tit">
                        <div className="catalog_item_tit_item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11 19H17V13H11V19ZM13 15H15V17H13V15ZM19 5H18V3H16V5H8V3H6V5H5C3.895 5 3.01 5.896 3.01 7L3 21C3 22.105 3.895 23 5 23H19C20.104 23 21 22.105 21 21V7C21 5.896 20.104 5 19 5ZM5 10H19V21H5V10Z" fill="#ED2E8C"/>
                            </svg>
                            <span>{formatDate(props.date)?.date}</span>
                        </div>
                        <div className="catalog_item_tit_item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.1 2 5 5.1 5 9C5 14.2 12 22 12 22C12 22 19 14.3 19 9C19 5.1 15.9 2 12 2ZM12 11.5C10.6 11.5 9.5 10.4 9.5 9C9.5 7.6 10.6 6.5 12 6.5C13.4 6.5 14.5 7.6 14.5 9C14.5 10.4 13.4 11.5 12 11.5Z" fill="#ED2E8C"/>
                            </svg>
                            <span>{city}</span>
                        </div>
                    </div>
                    <div className="catalog_item_buttons">
                        {user.user && (
                            <FavouritesButton advert={props.id} getFavouritesAdvertsId={props?.getFavouritesAdvertsId} />
                        )}
                        {props.authorId === user.id && (
                            <Link to={`/advert-edit/${props.id}`} className="catalog_item_button button">Редактировать</Link>
                        )}
                        <Link className="catalog_item_button button" to={`/advert/${props.id}`}><span>Подробнее</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}