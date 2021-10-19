import firebase from "firebase/app";
import 'firebase/firestore';

export const getFirebaseExercises = () =>{
    const db = firebase.firestore();
    return db.collection('exercises')
    .orderBy('name')
    .get()
    .then(snapshot => {
        const items = [];
        snapshot.forEach((exerciseDocument) => {
            const {name, category, video} = exerciseDocument.data();
            const id = exerciseDocument.id;
            items.push({name, category, video, id});
        });
        return items;
    })
}

export const getExercise = (exerciseName) =>{
    const db = firebase.firestore();
    return db.collection('exercises')
    .where('name','==',exerciseName)
    .get()
    .then(snapshot => {
        const exercise = [];
        snapshot.forEach((exerciseDocument) =>{
            const {name, category, video} = exerciseDocument.data();
            const id = exerciseDocument.id;
            exercise.push({name, category, video, id})
        });
        return exercise;
    });
}

