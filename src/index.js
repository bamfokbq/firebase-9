
import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc, 
    doc,
    query, 
    where
} from  'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDwk6rGgriR8ekDLaWFSUdc0P59-frKNj4",
    authDomain: "fir-9-1e95e.firebaseapp.com",
    projectId: "fir-9-1e95e",
    storageBucket: "fir-9-1e95e.appspot.com",
    messagingSenderId: "808468158555",
    appId: "1:808468158555:web:2d38652f2201135e94477e"
};

// Init firebase app
initializeApp(firebaseConfig)

// Init services
const db = getFirestore();

// Collection reference
const colRef = collection(db, "books");

// queries
const q = query(colRef, where("author", "==", "richard mensah"))

// realtime collection data
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = [] 
//         snapshot.docs.forEach((doc) => {
//             books.push({...doc.data(), id: doc.id})
//         })

//         console.log(books);
//     })
//     .catch((err => {
//     console.log(err);
//     }))

onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })

    console.log(books);
})


// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value
    }).then(() => {
       addBookForm.reset()
   })

})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, "books", deleteBookForm.id.value)
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset()
    })
})