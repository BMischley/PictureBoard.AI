import { db } from "@/firebase.config";
import {
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  collectionGroup,
  query,
  orderBy,
  getDocs,
  limit,
  QuerySnapshot,
  writeBatch,
  updateDoc,
  arrayUnion,
  where,
  arrayRemove,
} from "firebase/firestore";
import { User } from "@/types/firestore/users/user";
import { UserPrivate } from "@/types/firestore/users_private/userprivate";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import slugify from "slugify";


export async function updateName(
  uid: string,
  data: { firstName: string; lastName: string }
) {
  return await setDoc(doc(db, "users", uid), data, { merge: true });
}


export async function updatePrivateDoc(uid: string, data: UserPrivate) {
  return await setDoc(
    doc(db, "users_private", uid),
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getUserProfile(uid: string): Promise<User> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data() as User;
    return data;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");

    return {} as User;
  }
}
export async function getPrivateUserProfile(uid: string): Promise<UserPrivate> {
  const docRef = doc(db, "users_private", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data() as UserPrivate;
    return data;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");

    return {} as UserPrivate;
  }
}


interface Pictureboard {
  prompts: string[][];
  images: string[][];
  email?: string;
  phoneNumber?: string;
  uidAuth?: string;
  createdAt?: Date; // assuming createdAt is a date
  name: string;
}


export async function getUserPictureboard(pictureboard_id: string): Promise<Pictureboard> {
  const docRef = doc(db, "pictureboards", pictureboard_id);
  const docSnap = await getDoc(docRef);
  const storage = getStorage();

  if (docSnap.exists()) {
    const data = docSnap.data();
    const promptsMap: { [index: string]: string[] } = data.prompts;
    const promptsMatrix: string[][] = Object.keys(promptsMap).sort().map(key => promptsMap[key]);

    const imagesMatrix: string[][] = await Promise.all(promptsMatrix.map(async (promptsArray) => {
      return Promise.all(promptsArray.map(async (prompt) => {
        const slugifiedPrompt = slugify(prompt, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
        const imageRef = ref(storage, `pictureboards/${pictureboard_id}/${slugifiedPrompt}.png`);
        try {
          const url = await getDownloadURL(imageRef);
          return url;
        } catch (error) {
          console.error("Error fetching image URL:", error);
          return ''; // or a placeholder URL
        }
      }));
    }));

    return {
      prompts: promptsMatrix,
      images: imagesMatrix,
      email: data.email,
      name: data.name ? data.name : "Untitled Picture Board",
      phoneNumber: data.phoneNumber,
      uidAuth: data.uidAuth,
      createdAt: data.createdAt
    };
  } else {
    console.log("No such document!");
    throw new Error("No such document!");
  }
}


export async function renamePictureboard(pictureboard_id: string, name: string) {
  const docRef = doc(db, "pictureboards", pictureboard_id);
  const docSnap = await getDoc(docRef);

  
  if (docSnap.exists()) {
    //Setdoc with merge true the name of the pictureboard
    await setDoc(docRef, { name: name }, { merge: true });

  
  } else {
    console.log("No such document!");
    throw new Error("No such document!");
  }
}

export async function updateRedirect(uid: string, redirect: string) {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    redirect: redirect,
    updatedAt: serverTimestamp(),
  });
}

export async function updateProfile(uid: string, data: Partial<User>) {
  const batch = writeBatch(db);
  batch.set(
    doc(db, "users", uid),
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );


  return await batch.commit();
}

