import { collection, doc, addDoc, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export const uploadComment = (movie_id, comment) => {

    const collectionRef = collection(db, "user_comments", movie_id, "comments");
    

    return addDoc(collectionRef, comment);
}

export const readComments = async (movie_id) => {

    const commentList = [];

    const collectionRef = collection(db, "user_comments", movie_id, "comments");

    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      commentList.push(doc.data());
    });
    
    return commentList
}