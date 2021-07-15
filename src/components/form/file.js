import {useState, useRef} from 'react';
import firebase from "firebase/app";
import "firebase/storage";
import Loading from "../loading/loading.js";

export default function File(props){
    const input = useRef(null);
    let storage = firebase.storage();    
    let storageRef = storage.ref();
    const [img, setImg] = useState(props.link);
    const [load, setLoad] = useState();

    return (  
        <label className="form_file">
            <div className="form_file_inner">
                {img ? (
                    <img src={img} alt="" />
                ) : load ? (
                    <Loading />
                ) : (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15 15V9H17V15H23V17H17V23H15V17H9V15H15Z" fill="#C4C4C4"/>
                    </svg>
                )}
            </div>
            <input ref={input} type='file' onChange={(e) => {
                if(!input.current.files[0]) return;
                setImg(null);
                setLoad(true);
                let name = `${input.current.files[0].name}?${+new Date()}`;
                const ref = storageRef.child(name);

                ref.put(input.current.files[0]).then((snapshot) => {
                    storageRef.child(name).getDownloadURL()
                        .then((link => {
                            setLoad(false);
                            if(props.order !== undefined){
                                setImg(link);
                            }
                            
                            props.onChange({
                                link,
                                order: props.order,
                            })
                        }))
                });
            }} />
        </label>
    )
}