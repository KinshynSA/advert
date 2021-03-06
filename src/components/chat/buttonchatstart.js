import { useDispatch } from "react-redux";
import { openChat, openChannel } from '../../store/chatSlice.js';


export function ButtonChatStart(props){
    const dispatch = useDispatch()

    return (        
        <div
            className="notice_buttons_item button"
            onClick={() => {                
                dispatch(openChannel({idTo: props.idTo}))
                dispatch(openChat())         
            }}
            >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.54" d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V4L10 9L18 4V14ZM10 7L2 2H18L10 7Z" fill="black"/>
            </svg>
            <span>Отправить сообщение</span>
        </div>
    )
}