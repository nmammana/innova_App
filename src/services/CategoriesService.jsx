import firebase from "firebase/app";
import 'firebase/firestore';

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