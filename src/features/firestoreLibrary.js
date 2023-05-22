import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useSelector } from "react-redux";

export const addToLibrary = async (purchasedItems) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const uid = currentUser.uid;

    const collectionRef = collection(db, "users", uid, "library");

    purchasedItems.forEach((item) => {
      addDoc(collectionRef, item);
    });
  }
};

export const getLibrary = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const uid = currentUser.uid;

    const collectionRef = collection(db, "users", uid, "library");

    const libraryItems = [];
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      libraryItems.push(doc.data());
    });

    return libraryItems;
  }
};
