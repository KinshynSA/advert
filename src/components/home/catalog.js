import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '../loading/loading.js';
import Item from './item.js';

export default function Catalog(props){
    const [adverts, loading, error] = useCollection(
        firebase.firestore().collection('adverts'),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return (
        <section className="main-block catalog_block">
            <div className="center-main-block">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="catalog_box">
                        {adverts && adverts.docs.map(doc => {
                            return <Item key={doc.id} id={doc.id} {...doc.data()} />    
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}