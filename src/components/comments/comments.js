import React, {useState, useEffect} from 'react';
import firebase from "firebase/app";
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '../loading/loading.js';
import Comment from './comment.js';
import NewComment from './newcomment.js';


export default function Comments(props){
    const firestore = firebase.firestore();
    const [comments, setComments] = useState();

    const [collection, loading, errorCollection] = useCollection(
        firestore.collection("commentsAdverts").where("advert", "==", "aZHmj0ODIJuDtUFunh23")
    );

    useEffect(() => {
        if(!collection) return;
        let c = [];

        collection.docs.map(doc => {
            let o = {
                id: doc.id,
                childs: [],
                ...doc.data()
            }
            c.push(o);
        })

        c.sort((a,b) => {
            if(a.date > b.date) return 1;
            return -1;
        })

        for(let i = 0; i < c.length; i++){            
            if(c[i].replyTo){
                c.forEach(item => moveToParent(c[i],item))

                c.splice(i,1);
                i--;
            } 
        }

        function moveToParent(child,item){
            if(item.id === child.replyTo){
                item.childs.push(child)
            } else {
                item.childs.forEach(m => moveToParent(child,m))
            }
        }

        setComments(c);
    }, [collection])

    return (
        <div className={`comments_container ${props.className ?? null}`}>
            {loading ? (
                <Loading />
            ) : comments ? (
                    <div className="comments_box">
                        {comments.map(c => {
                            return (
                                <div key={c.id} className="comments_item_wrapper">
                                    <Comment advert={props.advert} {...c} />
                                </div>
                            )
                        })}
                        {loading && <Loading />}
                    </div>
                ) : null
            }
            <NewComment advert={props.advert} />
        </div>
    )
}