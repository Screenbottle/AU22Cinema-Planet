import { collection, doc, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useSelector } from "react-redux"

export const uploadCart = (cartItems) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const uid = currentUser.uid;

    const collectionRef = collection(db, "users", uid, "cart");

    cartItems.forEach(cartItem => {
        addDoc(collectionRef, cartItem);
    });

}

export const removeItem = async (movie_id) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const uid = currentUser.uid;

    const collectionRef = collection(db, "users", uid, "cart");

    const query = query(collectionRef, where("movie_id", "==", movie_id));

    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

export const emptyCart = async () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const uid = currentUser.uid;

    const collectionRef = collection(db, "users", uid, "cart");
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

export const getCart = async () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const uid = currentUser.uid;

    const collectionRef = collection(db, "users", uid, "cart");

    const cartItems = [];

    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      cartItems.push(doc.data());
    });

    return cartItems;
}