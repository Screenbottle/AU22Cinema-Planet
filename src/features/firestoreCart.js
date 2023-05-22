import {
  collection,
  doc,
  addDoc,
  getDocs,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

export const uploadItem = (movie) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const uid = currentUser.uid;
    const collectionRef = collection(db, "users", uid, "cart");

    addDoc(collectionRef, movie);
  }
};

export const removeItem = async (movie) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    console.log("attempting delete")
    const uid = currentUser.uid;
    const movie_id = movie.id;

    const collectionRef = collection(db, "users", uid, "cart");

    const querySnapshot = await getDocs(query(collectionRef, where("movie_id", "==", movie_id)));
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }
};

export const emptyCart = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const uid = currentUser.uid;

    const collectionRef = collection(db, "users", uid, "cart");
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }
};

export const getCart = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
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
};
