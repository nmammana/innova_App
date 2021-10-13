import firebase from "firebase";

export const getFirebaseRoutines = async () =>{
    const db = firebase.firestore();
    return db.collection('routines')
    .orderBy('user.name')
    .get()
    .then(snapshot => {
        const items = [];
        snapshot.forEach((routineDocument) => {
            const {title, user, comments, days} = routineDocument.data();
            const id = routineDocument.id;
            items.push({title, user, comments, days, id});
        });
        return items;
    })
}

const getFirebaseRoutineById = async (routineId) =>{
    const db = firebase.firestore();
    return db.collection('routines')
    .doc(routineId)
    .get()
    .then(snapshot => {
        const routineFetched = snapshot.data();
        return routineFetched
    });
}



