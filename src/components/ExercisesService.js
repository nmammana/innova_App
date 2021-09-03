import firebase from "firebase";

export const getFirebaseCategories = () =>{    
    const db = firebase.firestore();
    return db.collection('categories')
    .orderBy('name')
    .get()
    .then(snapshot => {
        const items = [];
        snapshot.forEach((doc) =>{
            items.push({
                name: doc.data().name,
                id: doc.id
            });
        });
        return items;
    });
} 

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

export const getCategoryByName = (categoryName) => {
    const db = firebase.firestore();
    return db.collection('categories')
    .where('name','==',categoryName)
    .get()
    .then(snapshot => {
        const categoryFetched = [];
        snapshot.forEach(categoryDocument => {
            categoryFetched.push({
                name: categoryDocument.data().name,
                id: categoryDocument.id
            })
        })
        return categoryFetched;
    })
}