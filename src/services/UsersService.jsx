import firebase from "firebase/app";
import 'firebase/firestore';

export const getFirebaseUsers = () =>{
    const db = firebase.firestore();
    return db.collection('users')
    .orderBy('name')
    .get()
    .then(snapshot => {
        const items = [];
        snapshot.forEach((userDocument) => {
            const {name, email, identityNumber, birth, comments} = userDocument.data();
            const id = userDocument.id;
            items.push({name, email, identityNumber, birth, comments, id});
        });
        return items;
    })
}