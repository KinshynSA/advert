import { useState, useEffect } from "react"

export default function Popup(props){
    const [active, setActive] = useState(false)

    function close(){
        setActive(false);
        props.close?.()
    }

    useEffect(() => {
        setActive(true)
        return function(){
            props.close?.()
        }
    }, [])

    return(
        <div className={`popup_container ${props.className ?? ''}${active ? ' active' : null}`}>
            <div className="popup_background" onClick={close}></div>
            <div className="popup">
                <div className="popup_close" onClick={close}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#121212"/>
                    </svg>
                </div>
                {props.children}
            </div>
        </div>
    )
}