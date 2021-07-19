import {useState, useEffect, useRef} from "react";
import Slider from "react-slick";
import Popup from '../popup/popup.js';

function PrevArrow(props){
    if(props.hidden) return null;
    return(
        <div className="slider_arrow slider_arrow-left" onClick={props.onClick}>
            <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.6665 2.33333L10.3332 0L0.333171 10L10.3332 20L12.6665 17.6667L4.99984 10L12.6665 2.33333Z" fill="#3597AA"/>
            </svg>
        </div>
    )
}

function NextArrow(props){
    if(props.hidden) return null;
    return(
        <div className="slider_arrow slider_arrow-right" onClick={props.onClick}>
            <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.333496 2.33333L2.66683 0L12.6668 10L2.66683 20L0.333496 17.6667L8.00016 10L0.333496 2.33333Z" fill="#3597AA"/>
            </svg>
        </div>
    )
}

export default function Images(props){
    const [load, setLoad] = useState(false);
    const [popup, setPopup] = useState(null);

    const slider1 = useRef(null);
    const slider2 = useRef(null);

    const settings1 = {
        className: 'slider slider-main',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };
    const settings2 = {
        infinite: true,
        speed: 500,
        slidesToShow: props.photos.length < 4 ? props.photos.length : 4,
        slidesToScroll: 1, 
        focusOnSelect: true,
        prevArrow: <PrevArrow hidden={true} />,
        nextArrow: <NextArrow hidden={true} />
    };

    useEffect(() => {
        setLoad(true)
    }, []);

    return(
        <div className="notice_images">
            <Slider ref={slider1} asNavFor={slider2.current} {...settings1}>                                    
                {props.photos.map((item,i) => {
                    return (
                        <div key={item} className="notice_images_item notice_images_item-main" onClick={() => setPopup(i)}>
                            <div className="notice_images_item_wrapper">
                                <div className="notice_images_item_inner">
                                    <img src={item} alt={i} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
            {props.photos.length > 1 ? (
                <Slider ref={slider2} asNavFor={slider1.current} {...settings2}>                                    
                    {props.photos.map((item,i) => {
                        return (
                            <div key={item} className="notice_images_item">
                                <div className="notice_images_item_wrapper">
                                    <div className="notice_images_item_inner">
                                        <img src={item} alt={i} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            ) : null}
            {popup !== null && (
                <Popup
                    className="popup_slider"
                    close={() => setPopup(null)}
                >
                    <Slider
                        className="slider slider-popup"
                        initialSlide={popup}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        adaptiveHeight={true}
                        prevArrow={<PrevArrow />}
                        nextArrow={<NextArrow />}
                    >                                    
                        {props.photos.map((item,i) => {
                            return (
                                <div key={item} className="popup_slider_item">
                                    <img src={item} alt={i} />
                                </div>
                            )
                        })}
                    </Slider>
                </Popup>
            )}
        </div>
    )
}