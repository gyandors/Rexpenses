import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

/**
 * Create a new user in the database
 * @param {User} user
 * @returns {Promise<void>}
 */
export async function createUser(user) {
  const userRef = doc(db, "users", user.uid);
  const userData = await getDoc(userRef);
  if (userData.exists()) {
    return;
  }

  await setDoc(doc(db, "users", user.uid), {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    uid: user.uid,
    createdAt: user.metadata.creationTime,
  });
}

/**
 * Update a user in the database
 * @param {User} user
 * @returns {Promise<void>}
 */
export async function updateUser(user) {
  await updateDoc(doc(db, "users", user.uid), {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
  });
}

export async function deleteUser(user) {
  await deleteDoc(doc(db, "users", user.uid));
}
