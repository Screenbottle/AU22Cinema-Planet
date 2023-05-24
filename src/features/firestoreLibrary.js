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
      const newItem = { ...item, purchase_date: new Date().toISOString() };
      addDoc(collectionRef, newItem);
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
      const item = {
        ...doc.data(),
        id: doc.id,
      };
      libraryItems.push(item);
    });

    return libraryItems;
  }
};
