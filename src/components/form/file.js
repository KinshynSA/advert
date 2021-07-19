import {useState, useRef, Fragment} from 'react';
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
        <div className="form_file">
            <label className="form_file_inner">
                {img ? (
                    <img src={img} alt="" />
                ) : load ? (
                    <Loading />
                ) : (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15 15V9H17V15H23V17H17V23H15V17H9V15H15Z" fill="#C4C4C4"/>
                    </svg>
                )}
                <input ref={input} type='file' onChange={(e) => {
                    if(!input.current.files[0]) return;
                    let file = input.current.files[0]
                    if(props.extensions){
                        let ext = file.name.split('.').pop().toLowerCase();
                        if(!props.extensions.includes(ext)) return;  
                    }
                    if(file.size > 5242880) return;
                    setImg(null);
                    setLoad(true);
                    let name = `${file.name}?${+new Date()}`;
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
            {img && (
                <div className="form_file_close" onClick={() => {
                    props.onChange({
                        link: '',
                        order: props.order,
                    })
                }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#DD0000"></path>
                    </svg>
                </div>
            )}
        </div>
    )
}