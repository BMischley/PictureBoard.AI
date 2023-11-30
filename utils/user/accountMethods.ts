import { User, updateProfile } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/firebase.config";
import { doc, getDoc, query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { User as User2 } from "@/types/firestore/users/user";

export async function updateUserProfileObj(
  user: User,
  data: { firstName: string; lastName: string; photoURL?: string }
) {
  return await updateProfile(user, data);
}

export async function sendContactEmail(data: any, file: File | null) {
  
  const contactEmail = httpsCallable(functions, "contactEmail");
  const out = await contactEmail(data);
  return out;
}


export async function getProfileData(uid: string) {
  const docRef = doc(db, `users/${uid}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data as User2;
  } 
  return {} as User2;
}

export async function getUserPictureboards(uid: string) {
  console.log("uid", uid);
  const q = query(
    collection(db, `pictureboards`),
    where("uidAuth", "==", uid),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);

  // Transform each document into the desired structure
  const pictureboards = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    let promptsMatrix = [];

    // Check if the picture board has a 'prompts' property and it's an object
    if (data.prompts && typeof data.prompts === 'object') {
      // Transform the 'prompts' object into an array of arrays
      promptsMatrix = Object.keys(data.prompts).sort().map(key => data.prompts[key]);
    }

    // Return the transformed picture board
    return { ...data, id: doc.id, prompts: promptsMatrix };
  });

  return pictureboards;
}