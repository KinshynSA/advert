import {useState} from 'react';

export default function CommentImage(props){
    const [state, setState] = useState(false)

    return (
        <div className="comments_item_images_item">
           <img className={`${state ? 'active' : ''}`} src={props.link} onClick={() => setState(!state)} alt="" />                                            
        </div>
    )
}